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

## 4. What's built so far (Phases 1–3)

- Full nav restructure: Teachings · Bible Study · Teachers · Q & A · School of
  the Word · eBooks · Selah · News · Partner with us · Contact.
- All existing curriculum content (Bible Study, Teach the Teacher, Workshop,
  Seven Ways, Q&A, School of the Word) ported and working, unchanged in
  substance.
- Teachings: a new growing archive (model + list + detail pages).
- eBooks: 3-D book-cover grid, parametric SVG covers in the site's own design
  language, per-book read-online + client-generated PDF download.
- Selah: persistent footer player (native `<audio>` for the ministry's own
  recordings, the official YouTube IFrame API for embedded videos), language
  filter, nothing plays automatically. No fake data was seeded — real tracks
  come from the committee via the admin area.
- Admin area (`/admin`, behind `/admin/login`): CRUD for eBooks (including
  cover upload and the chapter editor), Teachings, Selah entries (enforcing
  embed-link-or-own-upload at the form level), and News photos. The first
  account is created with `scripts/create-admin.ts` — nothing is seeded.
- Partner with us: page shell with the approved copy, not yet wired to real
  payment details (Phase 4, blocked on the parish confirming the account).

## 5. Partner with us (Phase 4) — built, waiting on real values

The giving page and the whole payment flow are implemented and building
clean, but deliberately inert until real values replace the placeholders:

- `NEXT_PUBLIC_BANK_ACCOUNT_NAME` / `NEXT_PUBLIC_BANK_ACCOUNT_NUMBER` /
  `NEXT_PUBLIC_BANK_NAME` — shown with a copy button. While any of these
  stay as `PLACEHOLDER…`, the page shows "details will appear here" instead.
- `PAYSTACK_SECRET_KEY` (NGN) / `FLUTTERWAVE_SECRET_KEY` (USD) — server-only;
  the giving form redirects to each provider's own hosted checkout page and
  verifies server-side when they redirect back to `/partner/thank-you`. No
  public key, no third-party script, no card details ever touch this site.
  While either stays `PLACEHOLDER`, the "Give online" section shows the same
  kind of not-yet-switched-on notice.

**These are read at build time** (the page is statically prerendered), so
after setting the real values in Vercel, trigger a redeploy for them to take
effect — a new `git push` does this automatically.

Nothing has been invented here — see the standing rule in the original
brief.
