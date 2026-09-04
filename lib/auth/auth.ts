import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import * as schema from "@/auth-schema";
import { sendOrganizationInvitation } from "../email/email-send";
import { coreAc, admin, manager, user } from "./roles";
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  middleware: {
    publicRoutes: ["/dashboard/accept"],
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          // const result = await db
          //   .select({
          //     userId: users.id,
          //     orgId: users.orgId,
          //   })
          //   .from(users)
          //   .where(eq(users.id, session.userId));
          // return {
          //   data: {
          //     ...session,
          //     activeOrganizationId: result[0].orgId,
          //   },
          // };
        },
      },
    },
  },
  plugins: [
    organization({
      ac: coreAc,
      roles: { admin, manager, user },
      creatorRole: "admin",
      async sendInvitationEmail(data) {
        const invitationId = data.id;
        const inviterName = data.inviter.user.name;
        const orgName = data.organization.name;
        await sendOrganizationInvitation({ invitationId, inviterName, orgName });
      },
    }),
  ],
});
