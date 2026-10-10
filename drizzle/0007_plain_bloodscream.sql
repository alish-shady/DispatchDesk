ALTER TABLE "organizations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "organizations" CASCADE;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "activity_log" ALTER COLUMN "action" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."actions";--> statement-breakpoint
CREATE TYPE "public"."actions" AS ENUM('submitted', 'approved', 'rejected', 'cancelled');--> statement-breakpoint
ALTER TABLE "activity_log" ALTER COLUMN "action" SET DATA TYPE "public"."actions" USING "action"::"public"."actions";--> statement-breakpoint
ALTER TABLE "activity_log" ADD COLUMN "org_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "approval_steps" ADD COLUMN "org_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_org_id_organization_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approval_steps" ADD CONSTRAINT "approval_steps_org_id_organization_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "approval_steps_request_step_unique" ON "approval_steps" USING btree ("request_id","step_order");--> statement-breakpoint
ALTER TABLE "requests" DROP COLUMN "current_step";