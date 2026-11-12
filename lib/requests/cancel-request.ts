import { db } from "@/db/db";
import { orgScopedRepo } from "@/lib/requests/repo";
import { ACTION_TO_ACTIVITY, nextStatus } from "../request-state-machine";
import { assertCan, Role } from "@/lib/auth/roles";
import { AppError } from "@/lib/errors";

export type CancelRequestInput = { orgId: string; requestId: string; actorRole: Role; actorId: string };

export async function cancelRequest(input: CancelRequestInput) {
  return db.transaction(async (tx) => {
    const repo = orgScopedRepo(tx, input.orgId);
    const request = await repo.getRequest(input.requestId);
    if (!request) throw new AppError("NOT_FOUND", "Selected request couldn't be found.");
    const isOwner = request.requesterId === input.requestId;
    const isAllowed =
      (isOwner && assertCan(input.actorRole, { request: ["cancel"] })) ||
      assertCan(input.actorRole, { request: ["cancel_any"] });
    if (!isAllowed) throw new AppError("FORBIDDEN", "You don't have permission to cancel this request.");
    const next = nextStatus(request.status, "cancel");
    if (!next)
      throw new AppError("INVALID_TRANSITION", "This request has already been resolved and can’t be cancelled.");
    const updated = await repo.updateRequestStatus(request.id, request.status, next);
    if (!updated) throw new AppError("CONFLICT", "This request couldn't be cancelled.");
    await repo.terminatePendingSteps(request.id);
    await repo.logActivity(request.id, input.actorId, ACTION_TO_ACTIVITY.cancel);

    return updated;
  });
}
