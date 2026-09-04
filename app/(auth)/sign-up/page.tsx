import { SignUpForm } from "@/components/auth/SignUpForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-center">Dispatch Desk</h1>
        <h2 className="text-2xl font-semibold">Create Organization</h2>
        <span className="text-sm">Initialize new tenant environment.</span>
      </div>
      <SignUpForm />
      <span className="text-sm">
        Already have an account? <Link href="/sign-in">Sign in</Link>
      </span>
    </div>
  );
}
