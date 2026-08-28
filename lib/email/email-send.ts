import { EmailTemplate } from "@/components/email/EmailTemplate";
import { Resend } from "resend";

interface OrganizationInvitationEmailData {
  invitationId: string;
  inviterName: string;
  orgName: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrganizationInvitation({
  invitationId,
  inviterName,
  orgName,
}: OrganizationInvitationEmailData) {
  const inviteLink = `http://localhost:3000/dashboard/accept?invitationId=${invitationId}`;
  const { data: emailData, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "alishapoori83@gmail.com",
    subject: "Welcome to my world.",
    react: EmailTemplate({
      firstName: "NNN",
      inviterName,
      teamName: orgName,
      inviteLink,
    }),
  });
}
