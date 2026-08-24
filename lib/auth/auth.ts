import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import * as schema from "@/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organization = await auth.api.createOrganization({
            body: {
              name: "dfsadfsaadfs",
              slug: `${"fadsdfsadfs".toLocaleLowerCase()}-org`,
              userId: session.userId,
              keepCurrentActiveOrganization: false,
            },
          });
          return {
            data: {
              ...session,
              activeOrganizationId: organization?.id,
            },
          };
        },
      },
    },
  },
  plugins: [organization()],
});
