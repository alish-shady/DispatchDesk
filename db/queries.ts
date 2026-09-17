import { member, organization } from "@/auth-schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export async function getOrganizationsForUser(userId: string) {
  const organizations = await db
    .select({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      logo: organization.logo,
      role: member.role,
    })
    .from(member)
    .innerJoin(organization, eq(member.organizationId, organization.id))
    .where(eq(member.userId, userId));
  return organizations;
}

export type OrganizationsWithRole = Awaited<ReturnType<typeof getOrganizationsForUser>>;
export type OrganizationWithRole = OrganizationsWithRole[0];
