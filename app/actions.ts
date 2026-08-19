"use server";

import { signUp } from "@/lib/auth/signup";

export async function signupAction(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const orgName = formData.get("orgName");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof orgName !== "string"
  ) {
    throw new Error("Invalid form data");
  }
  return signUp({
    name,
    email,
    password,
    orgName,
  });
}
