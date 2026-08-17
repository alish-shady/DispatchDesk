"use client";

import { authClient } from "@/lib/auth-client";

export default function Home() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as { [k: string]: string };
    const { data, error } = await authClient.signUp.email({
      email: formData.email,
      name: formData.name,
      password: formData.password,
    });
    console.log(data);
    if (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="grid grid-cols-1">
        <input name="orgName" type="text" placeholder="org name" />
        <input name="name" type="text" placeholder="name" />
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">sign up</button>
      </form>
    </main>
  );
}
