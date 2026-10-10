export const REQUEST_STATUSES = ["draft", "submitted", "in_review", "approved", "rejected", "cancelled"] as const;
export const REQUEST_ACTIONS = [
  "submit",
  "cancel",
  "manager_approve",
  "manager_reject",
  "admin_approve",
  "admin_reject",
] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];
export type RequestAction = (typeof REQUEST_ACTIONS)[number];
export const TRANSITIONS: Record<RequestStatus, Partial<Record<RequestAction, RequestStatus>>> = {
  draft: {
    submit: "submitted",
    cancel: "cancelled",
  },
  submitted: {
    manager_approve: "in_review",
    manager_reject: "rejected",
  },
  in_review: {
    admin_approve: "approved",
    admin_reject: "rejected",
  },
  approved: {},
  rejected: {},
  cancelled: {},
};

export function canTransition(from: RequestStatus, action: RequestAction): boolean {
  return TRANSITIONS[from]?.[action] !== undefined;
}

export function nextStatus(from: RequestStatus, action: RequestAction) {
  const to = TRANSITIONS[from]?.[action];
  return to;
}
