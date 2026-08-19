"use client";

import { signupAction } from "@/app/actions";
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <form action={signupAction} className="grid grid-cols-1">
        <input name="orgName" type="text" placeholder="org name" />
        <input name="name" type="text" placeholder="name" />
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">sign up</button>
      </form>
    </main>
  );
}
