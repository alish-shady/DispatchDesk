import LogoutButton from "@/components/auth/LogoutButton";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in", RedirectType.replace);
  // const data = await auth.api.listMembers({
  //   query: {
  //     organizationId: "hscLY4Ljgv6f5jaMUcHJBum8rlPuwXnr",
  //     limit: 100,
  //     offset: 0,
  //     sortBy: "createdAt",
  //   },
  //   headers: await headers(),
  // });
  return (
    <div className="grid grid-cols-1">
      Dashboard
      <LogoutButton />
      Welcome {session.user.name}
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
