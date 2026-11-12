import { and, eq } from "drizzle-orm";
import { db } from "@/db/db";
import { activityLog, approvalSteps, requests, type Request, type ApprovalStep } from "@/db/schema";
import { ActivityAction, RequestStatus, StepStatus } from "@/lib/request-state-machine";

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
export type Executor = typeof db | Transaction;

type NewRequest = Omit<typeof requests.$inferInsert, "orgId">;
type NewStep = Omit<typeof approvalSteps.$inferInsert, "orgId" | "requestId">;
type NewActivity = Omit<typeof activityLog.$inferInsert, "orgId" | "requestId" | "actorId">;

export function orgScopedRepo(exec: Executor, orgId: string) {
  return {
    async createRequest(values: NewRequest): Promise<Request> {
      const [row] = await exec
        .insert(requests)
        .values({ ...values, orgId })
        .returning();
      if (!row) throw new Error("Insert into requests returned no row.");
      return row;
    },
    async updateRequestStatus(id: string, from: RequestStatus, to: RequestStatus): Promise<Request | null> {
      const [row] = await exec
        .update(requests)
        .set({ status: to })
        .where(and(eq(requests.orgId, orgId), eq(requests.id, id), eq(requests.status, from)))
        .returning();
      return row ?? null;
    },

    async getRequest(id: string): Promise<Request | null> {
      const [row] = await exec
        .select()
        .from(requests)
        .where(and(eq(requests.orgId, orgId), eq(requests.id, id)))
        .limit(1);
      return row ?? null;
    },

    async createApprovalSteps(requestId: string, steps: NewStep[]) {
      return exec
        .insert(approvalSteps)
        .values(steps.map((s) => ({ ...s, orgId, requestId })))
        .returning();
    },
    async decideApprovalStep(
      stepId: string,
      decision: StepStatus,
      approverId: string,
      comment?: string,
    ): Promise<ApprovalStep | null> {
      const [row] = await exec
        .update(approvalSteps)
        .set({ status: decision, decidedBy: approverId, decidedAt: new Date(), comment })
        .where(and(eq(approvalSteps.orgId, orgId), eq(approvalSteps.id, stepId), eq(approvalSteps.status, "pending")))
        .returning();
      return row ?? null;
    },
    async terminatePendingSteps(requestId: string) {
      return exec
        .update(approvalSteps)
        .set({ status: "cancelled" })
        .where(
          and(
            eq(approvalSteps.orgId, orgId),
            eq(approvalSteps.requestId, requestId),
            eq(approvalSteps.status, "pending"),
          ),
        )
        .returning();
    },
    async listApprovalSteps(requestId: string): Promise<ApprovalStep[]> {
      return exec
        .select()
        .from(approvalSteps)
        .where(and(eq(approvalSteps.orgId, orgId), eq(approvalSteps.requestId, requestId)))
        .orderBy(approvalSteps.stepOrder);
    },
    async getPendingStep(requestId: string): Promise<ApprovalStep | null> {
      const [row] = await exec
        .select()
        .from(approvalSteps)
        .where(
          and(
            eq(approvalSteps.orgId, orgId),
            eq(approvalSteps.requestId, requestId),
            eq(approvalSteps.status, "pending"),
          ),
        )
        .orderBy(approvalSteps.stepOrder)
        .limit(1);
      return row ?? null;
    },
    async logActivity(
      requestId: string,
      actorId: string,
      action: ActivityAction,
      metadata?: { stepOrder: number; role: string },
    ) {
      await exec.insert(activityLog).values({ orgId, requestId, actorId, action, metadata });
    },
  };
}
