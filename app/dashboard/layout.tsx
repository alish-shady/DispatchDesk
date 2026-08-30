"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import OrganizationSelector from "@/components/organization/OrganizationSelector";
import { authClient } from "@/lib/auth/auth-client";

export default function Layout({ children }: { children: LayoutProps<"/dashboard"> }) {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const { data: activeOrg, isPending: activePending } = authClient.useActiveOrganization();
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
  if (!activeOrg) return <OrganizationSelector />;

  return children;
}
