"use client";

import { useActionState } from "react";
import { InputField } from "@/components/common/InputField";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { inviteMemberAction } from "@/app/organizations/actions";
import type { InvitationActionState } from "@/app/organizations/actions";
const items = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "user", label: "User" },
];
const initialState: InvitationActionState = {
  success: false,
  error: "",
};
export default function InviteMemberForm() {
  const [state, formAction, isPending] = useActionState(inviteMemberAction, initialState);
  console.log({ state, isPending });
  return (
    <form className="grid grid-cols-1 border-y border-y-border gap-2 py-4" action={formAction}>
      <InputField type="email" placeholder="user@test.com" name="email" label="Email" />
      <InputField type="custom" name="orgRole" label="Role" placeholder="Their Role">
        <Select items={items} name="orgRole">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Their Role" />
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
      </InputField>
      {!state.success && state.error && <p className="text-sm text-red-500">{state.error}</p>}
      <Button type="submit" className="uppercase" disabled={isPending}>
        {isPending ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}
