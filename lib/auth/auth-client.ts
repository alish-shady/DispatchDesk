import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import { admin, coreAc, manager, user } from "./roles";

export const authClient = createAuthClient({
  plugins: [
    organizationClient({
      roles: { user, admin, manager },
      ac: coreAc,
    }),
  ],
});
