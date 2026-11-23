import type { Metadata } from "next";
import Link from "next/link";
import { verifyPaystackTransaction } from "@/lib/giving/paystack";
import { verifyFlutterwaveTransaction } from "@/lib/giving/flutterwave";

export const metadata: Metadata = { title: "Thank you" };
export const dynamic = "force-dynamic";

async function verify(params: Record<string, string | string[] | undefined>) {
  const provider = params.provider;
  try {
    if (provider === "paystack") {
      const reference = params.reference ?? params.trxref;
      if (typeof reference !== "string") return { ok: false, reason: "Missing reference." };
      const r = await verifyPaystackTransaction(reference);
      return { ok: r.success, amount: r.amountNaira, currency: r.currency };
    }
    if (provider === "flutterwave") {
      const txId = params.transaction_id;
      if (typeof txId !== "string") return { ok: false, reason: "Missing transaction id." };
      const r = await verifyFlutterwaveTransaction(txId);
      return { ok: r.success, amount: r.amountUsd, currency: r.currency };
    }
  } catch (e) {
    return { ok: false, reason: (e as Error).message };
  }
  return { ok: false, reason: "Unknown payment provider." };
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const result = await verify(params);

  return (
    <div className="mx-auto max-w-md px-4 py-14 text-center">
      {result.ok ? (
        <>
          <div className="w-14 h-14 rounded-full bg-ok/15 text-ok grid place-items-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12l5 5L20 6" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-semibold mb-2">Thank you</h1>
          <p className="font-serif text-base leading-relaxed text-muted">
            {"amount" in result && result.amount
              ? `Your gift of ${result.currency} ${result.amount.toLocaleString()} has been received. `
              : ""}
            It will go toward the teaching, the training of teachers, and the materials this
            ministry shares freely.
          </p>
        </>
      ) : (
        <>
          <div className="w-14 h-14 rounded-full bg-claret/15 text-claret grid place-items-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-semibold mb-2">We couldn&rsquo;t confirm this</h1>
          <p className="font-serif text-base leading-relaxed text-muted">
            {"reason" in result ? result.reason : "The payment could not be verified."} If an
            amount was taken from your account, please contact the Bible Study Committee with your
            reference so it can be checked.
          </p>
        </>
      )}
      <Link
        href="/partner"
        className="inline-block mt-6 px-5 py-2.5 rounded-full bg-soft font-semibold text-[14px]"
      >
        Back to Partner with us
      </Link>
    </div>
  );
}
