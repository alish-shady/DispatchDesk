"use client";

import { authClient } from "@/lib/auth/auth-client";

async function sendInvite() {
  const { data, error } = await authClient.organization.inviteMember({
    email: "alishapoori83@gmail.com",
    role: "member",
    resend: true,
  });
  console.log({ dataFromClient: data });
}
export default function SendEmailButton() {
  return <button onClick={sendInvite}>send</button>;
}
