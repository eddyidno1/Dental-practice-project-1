"use client";

import { useState } from "react";
import { AddTreatmentForm } from "./AddTreatmentForm";

export function AddTreatmentButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
      >
        + Add treatment
      </button>
      {open && <AddTreatmentForm onClose={() => setOpen(false)} />}
    </>
  );
}
