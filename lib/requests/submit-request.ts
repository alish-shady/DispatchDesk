// services/requests.ts
import { db } from "@/db/db";
import { orgScopedRepo } from "@/lib/requests/repo";
import { assertCan, Role } from "@/lib/auth/roles";
import { APPROVAL_CHAIN } from "../request-state-machine";

export type SubmitRequestInput = {
  orgId: string;
  requesterId: string;
  requesterRole: Role;
  type: string;
  title: string;
  description?: string;
};

export async function submitRequest(input: SubmitRequestInput) {
  if (!assertCan(input.requesterRole, { request: ["submit"] })) throw new Error("Not authorized for this action.");
  return db.transaction(async (tx) => {
    const repo = orgScopedRepo(tx, input.orgId);

    const request = await repo.createRequest({
      requesterId: input.requesterId,
      type: "IT Support Request",
      title: input.title,
      description: input.description,
      status: "submitted",
    });

    await repo.createApprovalSteps(
      request.id,
      APPROVAL_CHAIN.map((role, i) => ({ stepOrder: i + 1, approverRole: role })),
    );

    await repo.logActivity(request.id, input.requesterId, "submitted");

    return request;
  });
}
