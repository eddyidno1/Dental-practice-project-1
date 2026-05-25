export const STATUSES = [
  "Accepted",
  "Thinking",
  "Delayed",
  "Declined",
  "No response",
] as const;

export type Status = (typeof STATUSES)[number];

export const RESOLVED_STATUSES: Status[] = ["Accepted", "Declined"];
