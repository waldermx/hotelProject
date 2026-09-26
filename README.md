# LuxStay — hotel booking

Hotel booking front end built with Next.js (App Router), Tailwind and shadcn/ui. February–March
2025.

> **Status:** UI prototype. Rooms come from static sample data (`src/data/rooms.js`); Prisma is
> installed but not wired up, so there are no real bookings yet.

## What's there

- Landing page with a hero search: date range picker and guest selector.
- Room list and room detail pages (`/rooms`, `/rooms/[id]`), contact page.
- Form handling with react-hook-form + zod validation.
- Reusable UI components built on Radix primitives (shadcn/ui).

## Running

```bash
cd hotel-booking
npm install
npm run dev
```
