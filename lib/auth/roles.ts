import { createAccessControl } from "better-auth/plugins";
import { defaultStatements, adminAc, ownerAc, memberAc } from "better-auth/plugins/organization/access";

export const statement = {
  ...defaultStatements,
  request: ["submit", "cancel", "approve", "reject", "view_all"],
} as const;

export const coreAc = createAccessControl(statement);
export const admin = coreAc.newRole({
  ...ownerAc.statements,
  request: ["submit", "cancel", "approve", "reject", "view_all"],
});
export const manager = coreAc.newRole({
  ...adminAc.statements,
  member: ["create", "delete", "update"],
  request: ["submit", "cancel", "approve", "reject", "view_all"],
});
export const user = coreAc.newRole({
  ...memberAc.statements,
  request: ["submit", "cancel"],
});

export const roleDefinitions = { admin, manager, user } as const;
export const roles = ["admin", "manager", "user"] as const;

export type Role = (typeof roles)[number];

export function isRole(role: string): role is Role {
  return roles.includes(role as Role);
}

type PermissionRequest = Parameters<(typeof admin)["authorize"]>[0];
export function assertCan(role: Role, permissions: PermissionRequest): boolean {
  return roleDefinitions[role].authorize(permissions).success;
}
