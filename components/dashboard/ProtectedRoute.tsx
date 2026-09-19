import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function ProtectedRoute({
  children,
  OrganizationLists,
}: {
  children: LayoutProps<"/dashboard">;
  OrganizationLists: React.ReactElement;
}) {
  console.log("dashboard layout called");
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("session:", session);
  if (session && !session.session.activeOrganizationId) return OrganizationLists;

  return <>{children}</>;
}
