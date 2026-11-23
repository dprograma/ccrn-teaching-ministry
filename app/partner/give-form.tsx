"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { initiateGiving, type GivingState } from "@/lib/actions/giving";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3.5 rounded-full bg-navy text-white font-semibold text-[15px] disabled:opacity-60"
    >
      {pending ? "Taking you to a secure page…" : "Give"}
    </button>
  );
}

export function GiveForm() {
  const [provider, setProvider] = useState<"paystack" | "flutterwave">("paystack");
  const [state, formAction] = useActionState<GivingState, FormData>(initiateGiving, {});

  return (
    <form action={formAction} className="space-y-4">
      <div className="flex rounded-full bg-soft p-1">
        <button
          type="button"
          onClick={() => setProvider("paystack")}
          className={`flex-1 py-2.5 rounded-full text-[13.5px] font-semibold ${
            provider === "paystack" ? "bg-card shadow-sm" : "text-muted"
          }`}
        >
          ₦ Naira (Paystack)
        </button>
        <button
          type="button"
          onClick={() => setProvider("flutterwave")}
          className={`flex-1 py-2.5 rounded-full text-[13.5px] font-semibold ${
            provider === "flutterwave" ? "bg-card shadow-sm" : "text-muted"
          }`}
        >
          $ US Dollars (Flutterwave)
        </button>
      </div>
      <input type="hidden" name="provider" value={provider} />

      <div>
        <label className="block text-[13px] font-semibold mb-1.5" htmlFor="amount">
          Amount {provider === "paystack" ? "(₦)" : "(US$)"}
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="1"
          step="0.01"
          required
          className="w-full p-3 rounded-xl border border-line bg-card text-ink"
        />
      </div>

      <div>
        <label className="block text-[13px] font-semibold mb-1.5" htmlFor="email">
          Email <span className="text-muted font-normal">(for your payment receipt)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full p-3 rounded-xl border border-line bg-card text-ink"
        />
      </div>

      {state.error && <p className="text-claret text-sm">{state.error}</p>}

      <SubmitButton />
      <p className="text-[12px] text-muted text-center leading-relaxed">
        You&rsquo;ll be taken to {provider === "paystack" ? "Paystack" : "Flutterwave"}&rsquo;s own
        secure payment page. This ministry never sees or stores your card details.
      </p>
    </form>
  );
}
