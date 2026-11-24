import type { Metadata } from "next";
import { CopyButton } from "@/components/ui/copy-button";
import { GiveForm } from "./give-form";
import { Banner } from "@/components/ui/banner";

export const metadata: Metadata = { title: "Partner with us" };

function bankDetails() {
  const name = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME;
  const number = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER;
  const bank = process.env.NEXT_PUBLIC_BANK_NAME;
  const isPlaceholder = (v?: string) => !v || v.startsWith("PLACEHOLDER");
  if (isPlaceholder(name) || isPlaceholder(number) || isPlaceholder(bank)) {
    return null;
  }
  return { name: name!, number: number!, bank: bank! };
}

function givingConfigured() {
  const p = process.env.PAYSTACK_SECRET_KEY;
  const f = process.env.FLUTTERWAVE_SECRET_KEY;
  return (p && p !== "PLACEHOLDER") || (f && f !== "PLACEHOLDER");
}

export default function PartnerPage() {
  const bank = bankDetails();
  const onlineReady = givingConfigured();

  return (
    <div className="mx-auto max-w-2xl px-4">
      <Banner
        kicker="Free-will giving"
        title="Partner with us"
        emphasis="What you give supports the teaching, the training of teachers, the workshops and the materials this ministry produces and shares freely."
      />

      <p className="font-serif text-[17px] leading-relaxed">
        This page carries no pressure and no promise of return. Give as you are able, cheerfully,
        as the Scriptures teach — nothing more is asked.
      </p>

      <h2 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-7 mb-2.5 pb-1.5 border-b border-line">
        Bank transfer
      </h2>
      {bank ? (
        <div className="bg-card border border-line rounded-2xl p-[18px] space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10.5px] text-muted uppercase tracking-wide">Account name</div>
              <div className="font-semibold">{bank.name}</div>
            </div>
            <CopyButton value={bank.name} />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10.5px] text-muted uppercase tracking-wide">Account number</div>
              <div className="font-semibold font-mono">{bank.number}</div>
            </div>
            <CopyButton value={bank.number} />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10.5px] text-muted uppercase tracking-wide">Bank</div>
              <div className="font-semibold">{bank.bank}</div>
            </div>
            <CopyButton value={bank.bank} />
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed">
          Bank transfer details will appear here once the parish has confirmed the account this
          page should use.
        </div>
      )}

      <h2 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-7 mb-2.5 pb-1.5 border-b border-line">
        Give online
      </h2>
      {onlineReady ? (
        <GiveForm />
      ) : (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed">
          Online giving (Paystack for naira, Flutterwave for giving from abroad) will be switched
          on once the parish has confirmed the account for this page.
        </div>
      )}
      <div className="h-8" />
    </div>
  );
}
