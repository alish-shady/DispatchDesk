import { db } from "@/db/db";
import { orgScopedRepo } from "./repo";
import { canTransition, RequestAction } from "../request-state-machine";
import { Role } from "../auth/roles";

export type UpdateRequestInput = {
  orgId: string;
  requestId: string;
  action: RequestAction;
  actorRole: Role;
};
export async function updateRequest(input: UpdateRequestInput) {
  return db.transaction(async (tx) => {
    const repo = orgScopedRepo(tx, input.orgId);
    const request = await repo.getRequest(input.requestId);
    if (!request) throw new Error("Request doesn't exist.");
    const approvalSteps = await repo.listApprovalSteps(input.requestId);
    const pendingStep = approvalSteps.reduce<(typeof approvalSteps)[number] | null>(
      (best, cur) => (cur.status === "pending" && (best === null || cur.stepOrder < best.stepOrder) ? cur : best),
      null,
    );
    if (!pendingStep) throw new Error("Request doesn't have any pending step.");
    if (!canTransition(request.status, input.action) && pendingStep.approverRole === input.actorRole)
      throw new Error("Request can't be updated with the requested transition.");
    //approve or reject the request
  });
}
