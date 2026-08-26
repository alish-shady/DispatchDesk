import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import * as schema from "@/auth-schema";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sendOrganizationInvitation } from "../email/email-send";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const result = await db
            .select({
              userId: users.id,
              orgId: users.orgId,
            })
            .from(users)
            .where(eq(users.id, session.userId));

          return {
            data: {
              ...session,
              activeOrganizationId: result[0].orgId,
            },
          };
        },
      },
    },
  },
  plugins: [
    organization({
      async sendInvitationEmail(data) {
        const inviteId = data.id;
        const inviterName = data.inviter.user.name;
        const orgName = data.organization.name;
        await sendOrganizationInvitation({ inviteId, inviterName, orgName });
      },
    }),
  ],
});
