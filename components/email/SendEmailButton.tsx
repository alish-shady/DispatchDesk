"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
async function sendInvite() {
  const { data, error } = await authClient.organization.inviteMember({
    email: "alishapoori83@gmail.com",
    role: "user",
    resend: true,
  });
}
export default function SendEmailButton({ formId, children }: { formId: string; children: string }) {
  return (
    <Button type="submit" className="uppercase" onClick={sendInvite} form={formId}>
      {children}
    </Button>
  );
}
