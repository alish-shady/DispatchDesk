import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function canUpdateRole({
  sourceId,
  targetId,
  sourceRole,
  targetRole,
}: {
  sourceId: string;
  targetId: string;
  sourceRole: string;
  targetRole: string;
}): {
  verdict: string | null;
} {
  //App user cannot update their own role
  if (sourceId === targetId) return { verdict: "You cannot update your own role." };
  //A manager cannot update the role of another manager
  if (sourceRole === "manager" && targetRole === "manager")
    return { verdict: "You cannot update the role of another manager." };
  return { verdict: null };
}
