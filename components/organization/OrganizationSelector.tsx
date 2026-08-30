import { switchOrgAction } from '@/app/dashboard/actions';
import { authClient } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export default function OrganizationSelector() {
  const { data: session } = authClient.useSession();
  const [orgs, setOrgs] = useState([]);
  const [isPending, startTransition] = useTransition();
  const { refetch: refetchActiveOrg } = authClient.useActiveOrganization();
  const router = useRouter();
  console.log({ isPending });
  function setActiveOrg(orgId) {
    startTransition(async () => {
      const data = await switchOrgAction(orgId);
      console.log({ dataFromClient: data });
      await refetchActiveOrg();
      router.refresh();
    });
  }
  useEffect(() => {
    async function getOrganizations() {
      if (!session?.user.id) return;
      const response = await fetch(`/api/organization/${session.user.id}`, {
        credentials: 'include',
      });
      const data = await response.json();
      setOrgs(data);
    }
    getOrganizations();
  }, [session?.user.id]);

  return (
    <div className="grid grid-cols-1 justify-items-center h-screen">
      {orgs.map((org) => {
        return (
          <div key={org?.id} className="flex justify-center flex-col items-center">
            <span>Organization name: {org?.name}</span>
            <span>Your role: {org?.role}</span>
            <button onClick={() => setActiveOrg(org?.id)}>join</button>
          </div>
        );
      })}
    </div>
  );
}
