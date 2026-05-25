import { prisma } from "@/lib/db";
import { TreatmentsTable } from "./_components/TreatmentsTable";
import { AddTreatmentButton } from "./_components/AddTreatmentButton";

export const dynamic = "force-dynamic";

export default async function Home() {
  const treatments = await prisma.treatment.findMany({
    orderBy: [{ followUpDate: "asc" }, { createdAt: "desc" }],
  });

  const overdueCount = treatments.filter((t) => {
    if (t.status === "Accepted" || t.status === "Declined") return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(t.followUpDate);
    due.setHours(0, 0, 0, 0);
    return due.getTime() < today.getTime();
  }).length;

  const unsoldValue = treatments
    .filter((t) => t.status !== "Accepted" && t.status !== "Declined")
    .reduce((sum, t) => sum + t.value, 0);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Unsold Treatment Visibility</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Which patients accepted nothing after diagnosis?
          </p>
        </div>
        <AddTreatmentButton />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="Open quotes" value={String(treatments.length)} />
        <StatCard
          label="Overdue follow-ups"
          value={String(overdueCount)}
          tone={overdueCount > 0 ? "red" : "neutral"}
        />
        <StatCard label="Unsold value" value={`$${unsoldValue.toLocaleString()}`} />
      </div>

      <TreatmentsTable treatments={treatments} />
    </main>
  );
}

function StatCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "red";
}) {
  const valueClass =
    tone === "red" ? "text-red-400" : "text-white";
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-neutral-500">
        {label}
      </div>
      <div className={`mt-1 text-2xl font-semibold ${valueClass}`}>{value}</div>
    </div>
  );
}
