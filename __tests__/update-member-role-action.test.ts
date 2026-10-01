import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
      updateMemberRole: vi.fn(),
    },
  },
}));

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/db/db", () => ({
  db: {
    query: {
      member: {
        findFirst: vi.fn(),
      },
    },
  },
}));

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/db/db";
import { updateMemberRoleAction } from "@/app/(protected)/organizations/actions";
import { Member } from "better-auth/plugins";

describe("updateMemberRoleAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("throws Unauthorized when there is not session", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null);

    const result = await updateMemberRoleAction(
      { error: null },
      {
        memberId: "m1",
        role: "manager",
      },
    );
    expect(result).toEqual({ error: "Unauthorized" });
  });

  it("returns 'member not found' when the target doesn't exist", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: {
        id: "m1",
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "test@gmail.com",
        emailVerified: true,
        name: "user1",
      },
      session: {
        id: "s1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "m1",
        expiresAt: new Date(),
        token: "string",
      },
    });
    vi.mocked(db.query.member.findFirst)
      .mockResolvedValueOnce({
        id: "m1",
        role: "manager",
        createdAt: new Date(),
        organizationId: "o1",
        userId: "m1",
      })
      .mockResolvedValueOnce(undefined);
    const result = await updateMemberRoleAction({ error: null }, { memberId: "m1", role: "manager" });
    expect(result).toEqual({ error: "Member not found" });
  });
  it("returns the business rule error when a manager updates another manager", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: {
        id: "m1",
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "test@gmail.com",
        emailVerified: true,
        name: "user1",
      },
      session: {
        id: "s1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "m1",
        expiresAt: new Date(),
        token: "string",
      },
    });

    vi.mocked(db.query.member.findFirst)
      .mockResolvedValueOnce({
        id: "m1",
        role: "manager",
        createdAt: new Date(),
        organizationId: "o1",
        userId: "m1",
      }) // source
      .mockResolvedValueOnce({
        id: "m2",
        role: "manager",
        createdAt: new Date(),
        organizationId: "o1",
        userId: "m2",
      }); // target

    const result = await updateMemberRoleAction({ error: null }, { memberId: "m2", role: "manager" });

    expect(result).toEqual({ error: "You cannot update the role of another manager." });
    expect(auth.api.updateMemberRole).not.toHaveBeenCalled();
  });

  it("calls updateMemberRole and revalidates on success", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: {
        id: "m1",
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "test@gmail.com",
        emailVerified: true,
        name: "user1",
      },
      session: {
        id: "s1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "m1",
        expiresAt: new Date(),
        token: "string",
      },
    });

    vi.mocked(db.query.member.findFirst)
      .mockResolvedValueOnce({
        id: "m1",
        role: "admin",
        createdAt: new Date(),
        organizationId: "o1",
        userId: "m1",
      }) // caller
      .mockResolvedValueOnce({
        id: "m2",
        role: "user",
        createdAt: new Date(),
        organizationId: "o1",
        userId: "m2",
      }); // target

    const result = await updateMemberRoleAction({ error: null }, { memberId: "m2", role: "manager" });

    expect(result).toEqual({ error: null });
    expect(auth.api.updateMemberRole).toHaveBeenCalledWith(
      expect.objectContaining({
        body: { role: "manager", memberId: "m2" },
        headers: await headers(),
      }),
    );
    expect(revalidatePath).toHaveBeenCalledWith("/organizations");
  });

  it("returns a generic error when the update API throws", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: {
        id: "m1",
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "test@gmail.com",
        emailVerified: true,
        name: "user1",
      },
      session: {
        id: "s1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "m1",
        expiresAt: new Date(),
        token: "string",
      },
    });

    vi.mocked(db.query.member.findFirst)
      .mockResolvedValueOnce({
        id: "m1",
        role: "admin",
        createdAt: new Date(),
        organizationId: "o1",
        userId: "m1",
      })
      .mockResolvedValueOnce({
        id: "m2",
        role: "user",
        createdAt: new Date(),
        organizationId: "o1",
        userId: "m2",
      });

    vi.mocked(auth.api.updateMemberRole).mockRejectedValue(new Error("boom"));
    const result = await updateMemberRoleAction({ error: null }, { memberId: "m2", role: "manager" });

    expect(result).toEqual({ error: "An error happened in updating the role." });
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
