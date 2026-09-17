import { auth } from "@/lib/auth/auth";
import BottomNavigation from "./BottomNavigation";
import TopBar from "./TopBar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedRootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) redirect("/sign-in");
  if (!session.session.activeOrganizationId)
    return (
      <>
        <TopBar />
        {children}
      </>
    );
  return (
    <>
      <TopBar />
      {children}
      <BottomNavigation />
    </>
  );
}
