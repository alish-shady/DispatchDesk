interface EmailTemplateProps {
  firstName: string;
  inviterName: string;
  teamName: string;
  inviteLink: string;
}

export function EmailTemplate({ firstName, inviterName, teamName, inviteLink }: EmailTemplateProps) {
  console.log({ inviteLink });
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>You were invited by {inviterName}</p>
      <p>To join the organization named {teamName}</p>
      <a href={inviteLink}>Click to Join</a>
    </div>
  );
}
