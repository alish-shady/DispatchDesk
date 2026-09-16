import { auth } from "@/lib/auth/auth";
import { GetOrganizationsApiResponse } from "@/types/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import OrganizationSelector from "./OrganizationSelector";

export default async function OrganizationsList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) redirect("/sign-in");
  const response = await fetch(`/api/organization/${session.user.id}`, {
    credentials: "include",
  });
  const data: GetOrganizationsApiResponse = await response.json();
  console.log(data);
  return (
    <div className="grid grid-cols-1 justify-items-center h-screen">
      {data.map((org) => {
        return <OrganizationSelector key={org.id} org={org} />;
      })}
    </div>
  );
}
