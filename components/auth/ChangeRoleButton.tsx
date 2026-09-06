"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
const items = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "User", value: "user" },
];
export default function ChangeRoleButton({ memberId, memberRole }: { memberId: string; memberRole: string }) {
  const [role, setRole] = useState<string | null>(memberRole);
  const [isLoading, setIsLoading] = useState(false);
  async function updateRole(newRole: string | null) {
    if (!newRole || newRole === memberRole) return;
    setIsLoading(true);
    setRole(newRole);
    const { data, error } = await authClient.organization.updateMemberRole({
      role: [newRole],
      memberId,
    });
    if (error) {
      setRole(memberRole);
      console.error(error);
    } else {
      console.log(data);
    }
    setIsLoading(false);
  }
  return (
    <div className="flex gap-2 w-full">
      <Select items={items} value={role} onValueChange={updateRole}>
        <SelectTrigger className="w-full" isLoading={isLoading}>
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
