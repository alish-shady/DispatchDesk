import { db } from "@/db/db";
import { auth } from "./auth";
import { organizations, users } from "@/db/schema";
import { headers } from "next/headers";
export async function signUp(input: { name: string; email: string; password: string; orgName: string }) {
  const { user } = await auth.api.signUpEmail({
    body: {
      name: input.name,
      email: input.email,
      password: input.password,
    },
  });
  const organization = await auth.api.createOrganization({
    body: {
      name: input.orgName,
      slug: `${input.orgName.toLocaleLowerCase()}-org`,
      userId: user.id,
      keepCurrentActiveOrganization: false,
    },
  });
  await auth.api.setActiveOrganization({
    body: {
      organizationId: organization.id,
    },
    headers: await headers(),
  });
  await db.insert(organizations).values({ id: organization.id, name: organization.name }).onConflictDoNothing();
  await db
    .insert(users)
    .values({ id: user.id, name: user.name, orgId: organization.id, email: user.email, role: "admin" })
    .onConflictDoNothing();
}
