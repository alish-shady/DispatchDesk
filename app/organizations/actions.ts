"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function inviteMemberAction(formData: FormData) {
  const role = formData.get("role");
  if (!role) {
    return { error: "Email and role are required" };
  }
  const data = await auth.api.createInvitation({
    body: {
      email: "alishapoori83@gmail.com",
      role: "user",
      resend: true,
    },
    headers: await headers(),
  });
}
