import { db } from "@/db/db";
import { orgScopedRepo } from "@/lib/requests/repo";
import { ACTION_TO_ACTIVITY, nextStatus } from "../request-state-machine";
import { assertCan, Role } from "../auth/roles";

export type CancelRequestInput = { orgId: string; requestId: string; actorRole: Role; actorId: string };

export async function cancelRequest(input: CancelRequestInput) {
  return db.transaction(async (tx) => {
    const repo = orgScopedRepo(tx, input.orgId);
    const request = await repo.getRequest(input.requestId);
    if (!request) throw new Error("Selected request doesn't exist.");
    const isOwner = request.requesterId === input.requestId;
    const isAllowed =
      (isOwner && assertCan(input.actorRole, { request: ["cancel"] })) ||
      assertCan(input.actorRole, { request: ["cancel_any"] });
    if (!isAllowed) throw new Error("Not authorized for this action.");
    const next = nextStatus(request.status, "cancel");
    if (!next) throw new Error("Invalid action.");
    const updated = repo.updateRequestStatus(request.id, request.status, next);
    if (!updated) throw new Error("Couldn't be modified.");
    await repo.terminatePendingSteps(request.id);
    await repo.logActivity(request.id, input.actorId, ACTION_TO_ACTIVITY.cancel);

    return updated;
  });
}
