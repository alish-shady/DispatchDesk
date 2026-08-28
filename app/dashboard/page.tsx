import ChangeRoleButton from "@/components/auth/ChangeRoleButton";
import LogoutButton from "@/components/auth/LogoutButton";
import SendEmailButton from "@/components/email/SendEmailButton";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in", RedirectType.replace);
  const membersData = await auth.api.listMembers({ headers: await headers() });
  console.log({ membersData, session });
  return (
    <div className="grid grid-cols-1">
      Dashboard
      <LogoutButton />
      <SendEmailButton />
      Welcome {session.user.name}
      {membersData.members.map((member) => (
        <div key={member.userId} className="grid grid-cols-1 my-2">
          <span>userId: {member.userId}</span>
          <span>name: {member.user.name}</span>
          <span>email: {member.user.email}</span>
          <span>role: {member.role}</span>
          <ChangeRoleButton memberId={member.id} />
        </div>
      ))}
    </div>
  );
}
