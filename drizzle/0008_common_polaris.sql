ALTER TYPE "public"."actions" RENAME TO "activity_actions";--> statement-breakpoint
ALTER TYPE "public"."approval_step_status" ADD VALUE 'cancelled';--> statement-breakpoint
ALTER TABLE "activity_log" DROP CONSTRAINT "activity_log_request_id_requests_id_fk";
--> statement-breakpoint
ALTER TABLE "approval_steps" DROP CONSTRAINT "approval_steps_request_id_requests_id_fk";
--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "status" SET DEFAULT 'submitted';--> statement-breakpoint
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_request_org_fk" FOREIGN KEY ("request_id","org_id") REFERENCES "public"."requests"("id","org_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approval_steps" ADD CONSTRAINT "approval_steps_request_org_fk" FOREIGN KEY ("request_id","org_id") REFERENCES "public"."requests"("id","org_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "requests_id_org_unique" ON "requests" USING btree ("id","org_id");