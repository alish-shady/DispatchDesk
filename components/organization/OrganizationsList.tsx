import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import OrganizationSelector from "./OrganizationSelector";
import { getOrganizationsForUser } from "@/db/queries";

export default async function OrganizationsList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) redirect("/sign-in");
  const organizations = await getOrganizationsForUser(session.user.id);

  return (
    <div className="grid grid-cols-1 justify-items-center h-screen">
      {organizations.map((org) => {
        return <OrganizationSelector key={org.id} org={org} />;
      })}
    </div>
  );
}
