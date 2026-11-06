import { db } from "@/db/db";
import { orgScopedRepo } from "@/lib/requests/repo";
import {
  ACTION_TO_ACTIVITY,
  ACTION_TO_STEP_STATUS,
  canTransition,
  nextStatus,
  RequestAction,
} from "@/lib/request-state-machine";
import { Role } from "@/lib/auth/roles";

export type UpdateRequestInput = {
  orgId: string;
  requestId: string;
  action: Exclude<RequestAction, "submit">;
  actorRole: Role;
  actorId: string;
};
export async function updateRequest(input: UpdateRequestInput) {
  return db.transaction(async (tx) => {
    const repo = orgScopedRepo(tx, input.orgId);
    const request = await repo.getRequest(input.requestId);
    if (!request) throw new Error("Request doesn't exist.");
    const pendingStep = await repo.getPendingStep(request.id);
    if (!pendingStep) throw new Error("Request doesn't have any pending step.");
    if (!canTransition(request.status, input.action) || pendingStep.approverRole !== input.actorRole)
      throw new Error("Request can't be updated with the requested transition.");
    const next = nextStatus(request.status, input.action);
    if (!next) throw new Error("Invalid action!");
    //approve or reject the request
    const updated = await repo.updateRequestStatus(request.id, request.status, next);
    if (!updated) throw new Error("Couldn't be modified.");
    //update the steps
    const decision = ACTION_TO_STEP_STATUS[input.action];
    const step = await repo.decideApprovalStep(pendingStep.id, decision, input.actorId);
    if (!step) throw new Error("Couldn't update the steps.");
    //log activity
    const activityAction = ACTION_TO_ACTIVITY[input.action];
    await repo.logActivity(request.id, input.actorId, activityAction);
    return updated;
  });
}
