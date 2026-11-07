"use server";

import { getActor } from "@/lib/auth/actor";
import { auth } from "@/lib/auth/auth";
import { assertCan } from "@/lib/auth/roles";
import { submitRequest } from "@/lib/requests/submit-request";
import { updateRequest } from "@/lib/requests/update-request";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function switchOrgAction(orgId: string) {
  const data = await auth.api.setActiveOrganization({
    body: {
      organizationId: orgId,
    },
    headers: await headers(),
  });
  return { data };
}

export async function submitRequestAction() {
  try {
    const { orgId, role, userId } = await getActor();
    if (!assertCan(role, { request: ["submit"] })) throw new Error("Not authorized for this action.");
    const request = await submitRequest({
      orgId,
      requesterId: userId,
      type: "IT Support Request",
      title: "First request",
      description: "First request",
    });
    revalidatePath("/dashboard");
    return { ok: true as const, id: request.id };
  } catch (e) {
    console.error("submitRequestAction failed", e);
  }
}

export async function approveRequestAction() {
  try {
    const { orgId, role, userId } = await getActor();
    await updateRequest({ orgId, requestId: "1", action: "approve", actorRole: role, actorId: userId });
  } catch (e) {
    console.error("approveRequestAction failed", e);
  }
}

export async function rejectRequestAction() {
  try {
    const { orgId, role, userId } = await getActor();
    await updateRequest({ orgId, requestId: "1", action: "reject", actorRole: role, actorId: userId });
  } catch (e) {
    console.error("rejectRequestAction failed", e);
  }
}
