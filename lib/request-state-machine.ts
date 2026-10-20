export const REQUEST_STATUSES = ["draft", "submitted", "in_review", "approved", "rejected", "cancelled"] as const;
export const REQUEST_ACTIONS = [
  "submit",
  "cancel",
  "manager_approve",
  "manager_reject",
  "admin_approve",
  "admin_reject",
] as const;
export const ACTIVITY_ACTIONS = ["submitted", "approved", "rejected", "cancelled"] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];
export type RequestAction = (typeof REQUEST_ACTIONS)[number];
export type ActivityAction = (typeof ACTIVITY_ACTIONS)[number];
export const ACTION_TO_ACTIVITY = {
  submit: "submitted",
  manager_approve: "approved",
  manager_reject: "rejected",
  admin_approve: "approved",
  admin_reject: "rejected",
  cancel: "cancelled",
} satisfies Record<RequestAction, ActivityAction>;
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
  return nextStatus(from, action) !== undefined;
}

export function nextStatus(from: RequestStatus, action: RequestAction): RequestStatus | undefined {
  const transitions = TRANSITIONS[from];
  if (!transitions || !Object.hasOwn(transitions, action)) {
    return undefined;
  }
  return transitions[action];
}
