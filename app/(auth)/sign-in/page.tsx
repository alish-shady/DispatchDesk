"use client";

import Home from "@/components/layout/Home";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { SubmitEvent } from "react";

export default function Page() {
  const router = useRouter();
  async function handleSignIn(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { data, error } = await authClient.signIn.email({ email, password });
    if (error) {
      throw new Error("error");
    }
    router.replace("/dashboard");
  }
  return (
    <Home>
      <form onSubmit={handleSignIn} className="grid grid-cols-1">
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">sign in</button>
      </form>
    </Home>
  );
}
