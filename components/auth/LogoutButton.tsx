"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function LogoutButton() {
  const router = useRouter();
  async function handleSignout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  }
  return (
    <Button className="uppercase" onClick={handleSignout}>
      log out
    </Button>
  );
}
