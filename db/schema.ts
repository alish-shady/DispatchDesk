import { organization, user } from "@/auth-schema";
import { ACTIVITY_ACTIONS, REQUEST_STATUSES, STEP_STATUSES } from "@/lib/request-state-machine";
import { foreignKey, integer, json, pgEnum, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "manager", "user"]);
export const requestTypeEnum = pgEnum("request_type", ["IT Support Request"]);
export const requestStatusEnum = pgEnum("request_status", REQUEST_STATUSES);
export const approvalStepStatusEnum = pgEnum("approval_step_status", STEP_STATUSES);
export const activityActionsEnum = pgEnum("activity_actions", ACTIVITY_ACTIONS);

export const requests = pgTable(
  "requests",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    orgId: text("org_id")
      .notNull()
      .references(() => organization.id),
    requesterId: text("requester_id")
      .notNull()
      .references(() => user.id),
    type: requestTypeEnum("type").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    status: requestStatusEnum("status").notNull().default("submitted"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("requests_id_org_unique").on(table.id, table.orgId)],
);

export const approvalSteps = pgTable(
  "approval_steps",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    orgId: text("org_id")
      .notNull()
      .references(() => organization.id),
    requestId: text("request_id").notNull(),
    stepOrder: integer("step_order").notNull(),
    approverRole: userRoleEnum("approver_role").notNull(),
    status: approvalStepStatusEnum("status").notNull().default("pending"),
    decidedBy: text("decided_by").references(() => user.id),
    decidedAt: timestamp("decided_at", { withTimezone: true }),
    comment: text("comment"),
  },
  (table) => [
    uniqueIndex("approval_steps_request_step_unique").on(table.requestId, table.stepOrder),
    foreignKey({
      columns: [table.requestId, table.orgId],
      foreignColumns: [requests.id, requests.orgId],
      name: "approval_steps_request_org_fk",
    }),
  ],
);

export const activityLog = pgTable(
  "activity_log",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    orgId: text("org_id")
      .notNull()
      .references(() => organization.id),
    requestId: text("request_id").notNull(),
    actorId: text("actor_id")
      .notNull()
      .references(() => user.id),
    action: activityActionsEnum("action").notNull(),
    metadata: json("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    foreignKey({
      name: "activity_log_request_org_fk",
      columns: [table.requestId, table.orgId],
      foreignColumns: [requests.id, requests.orgId],
    }),
  ],
);

export type Request = typeof requests.$inferSelect;
export type NewRequest = typeof requests.$inferInsert;

export type ApprovalStep = typeof approvalSteps.$inferSelect;
export type NewApprovalStep = typeof approvalSteps.$inferInsert;

export type ActivityLog = typeof activityLog.$inferSelect;
export type NewActivityLog = typeof activityLog.$inferInsert;
