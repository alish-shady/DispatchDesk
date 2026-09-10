"use server";

import { auth } from "@/lib/auth/auth";
import { Role, roles } from "@/lib/auth/roles";
import { headers } from "next/headers";
type ActionState<T = void> = { success: true; data: T } | { success: false; error: string };
export type InvitationActionState = ActionState<Awaited<ReturnType<typeof auth.api.createInvitation>>>;
function isRole(value: unknown): value is Role {
  return typeof value === "string" && roles.includes(value as Role);
}
export async function inviteMemberAction(
  prevState: InvitationActionState,
  formData: FormData,
): Promise<InvitationActionState> {
  const role = formData.get("orgRole");
  if (!isRole(role)) {
    return { error: "Email and role are required.", success: false };
  }
  try {
    const data = await auth.api.createInvitation({
      body: {
        email: "alishapoori83@gmail.com",
        role,
        resend: true,
      },
      headers: await headers(),
    });
    return { data: data, success: true };
  } catch (e) {
    console.log({ e });
    return { error: "An error happened in sending the email.", success: false };
  }
}
