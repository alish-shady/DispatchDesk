"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

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
  return <button onClick={handleSignout}>log out</button>;
}
