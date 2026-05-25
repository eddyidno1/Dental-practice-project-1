import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function daysFromNow(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

async function main() {
  await prisma.treatment.deleteMany();

  await prisma.treatment.createMany({
    data: [
      {
        patientName: "John",
        treatment: "Crown",
        value: 1800,
        status: "Thinking",
        lastContact: daysAgo(10),
        followUpDate: daysFromNow(2),
      },
      {
        patientName: "Sarah",
        treatment: "Invisalign",
        value: 7200,
        status: "Delayed",
        lastContact: daysAgo(21),
        followUpDate: daysAgo(3),
      },
      {
        patientName: "Amy",
        treatment: "Implant",
        value: 6500,
        status: "No response",
        lastContact: daysAgo(14),
        followUpDate: daysAgo(1),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
