"use client";
import { switchOrgAction } from "@/app/dashboard/actions";
import { authClient } from "@/lib/auth/auth-client";
import { GetOrganizationsApiResponse } from "@/types/api";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function OrganizationSelector({ org }: { org: GetOrganizationsApiResponse[number] }) {
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
    <div key={org.id} className="flex justify-center flex-col items-center">
      <span>Organization name: {org.name}</span>
      <span>Your role: {org.role}</span>
      <button onClick={() => setActiveOrg(org.id)}>{isPending ? "joining..." : "join"}</button>
    </div>
  );
}
