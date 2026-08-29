import { authClient } from "@/lib/auth/auth-client";

export default function OrganizationSelector() {
  const { data: session } = authClient.useSession();

  async function getOrganizations() {
    if (!session?.user.id) return;
    const response = await fetch(`/api/organization/${session.user.id}`, {
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
  }
  getOrganizations();
  return <div>hey</div>;
}
