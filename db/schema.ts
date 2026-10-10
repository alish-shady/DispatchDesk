import { organization, user } from "@/auth-schema";
import { integer, json, pgEnum, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "manager", "user"]);
export const requestTypeEnum = pgEnum("request_type", ["IT Support Request"]);
export const requestStatusEnum = pgEnum("request_status", [
  "draft",
  "submitted",
  "in_review",
  "approved",
  "rejected",
  "cancelled",
]);
export const approvalStepStatusEnum = pgEnum("approval_step_status", ["pending", "approved", "rejected"]);
export const activityActionsEnum = pgEnum("activity_actions", ["submitted", "approved", "rejected", "cancelled"]);

export const requests = pgTable("requests", {
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
  status: requestStatusEnum("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const approvalSteps = pgTable(
  "approval_steps",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    orgId: text("org_id")
      .notNull()
      .references(() => organization.id),
    requestId: text("request_id")
      .notNull()
      .references(() => requests.id),
    stepOrder: integer("step_order").notNull(),
    approverRole: userRoleEnum("approver_role").notNull(),
    status: approvalStepStatusEnum("status").notNull().default("pending"),
    decidedBy: text("decided_by").references(() => user.id),
    decidedAt: timestamp("decided_at", { withTimezone: true }),
    comment: text("comment"),
  },
  (table) => ({
    uniqueStepPerRequest: uniqueIndex("approval_steps_request_step_unique").on(table.requestId, table.stepOrder),
  }),
);

export const activityLog = pgTable("activity_log", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  orgId: text("org_id")
    .notNull()
    .references(() => organization.id),
  requestId: text("request_id")
    .notNull()
    .references(() => requests.id),
  actorId: text("actor_id")
    .notNull()
    .references(() => user.id),
  action: activityActionsEnum("action").notNull(),
  metadata: json("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
