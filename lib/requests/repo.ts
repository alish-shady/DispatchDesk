import { and, eq } from "drizzle-orm";
import { db } from "@/db/db";
import { activityLog, approvalSteps, requests, type Request, type ApprovalStep } from "@/db/schema";
import { ActivityAction } from "@/lib/request-state-machine";

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
      return row;
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

    async listApprovalSteps(requestId: string): Promise<ApprovalStep[]> {
      return exec
        .select()
        .from(approvalSteps)
        .where(and(eq(approvalSteps.orgId, orgId), eq(approvalSteps.requestId, requestId)))
        .orderBy(approvalSteps.stepOrder);
    },

    async logActivity(requestId: string, actorId: string, action: ActivityAction) {
      await exec.insert(activityLog).values({ orgId, requestId, actorId, action });
    },
  };
}
