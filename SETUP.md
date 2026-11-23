# Setup — Teaching Ministry site (Next.js + Neon + Vercel)

## 1. Environment variables (Vercel project settings)

Copy `.env.example` to `.env` locally, and set the same names in Vercel
(Project → Settings → Environment Variables).

| Variable | Where it comes from |
|---|---|
| `DATABASE_URL` | Neon dashboard → pooled connection string |
| `DIRECT_URL` | Neon dashboard → direct (non-pooled) connection string, used only for migrations |
| `AUTH_SECRET` | Run `npx auth secret` locally and paste the result |
| `BLOB_READ_WRITE_TOKEN` | Vercel → Storage → Blob → create a store, copy the token |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` / `PAYSTACK_SECRET_KEY` | Not needed until the Partner-with-us phase |
| `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY` / `FLUTTERWAVE_SECRET_KEY` | Not needed until the Partner-with-us phase |

## 2. First-time database setup

Once `DATABASE_URL`/`DIRECT_URL` are set in `.env`:

```bash
npm install
npx prisma migrate deploy   # creates all tables in Neon
npm run db:seed             # publishes the eBook shelf from existing curriculum content
```

`npm run db:seed` populates the eBooks shelf (Teach the Teacher, The Seven Ways
of Handling the Word, and skeleton outlines for the six Advanced Doctrine
elective series) by reassembling content already in `lib/content/curriculum.ts` —
it does not invent any new text. The six elective books are seeded with their
syllabus only; the committee fills in each chapter's full content later
through the admin area.

## 3. Creating the first admin account

There is deliberately no seeded admin password. Create the first account with:

```bash
npx tsx scripts/create-admin.ts "Full Name" email@example.com
```

It will prompt for a password (not echoed) and hash it before storing.

## 4. What's built so far (Phase 1)

- Full nav restructure: Teachings · Bible Study · Teachers · Q & A · School of
  the Word · eBooks · Selah · News · Partner with us · Contact.
- All existing curriculum content (Bible Study, Teach the Teacher, Workshop,
  Seven Ways, Q&A, School of the Word) ported and working, unchanged in
  substance.
- Teachings: a new growing archive (model + list + detail pages).
- eBooks: 3-D book-cover grid, parametric SVG covers in the site's own design
  language, per-book read-online + client-generated PDF download.
- Selah, Partner with us: page shells with the approved copy, live but not yet
  wired to data (Phase 2 / Phase 4).

## 5. Still to come

- **Phase 2 — Selah**: persistent player, language filtering, embed/hosted
  entries.
- **Phase 3 — Admin area**: Auth.js login + CRUD for eBooks, Teachings, Selah
  entries, News photos.
- **Phase 4 — Partner with us**: real bank details, Paystack/Flutterwave,
  once the parish confirms the account this page should use.
