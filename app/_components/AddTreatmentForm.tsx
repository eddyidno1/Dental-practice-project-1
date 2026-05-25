"use client";

import { useState, useTransition } from "react";
import { createTreatment } from "../actions";
import { STATUSES } from "@/lib/constants";
import { toDateInputValue } from "@/lib/format";
import { Modal } from "./Modal";

export function AddTreatmentForm({ onClose }: { onClose: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const today = toDateInputValue(new Date());

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await createTreatment(formData);
        onClose();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      }
    });
  }

  return (
    <Modal title="Add treatment" onClose={onClose}>
      <form action={handleSubmit} className="space-y-4">
        <Field label="Patient name">
          <input
            name="patientName"
            required
            className="input"
            placeholder="e.g. John"
          />
        </Field>
        <Field label="Treatment">
          <input
            name="treatment"
            required
            className="input"
            placeholder="e.g. Crown"
          />
        </Field>
        <Field label="Quote value ($)">
          <input
            name="value"
            type="number"
            min={0}
            step={1}
            required
            className="input"
            placeholder="1800"
          />
        </Field>
        <Field label="Status">
          <select name="status" required defaultValue="Thinking" className="input">
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
              required
              defaultValue={today}
              className="input"
            />
          </Field>
          <Field label="Follow-up date">
            <input
              name="followUpDate"
              type="date"
              required
              defaultValue={today}
              className="input"
            />
          </Field>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
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
