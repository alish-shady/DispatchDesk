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
    <div className="flex flex-col gap-4 min-h-screen">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold uppercase">Organizations List</h2>
        <div>Select the organization you want to join.</div>
      </div>
      <div className="grid">
        {organizations.map((org) => {
          return <OrganizationSelector key={org.id} org={org} />;
        })}
      </div>
    </div>
  );
}
