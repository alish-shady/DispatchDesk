"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
export default function ChangeRoleButton({ memberId }: { memberId: string }) {
  async function handleClick() {
    const { data, error } = await authClient.organization.updateMemberRole({
      role: ["manager"],
      memberId,
    });
    console.log({ data, error });
  }
  return (
    <div className="flex gap-2">
      <select onClick={handleClick} className="grow border">
        change role to manager
      </select>
      <Button variant="outline" className="max-w-fit">
        <DotsThreeVerticalIcon />
      </Button>
    </div>
  );
}
