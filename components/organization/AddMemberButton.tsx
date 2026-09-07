"use client";
import { UserPlusIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { useState } from "react";
import InviteMemberModal from "./InviteMemberModal";

export default function AddMemberButton() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button size="lg" onClick={() => setShowModal((c) => !c)}>
        <UserPlusIcon />
        Invite members
      </Button>
      {showModal && createPortal(<InviteMemberModal />, document.body)}
    </>
  );
}
