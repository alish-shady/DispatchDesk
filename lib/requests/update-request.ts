import { db } from "@/db/db";
import { orgScopedRepo } from "@/lib/requests/repo";
import { ACTION_TO_ACTIVITY, ACTION_TO_STEP_STATUS, nextStatus, RequestAction } from "@/lib/request-state-machine";
import { assertCan, Role } from "@/lib/auth/roles";

export type UpdateRequestInput = {
  orgId: string;
  requestId: string;
  action: Exclude<RequestAction, "submit" | "cancel">;
  actorRole: Role;
  actorId: string;
};
export async function updateRequest(input: UpdateRequestInput) {
  if (!assertCan(input.actorRole, { request: [input.action] })) throw new Error("Not authorized for this action.");
  return db.transaction(async (tx) => {
    const repo = orgScopedRepo(tx, input.orgId);
    const request = await repo.getRequest(input.requestId);
    if (!request) throw new Error("Request doesn't exist.");
    if (request.requesterId === input.actorId) throw new Error("You can't approve your own request.");
    const next = nextStatus(request.status, input.action);
    if (!next) throw new Error("Invalid action.");
    const pendingStep = await repo.getPendingStep(request.id);
    if (!pendingStep) throw new Error("Request doesn't have any pending step.");
    if (pendingStep.approverRole !== input.actorRole) throw new Error("Not authorized for this action.");
    //approve or reject the request
    const updated = await repo.updateRequestStatus(request.id, request.status, next);
    if (!updated) throw new Error("Couldn't be modified.");
    //update the steps
    const decision = ACTION_TO_STEP_STATUS[input.action];
    const step = await repo.decideApprovalStep(pendingStep.id, decision, input.actorId);
    if (!step) throw new Error("Couldn't update the steps.");
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
