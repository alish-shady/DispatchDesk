import SignInForm from "@/components/auth/SignInForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-center">Dispatch Desk</h1>
        <h2 className="text-2xl font-semibold">Sign In</h2>
        <span className="text-sm">Sign in to your account</span>
      </div>
      <SignInForm />
      <span className="text-sm">
        Don&apos;t have an account? <Link href="/sign-up">Create an account</Link>
      </span>
    </div>
  );
}
