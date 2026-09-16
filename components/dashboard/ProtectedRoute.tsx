"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth/auth-client";

export default function ProtectedRoute({
  children,
  OrganizationLists,
}: {
  children: LayoutProps<"/dashboard">;
  OrganizationLists: React.ReactElement;
}) {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const { data: activeOrg, isPending: activePending } = authClient.useActiveOrganization();
  console.log("session:", session);
  console.log("active org:", activeOrg);
  useEffect(() => {
    if (!sessionPending && !session) {
      router.replace("/sign-in");
    }
  }, [session, sessionPending, router]);
  if (sessionPending) {
    return <div>Loading... for session</div>;
  }
  if (!session) {
    return null;
  }
  if (activePending) return <div>Loading... for active org</div>;
  if (!activeOrg) return OrganizationLists;
  console.log({ activeOrg });
  return <>{children}</>;
}
