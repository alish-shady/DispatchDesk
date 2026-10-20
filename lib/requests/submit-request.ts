import { db } from "@/db/db";
import { activityLog, approvalSteps, requests } from "@/db/schema";
export async function submitRequest() {
  return db.transaction(async (tx) => {
    // 1. Create the request and retrieve its generated ID.
    const [request] = await tx
      .insert(requests)
      .values({
        orgId: "1",
        requesterId: "1",
        type: "IT Support Request",
        title: "test",
        description: "test",
        status: "submitted",
      })
      .returning();

    // 2. Create both approval steps.
    await tx.insert(approvalSteps).values([
      {
        orgId: request.orgId,
        requestId: request.id,
        stepOrder: 1,
        approverRole: "manager",
        comment: "Request pending manager's approval.",
      },
      {
        orgId: request.orgId,
        requestId: request.id,
        stepOrder: 2,
        approverRole: "admin",
        comment: "Request pending admin's approval.",
      },
    ]);

    // 3. Create the submission activity log entry.
    await tx.insert(activityLog).values({
      orgId: request.orgId,
      requestId: request.id,
      actorId: request.requesterId,
      action: "submitted",
    });

    return request;
  });
}
