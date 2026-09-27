import { canUpdateRole } from "@/lib/utils";
import { describe, expect, it } from "vitest";

describe("canUpdateRole", () => {
  it("an admin can update an admin's role", () => {
    const input = {
      sourceId: "test",
      targetId: "test-1",
      sourceRole: "admin",
      targetRole: "admin",
    };
    const result = canUpdateRole(input);
    expect(result).toEqual({ verdict: null });
  });
  it("an admin can update a manager's role", () => {
    const input = {
      sourceId: "test",
      targetId: "test-1",
      sourceRole: "admin",
      targetRole: "manager",
    };
    const result = canUpdateRole(input);
    expect(result).toEqual({ verdict: null });
  });

  it("an admin can update a user's role", () => {
    const input = {
      sourceId: "test",
      targetId: "test-1",
      sourceRole: "admin",
      targetRole: "user",
    };
    const result = canUpdateRole(input);
    expect(result).toEqual({ verdict: null });
  });

  it("a manager can update a user's role", () => {
    const input = {
      sourceId: "test",
      targetId: "test-1",
      sourceRole: "manager",
      targetRole: "user",
    };
    const result = canUpdateRole(input);
    expect(result).toEqual({ verdict: null });
  });

  it("no one can update their own role", () => {
    const input = {
      sourceId: "test",
      targetId: "test",
      sourceRole: "user",
      targetRole: "admin",
    };
    const result = canUpdateRole(input);
    expect(result).toEqual({ verdict: "You cannot update your own role." });
  });

  it("a manager cannot update the role of another manager", () => {
    const input = {
      sourceId: "test",
      targetId: "test-1",
      sourceRole: "manager",
      targetRole: "manager",
    };

    const result = canUpdateRole(input);
    expect(result).toEqual({ verdict: "You cannot update the role of another manager." });
  });
});
