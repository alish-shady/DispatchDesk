"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function switchOrgAction(orgId: string) {
  const data = await auth.api.setActiveOrganization({
    body: {
      organizationId: orgId,
    },
    headers: await headers(),
  });
  return { data };
}
