"use client";

import { authClient } from "@/lib/auth/auth-client";

export default function ChangeRoleButton({ memberId }: { memberId: string }) {
  async function handleClick() {
    const { data, error } = await authClient.organization.updateMemberRole({
      role: ["manager"],
      memberId,
    });
    console.log({ data, error });
  }
  return <button onClick={handleClick}>change role to manager</button>;
}
