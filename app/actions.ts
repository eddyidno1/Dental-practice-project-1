"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { STATUSES, type Status } from "@/lib/constants";

type TreatmentInput = {
  patientName: string;
  treatment: string;
  value: number;
  status: Status;
  lastContact: Date;
  followUpDate: Date;
};

function parseFormData(formData: FormData): TreatmentInput {
  const patientName = String(formData.get("patientName") ?? "").trim();
  const treatment = String(formData.get("treatment") ?? "").trim();
  const valueRaw = String(formData.get("value") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const lastContact = String(formData.get("lastContact") ?? "").trim();
  const followUpDate = String(formData.get("followUpDate") ?? "").trim();

  if (!patientName) throw new Error("Patient name is required");
  if (!treatment) throw new Error("Treatment is required");
  const value = Number(valueRaw);
  if (!Number.isFinite(value) || value < 0) {
    throw new Error("Value must be a non-negative number");
  }
  if (!STATUSES.includes(status as Status)) {
    throw new Error("Invalid status");
  }
  if (!lastContact) throw new Error("Last contact date is required");
  if (!followUpDate) throw new Error("Follow-up date is required");

  return {
    patientName,
    treatment,
    value: Math.round(value),
    status: status as Status,
    lastContact: new Date(lastContact),
    followUpDate: new Date(followUpDate),
  };
}

export async function createTreatment(formData: FormData): Promise<void> {
  const data = parseFormData(formData);
  await prisma.treatment.create({ data });
  revalidatePath("/");
}

export async function updateTreatment(
  id: string,
  formData: FormData
): Promise<void> {
  const data = parseFormData(formData);
  await prisma.treatment.update({ where: { id }, data });
  revalidatePath("/");
}

export async function deleteTreatment(id: string): Promise<void> {
  await prisma.treatment.delete({ where: { id } });
  revalidatePath("/");
}
