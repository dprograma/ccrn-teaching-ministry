import type { Metadata } from "next";

export const metadata: Metadata = { title: "Partner with us" };

export default function PartnerPage() {
  return (
    <div className="mx-auto max-w-xl px-4">
      <div
        className="rounded-2xl p-5 text-white mt-4 mb-5"
        style={{ background: "linear-gradient(160deg, var(--navy2), var(--navy))" }}
      >
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-80 font-bold">
          Free-will giving
        </div>
        <h1 className="text-[26px] mt-1.5 mb-2 text-white font-display font-semibold">
          Partner with us
        </h1>
        <div className="font-serif italic text-[16px] leading-relaxed opacity-95">
          What you give supports the teaching, the training of teachers, the workshops and the
          materials this ministry produces and shares freely.
        </div>
      </div>

      <p className="font-serif text-[17px] leading-relaxed">
        This page carries no pressure and no promise of return. Give as you are able, cheerfully,
        as the Scriptures teach — nothing more is asked.
      </p>

      <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed mt-4">
        Bank transfer details and online giving (Paystack for naira, Flutterwave for giving from
        abroad) will appear here once the parish has confirmed the account this page should use.
      </div>
      <div className="h-8" />
    </div>
  );
}
