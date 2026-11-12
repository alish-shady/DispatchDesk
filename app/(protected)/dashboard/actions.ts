"use server";

import { getActor } from "@/lib/auth/actor";
import { auth } from "@/lib/auth/auth";
import { AppError, ErrorCode } from "@/lib/errors";
import { cancelRequest } from "@/lib/requests/cancel-request";
import { submitRequest } from "@/lib/requests/submit-request";
import { updateRequest } from "@/lib/requests/update-request";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

type ActionResult<T = void> =
  { ok: true; data: T } | { ok: false; error: ErrorCode; message: string; fieldErrors?: Record<string, string[]> };

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
    const request = await submitRequest({
      orgId,
      requesterId: userId,
      requesterRole: role,
      type: "IT Support Request",
      title: "First request",
      description: "First request",
    });
    revalidatePath("/dashboard");
    return { ok: true, id: request.id };
  } catch (e) {
    if (e instanceof AppError) return { ok: false, error: e.code, message: e.message };
    console.error("action failed", e);
    return { ok: false, error: "INTERNAL", message: "Something went wrong. Please try again." };
  }
}

export async function approveRequestAction() {
  try {
    const { orgId, role, userId } = await getActor();
    const updated = await updateRequest({ orgId, requestId: "1", action: "approve", actorRole: role, actorId: userId });
    revalidatePath("/dashboard");
    return {
      ok: true,
      data: { id: updated.id, status: updated.status },
    };
  } catch (e) {
    if (e instanceof AppError) return { ok: false, error: e.code, message: e.message };
    console.error("action failed", e);
    return { ok: false, error: "INTERNAL", message: "Something went wrong. Please try again." };
  }
}

export async function rejectRequestAction() {
  try {
    const { orgId, role, userId } = await getActor();
    const updated = await updateRequest({ orgId, requestId: "1", action: "reject", actorRole: role, actorId: userId });
    revalidatePath("/dashboard");
    return {
      ok: true,
      data: { id: updated.id, status: updated.status },
    };
  } catch (e) {
    if (e instanceof AppError) return { ok: false, error: e.code, message: e.message };
    console.error("action failed", e);
    return { ok: false, error: "INTERNAL", message: "Something went wrong. Please try again." };
  }
}

export async function cancelRequestAction() {
  try {
    const { orgId, role, userId } = await getActor();
    const updated = await cancelRequest({ orgId, requestId: "1", actorRole: role, actorId: userId });
    revalidatePath("/dashboard");
    return {
      ok: true,
      data: { id: updated.id, status: updated.status },
    };
  } catch (e) {
    if (e instanceof AppError) return { ok: false, error: e.code, message: e.message };
    console.error("action failed", e);
    return { ok: false, error: "INTERNAL", message: "Something went wrong. Please try again." };
  }
}
