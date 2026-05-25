import type { Status } from "@/lib/constants";

const STATUS_STYLES: Record<Status, string> = {
  Accepted: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  Thinking: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  Delayed: "bg-orange-500/15 text-orange-300 ring-orange-500/30",
  Declined: "bg-neutral-500/15 text-neutral-300 ring-neutral-500/30",
  "No response": "bg-red-500/15 text-red-300 ring-red-500/30",
};

export function StatusBadge({ status }: { status: string }) {
  const cls =
    STATUS_STYLES[status as Status] ??
    "bg-neutral-500/15 text-neutral-300 ring-neutral-500/30";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${cls}`}
    >
      {status}
    </span>
  );
}
