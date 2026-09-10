import InviteMemberForm from "./InviteMemberForm";
export default function InviteMemberModal() {
  return (
    <div className="z-50 w-auto h-full absolute right-0 top-0 left-0 bg-background px-4 py-8">
      <div className="flex flex-col gap-2 pb-2 border-b-2 border-b-border">
        <h1 className="text-2xl font-semibold uppercase">Invite Members</h1>
        <span className="text-sm">Invite a fellow member to the organization.</span>
      </div>
      <div className="grid my-8 px-6 py-4 border-2 border-border">
        <h2 className="uppercase text-xl font-semibold">Invitee&apos;s Info</h2>
        <InviteMemberForm />
      </div>
    </div>
  );
}
