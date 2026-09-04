"use client";

import { SubmitEvent, useRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/common/InputField";
import { signupAction } from "@/app/(auth)/sign-up/actions";
import { Spinner } from "@/components/ui/spinner";

export function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      formRef.current?.reset();
      try {
        const { organization, user } = await signupAction(formData);
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 border-y border-y-border gap-2 py-4">
      <InputField type="text" placeholder="Peace Corps" name="orgName" label="Organization Name" />
      <InputField name="name" type="text" placeholder="sys_admin" label="Admin Name" />
      <InputField name="email" type="text" placeholder="admin@peace.corp" label="Admin Email" />
      <InputField name="password" type="password" placeholder="........" label="Password" />
      <Button type="submit" className="uppercase" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner data-icon="inline-start" />
            {"Signing up..."}
          </>
        ) : (
          "Sign up"
        )}
      </Button>
    </form>
  );
}
