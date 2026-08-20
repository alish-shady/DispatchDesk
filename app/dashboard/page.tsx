import LogoutButton from "@/components/auth/LogoutButton";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session);
  const members = await auth.api.listMembers({
    query: {
      organizationId: "tGMl9kgE0FL85uZ6J4Pt9r31OPjOdiXS",
    },
    headers: await headers(),
  });
  console.log(members);
  return (
    <div>
      Dashboard
      <LogoutButton />
    </div>
  );
}
