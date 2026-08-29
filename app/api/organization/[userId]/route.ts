import { member, organization } from "@/auth-schema";
import { db } from "@/db/db";
import { auth } from "@/lib/auth/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function GET() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
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
    .where(eq(member.userId, session.user.id));
  return Response.json(organizations);
}
