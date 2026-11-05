// services/requests.ts
import { db } from "@/db/db";
import { orgScopedRepo } from "@/lib/requests/repo";

export type SubmitRequestInput = {
  orgId: string;
  requesterId: string;
  type: string;
  title: string;
  description: string;
};

export async function submitRequest(input: SubmitRequestInput) {
  return db.transaction(async (tx) => {
    const repo = orgScopedRepo(tx, input.orgId);

    const request = await repo.createRequest({
      requesterId: input.requesterId,
      type: "IT Support Request",
      title: input.title,
      description: input.description,
      status: "submitted",
    });

    await repo.createApprovalSteps(request.id, [
      { stepOrder: 1, approverRole: "manager", comment: "Pending manager approval." },
      { stepOrder: 2, approverRole: "admin", comment: "Pending admin approval." },
    ]);

    await repo.logActivity(request.id, request.requesterId, "submitted");

    return request;
  });
}
