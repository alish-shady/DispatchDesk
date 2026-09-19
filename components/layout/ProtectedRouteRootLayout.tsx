import { auth } from "@/lib/auth/auth";
import BottomNavigation from "./BottomNavigation";
import TopBar from "./TopBar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedRouteRootLayout({ children }: { children: React.ReactNode }) {
  console.log("root layout called");
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
