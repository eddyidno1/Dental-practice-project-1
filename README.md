# Unsold Treatment Visibility — Stage 1 MVP

A minimal dental-practice tool that answers one question:

> **Which patients accepted nothing after diagnosis?**

The dentist or receptionist logs each treatment quote (patient, treatment, value,
status, last contact, follow-up date). The dashboard makes it obvious who needs a
follow-up — rows whose follow-up date has passed are highlighted red.

No AI, no SMS, no automation. Just visibility, ownership, and accountability.

## Tech

- Next.js 14 (App Router) + TypeScript
- SQLite via Prisma
- Tailwind CSS (dark theme)
- Next.js Server Actions for all mutations

## Getting started

```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Then open <http://localhost:3000>.

## Data model

A single `Treatment` table:

| Field          | Type     |
| -------------- | -------- |
| `patientName`  | String   |
| `treatment`    | String   |
| `value`        | Int      |
| `status`       | One of: Accepted, Thinking, Delayed, Declined, No response |
| `lastContact`  | DateTime |
| `followUpDate` | DateTime |

## Useful scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — eslint
- `npm run typecheck` — `tsc --noEmit`
- `npm run db:reset` — wipe and re-seed the local SQLite DB
