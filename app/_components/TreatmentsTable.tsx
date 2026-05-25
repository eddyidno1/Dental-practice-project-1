"use client";

import { useState } from "react";
import type { Treatment } from "@prisma/client";
import { StatusBadge } from "./StatusBadge";
import { EditRowDialog } from "./EditRowDialog";
import { formatCurrency, formatDaysAgo, isOverdue } from "@/lib/format";

export function TreatmentsTable({ treatments }: { treatments: Treatment[] }) {
  const [editing, setEditing] = useState<Treatment | null>(null);

  if (treatments.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-800 bg-neutral-950 px-6 py-12 text-center text-neutral-400">
        No treatments yet. Click <span className="text-white">Add treatment</span>{" "}
        to log the first quote.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-neutral-800 text-sm font-semibold text-white">
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Treatment</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Contact</th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((t) => {
              const overdue = isOverdue(t.followUpDate, t.status);
              return (
                <tr
                  key={t.id}
                  onClick={() => setEditing(t)}
                  className={`cursor-pointer border-b border-neutral-800 text-sm last:border-b-0 hover:bg-neutral-900 ${
                    overdue
                      ? "border-l-4 border-l-red-500 bg-red-950/20"
                      : ""
                  }`}
                >
                  <td className="px-4 py-4 font-medium">{t.patientName}</td>
                  <td className="px-4 py-4 text-neutral-300">{t.treatment}</td>
                  <td className="px-4 py-4 text-neutral-300">
                    {formatCurrency(t.value)}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-4 py-4 text-neutral-300">
                    <div className="flex items-center gap-2">
                      <span>{formatDaysAgo(t.lastContact)}</span>
                      {overdue && (
                        <span className="text-xs font-medium text-red-400">
                          · follow-up overdue
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditRowDialog
          treatment={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}
