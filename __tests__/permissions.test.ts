import { describe, it, expect } from "vitest";
import { admin, manager, user } from "@/lib/auth/roles";

describe("role permissions", () => {
  it("admin can delete a member", () => {
    expect(admin.authorize({ member: ["delete"] }).success).toBe(true);
  });
  it("manager can create members", () => {
    expect(manager.authorize({ member: ["create"] }).success).toBe(true);
  });

  it("manager can update members", () => {
    expect(manager.authorize({ member: ["update"] }).success).toBe(true);
  });

  it("user cannot either create or update members", () => {
    expect(user.authorize({ member: ["create", "update"] }).success).toBe(false);
  });
});
