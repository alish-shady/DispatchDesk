"use server";

import { db } from "@/db/db";
import { auth } from "@/lib/auth/auth";
import { Role, roles } from "@/lib/auth/roles";
import { member } from "@/auth-schema";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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

export async function updateMemberRoleAction(
  prevState: { error: string | null },
  input: { memberId: string; role: Role },
) {
  const { memberId, role } = input;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");
  const target = await db.query.member.findFirst({
    where: eq(member.id, memberId),
  });
  if (!target) throw new Error("Member not found");

  try {
    await auth.api.updateMemberRole({
      body: {
        role,
        memberId,
      },
      headers: await headers(),
    });
    revalidatePath("/organizations");
    return { error: null };
  } catch {
    return { error: "An error happened in updating the role." };
  }
}
