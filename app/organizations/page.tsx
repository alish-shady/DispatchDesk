import ChangeRoleButton from "@/components/auth/ChangeRoleButton";
import LogoutButton from "@/components/auth/LogoutButton";
import AddMemberButton from "@/components/organization/AddMemberButton";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
export default async function Page() {
  const membersData = await auth.api.listMembers({ headers: await headers() });
  console.log({ membersData });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">ORG_MEMBERS</h2>
        <span className="text-sm">Manage organization roles and and access permissions.</span>
        <div>
          <AddMemberButton />
        </div>
        <div className="grid my-2">
          {membersData.members.map((member) => (
            <div key={member.userId} className="grid px-6 py-4 bg-card gap-2 border-b">
              <div className="ml-2 grid">
                <span className="font-semibold text-base">{member.user.name}</span>
                <span className="text-xs">{member.user.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="p-1 text-[#2563EB] bg-[#EFF6FF] text-xs uppercase">{member.role}</span>
                <span className="p-1 text-[#16A34A] bg-[#F0FDF4] text-xs uppercase">active</span>
              </div>
              <ChangeRoleButton memberId={member.id} />
            </div>
          ))}
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
