"use client";
import { switchOrgAction } from "@/app/dashboard/actions";
import type { OrganizationWithRole } from "@/db/queries";
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function OrganizationSelector({ org }: { org: OrganizationWithRole }) {
  const [isPending, startTransition] = useTransition();
  const { refetch: refetchActiveOrg } = authClient.useActiveOrganization();
  const router = useRouter();
  function setActiveOrg(orgId: string) {
    startTransition(async () => {
      const data = await switchOrgAction(orgId);
      console.log({ dataFromClient: data });
      await refetchActiveOrg();
      router.refresh();
    });
  }
  return (
    <div key={org.id} className="grid px-6 py-4 bg-card gap-2 border-b hover:bg-accent duration-200">
      <span className="font-semibold text-base">{org.name}</span>
      <div className="flex">
        <span className="p-1 text-status-draft-text bg-status-draft-bg text-xs uppercase">{org.role}</span>
      </div>
      <Button className="uppercase" disabled={isPending} onClick={() => setActiveOrg(org.id)}>
        {isPending ? "joining..." : "join"}
      </Button>
    </div>
  );
}
