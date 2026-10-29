"use server";
import { getCurrentUserRole } from "@/db/queries";
import { headers } from "next/headers";
import { isRole } from "./roles";
import { auth } from "./auth";

export async function getActor() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Not authenticated.");
  const userId = session.user.id;
  const orgId = session.session.activeOrganizationId;
  if (!orgId) throw new Error("No active organization.");
  const role = await getCurrentUserRole(userId, orgId);
  if (!role || !isRole(role)) throw new Error("Not a member of this organization.");
  return { userId, orgId, role };
}
