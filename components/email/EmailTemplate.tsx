interface EmailTemplateProps {
  firstName: string;
  inviterName: string;
  teamName: string;
  inviteLink: string;
}

export function EmailTemplate({ firstName, inviterName, teamName, inviteLink }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>You were invited by {inviterName}</p>
      <p>To join the organization named {teamName}</p>
    </div>
  );
}
