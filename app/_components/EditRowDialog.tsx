"use client";

import { useState, useTransition } from "react";
import type { Treatment } from "@prisma/client";
import { deleteTreatment, updateTreatment } from "../actions";
import { STATUSES } from "@/lib/constants";
import { toDateInputValue } from "@/lib/format";
import { Modal } from "./Modal";

export function EditRowDialog({
  treatment,
  onClose,
}: {
  treatment: Treatment;
  onClose: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await updateTreatment(treatment.id, formData);
        onClose();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      }
    });
  }

  function handleDelete() {
    if (!confirm(`Delete ${treatment.patientName}'s record?`)) return;
    startTransition(async () => {
      await deleteTreatment(treatment.id);
      onClose();
    });
  }

  return (
    <Modal title={`Update ${treatment.patientName}`} onClose={onClose}>
      <form action={handleSubmit} className="space-y-4">
        <Field label="Patient name">
          <input
            name="patientName"
            defaultValue={treatment.patientName}
            required
            className="input"
          />
        </Field>
        <Field label="Treatment">
          <input
            name="treatment"
            defaultValue={treatment.treatment}
            required
            className="input"
          />
        </Field>
        <Field label="Quote value ($)">
          <input
            name="value"
            type="number"
            min={0}
            step={1}
            defaultValue={treatment.value}
            required
            className="input"
          />
        </Field>
        <Field label="Status">
          <select
            name="status"
            defaultValue={treatment.status}
            required
            className="input"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Last contact">
            <input
              name="lastContact"
              type="date"
              defaultValue={toDateInputValue(treatment.lastContact)}
              required
              className="input"
            />
          </Field>
          <Field label="Follow-up date">
            <input
              name="followUpDate"
              type="date"
              defaultValue={toDateInputValue(treatment.followUpDate)}
              required
              className="input"
            />
          </Field>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="text-sm text-red-400 hover:text-red-300 disabled:opacity-60"
          >
            Delete
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm text-neutral-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:opacity-60"
            >
              {isPending ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </form>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background-color: rgb(10 10 10);
          border: 1px solid rgb(38 38 38);
          color: white;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 14px;
        }
        :global(.input:focus) {
          outline: none;
          border-color: rgb(115 115 115);
        }
      `}</style>
    </Modal>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-400">
        {label}
      </span>
      {children}
    </label>
  );
}
