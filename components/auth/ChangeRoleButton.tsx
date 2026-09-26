"use client";

import { Button } from "@/components/ui/button";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { startTransition, useActionState, useEffect, useOptimistic, useState } from "react";
import { updateMemberRoleAction } from "@/app/(protected)/organizations/actions";
import { isRole } from "@/lib/auth/roles";
const items = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "User", value: "user" },
];
export default function ChangeRoleButton({ memberId, memberRole }: { memberId: string; memberRole: string }) {
  const [optimisticRole, setOptimisticRole] = useOptimistic(memberRole);
  const [state, dispatch, isPending] = useActionState(updateMemberRoleAction, { error: null });
  useEffect(() => {
    if (state.error) console.log(state);
  }, [state]);
  async function updateRole(newRole: string | null) {
    if (!newRole || newRole === optimisticRole) return;
    if (!isRole(newRole)) return;
    startTransition(() => {
      setOptimisticRole(newRole);
      dispatch({ role: newRole, memberId });
    });
  }
  return (
    <div className="flex gap-2 w-full">
      <Select items={items} value={optimisticRole} onValueChange={updateRole}>
        <SelectTrigger className="w-full" isLoading={isPending}>
          <SelectValue placeholder="Change Role" />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant="outline" className="max-w-fit">
        <DotsThreeVerticalIcon />
      </Button>
    </div>
  );
}
