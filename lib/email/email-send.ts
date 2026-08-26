import { EmailTemplate } from "@/components/email/EmailTemplate";
import { organization } from "better-auth/plugins";
import { Resend } from "resend";

interface InvitationData {
  inviteId: string;
  inviterName: string;
  orgName: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrganizationInvitation({ inviteId, inviterName, orgName }: InvitationData) {
  const inviteLink = `http://localhost:3000/invitations/accept?invitationId=${inviteId}`;
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
  console.log({ emailData, error });
}
