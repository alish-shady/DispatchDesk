export const REQUEST_STATUSES = ["draft", "submitted", "in_review", "approved", "rejected", "cancelled"] as const;
export const REQUEST_ACTIONS = ["submit", "cancel", "approve", "reject"] as const;
export const ACTIVITY_ACTIONS = ["submitted", "approved", "rejected", "cancelled"] as const;
export const STEP_STATUSES = ["pending", "approved", "rejected", "cancelled"] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];
export type RequestAction = (typeof REQUEST_ACTIONS)[number];
export type ActivityAction = (typeof ACTIVITY_ACTIONS)[number];
export type StepStatus = (typeof STEP_STATUSES)[number];
export const ACTION_TO_ACTIVITY = {
  submit: "submitted",
  approve: "approved",
  reject: "rejected",
  cancel: "cancelled",
} satisfies Record<RequestAction, ActivityAction>;
export const ACTION_TO_STEP_STATUS: Record<Exclude<RequestAction, "submit">, StepStatus> = {
  approve: "approved",
  reject: "rejected",
  cancel: "cancelled",
};
export const TRANSITIONS: Record<RequestStatus, Partial<Record<RequestAction, RequestStatus>>> = {
  draft: {
    submit: "submitted",
    cancel: "cancelled",
  },
  submitted: {
    approve: "in_review",
    reject: "rejected",
    cancel: "cancelled",
  },
  in_review: {
    approve: "approved",
    reject: "rejected",
    cancel: "cancelled",
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
