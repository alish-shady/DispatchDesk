import { createAccessControl } from "better-auth/plugins";
import { defaultStatements, adminAc, ownerAc, memberAc } from "better-auth/plugins/organization/access";

export const coreAc = createAccessControl(defaultStatements);
export const admin = coreAc.newRole({
  ...ownerAc.statements,
});
export const manager = coreAc.newRole({
  ...adminAc.statements,
});
export const user = coreAc.newRole({
  ...memberAc.statements,
});

export type Role = "admin" | "manager" | "user";
