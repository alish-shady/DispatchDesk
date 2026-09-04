"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { InputField } from "@/components/common/InputField";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { SubmitEvent, useState } from "react";
export default function SignInForm() {
  const searchParams = useSearchParams();
  const invitationId = searchParams.get("invitationId");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  async function handleSignIn(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const { data, error } = await authClient.signIn.email({ email, password });
      if (error) {
        throw new Error("error");
      }
      const redirectPath = invitationId ? `/dashboard/accept?invitationId=${invitationId}` : "/dashboard";
      router.push(redirectPath);
    } catch (err) {
    } finally {
      setIsPending(false);
    }
  }
  return (
    <form onSubmit={handleSignIn} className="grid grid-cols-1 border-y border-y-border gap-2 py-4">
      <InputField name="email" type="text" placeholder="email" label="Email" />
      <InputField name="password" type="password" placeholder="password" label="Password" />
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner data-icon="inline-start" />
            {"Signing in..."}
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
