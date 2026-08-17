import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import * as schema from "@/auth-schema";
import { users } from "@/db/schema";

export const auth = betterAuth({
  databaseHooks: {
    user: {
      create: {
        after: async (user, context) => {
          console.log({ user, context });
          await db.insert(users).values({ id: user.id, name: user.name, orgId: "1", email: user.email });
        },
      },
    },
  },
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [organization()],
});
