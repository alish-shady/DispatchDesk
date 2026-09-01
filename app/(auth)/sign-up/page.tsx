import { signupAction } from "./actions";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/common/InputField";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-center">Dispatch Desk</h1>
        <h2 className="text-2xl font-semibold">Create Organization</h2>
        <span className="text-sm">Initialize new tenant environment.</span>
      </div>
      <form action={signupAction} className="grid grid-cols-1 border-y border-y-border gap-2 py-4">
        <InputField type="text" placeholder="Peace Corps" name="orgName" label="Organization Name" />
        <InputField name="name" type="text" placeholder="sys_admin" label="Admin Name" />
        <InputField name="email" type="text" placeholder="admin@peace.corp" label="Admin Email" />
        <InputField name="password" type="password" placeholder="........" label="Password" />
        <Button type="submit" className="uppercase">
          sign up
        </Button>
      </form>
      <span className="text-sm">
        Already have an account? <Link href="/sign-in">Sign in</Link>
      </span>
    </div>
  );
}
