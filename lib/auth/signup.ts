import { db } from "@/db/db";
import { auth } from "./auth";
import { organizations, users } from "@/db/schema";
export async function signUp(input: { name: string; email: string; password: string; orgName: string }) {
  const { user, token } = await auth.api.signUpEmail({
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

  await syncCustomSchema(user, organization);
  return { user, organization };
}

async function syncCustomSchema(
  user: { id: string; name: string; email: string },
  organization: { id: string; name: string },
) {
  await db
    .insert(organizations)
    .values({
      id: organization.id,
      name: organization.name,
    })
    .onConflictDoNothing();

  await db
    .insert(users)
    .values({
      id: user.id,
      name: user.name,
      orgId: organization.id,
      email: user.email,
      role: "admin",
    })
    .onConflictDoNothing();
}
