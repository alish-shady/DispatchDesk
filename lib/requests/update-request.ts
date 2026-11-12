import { db } from "@/db/db";
import { orgScopedRepo } from "@/lib/requests/repo";
import { ACTION_TO_ACTIVITY, ACTION_TO_STEP_STATUS, nextStatus, RequestAction } from "@/lib/request-state-machine";
import { assertCan, Role } from "@/lib/auth/roles";
import { AppError } from "@/lib/errors";

export type UpdateRequestInput = {
  orgId: string;
  requestId: string;
  action: Exclude<RequestAction, "submit" | "cancel">;
  actorRole: Role;
  actorId: string;
};
export async function updateRequest(input: UpdateRequestInput) {
  if (!assertCan(input.actorRole, { request: [input.action] }))
    throw new AppError("FORBIDDEN", `You don’t have permission to ${input.action} requests.`);
  return db.transaction(async (tx) => {
    const repo = orgScopedRepo(tx, input.orgId);
    const request = await repo.getRequest(input.requestId);
    if (!request) throw new AppError("NOT_FOUND", "We couldn't find that request.");
    if (request.requesterId === input.actorId) throw new AppError("FORBIDDEN", "You can’t review your own request.");
    const next = nextStatus(request.status, input.action);
    if (!next) throw new AppError("INVALID_TRANSITION", `This request can’t be ${input.action} in its current state..`);
    const pendingStep = await repo.getPendingStep(request.id);
    if (!pendingStep) throw new Error(`Request ${request.id} is ${request.status} but has no pending step.`);
    if (pendingStep.approverRole !== input.actorRole)
      throw new AppError("FORBIDDEN", "This request is waiting for a different approver.");
    //approve or reject the request
    const updated = await repo.updateRequestStatus(request.id, request.status, next);
    if (!updated)
      throw new AppError("CONFLICT", "Someone else just updated this request. Refresh the page and try again.");
    //update the steps
    const decision = ACTION_TO_STEP_STATUS[input.action];
    const step = await repo.decideApprovalStep(pendingStep.id, decision, input.actorId);
    if (!step)
      throw new AppError("CONFLICT", "Someone else just updated this request. Refresh the page and try again.");
    if (decision === "rejected") await repo.terminatePendingSteps(request.id);
    //log activity
    const activityAction = ACTION_TO_ACTIVITY[input.action];
    await repo.logActivity(request.id, input.actorId, activityAction, {
      stepOrder: step.stepOrder,
      role: input.actorRole,
    });
    return updated;
  });
}
