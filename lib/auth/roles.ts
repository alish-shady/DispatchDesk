import { createAccessControl } from "better-auth/plugins";
import { defaultStatements, adminAc, ownerAc, memberAc } from "better-auth/plugins/organization/access";

export const coreAc = createAccessControl(defaultStatements);
export const admin = coreAc.newRole({
  ...ownerAc.statements,
});
export const manager = coreAc.newRole({
  ...adminAc.statements,
  member: ["create", "delete", "update"],
});
export const user = coreAc.newRole({
  ...memberAc.statements,
});

export const roles = ["admin", "manager", "user"] as const;

export type Role = (typeof roles)[number];

export function isRole(role: string): role is Role {
  return roles.includes(role as Role);
}
