"use client";
import { UserPlusIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export default function AddMemberButton() {
  return (
    <Button size="lg">
      <UserPlusIcon />
      Invite members
    </Button>
  );
}
