/**
 * Flutterwave's Standard (hosted-checkout) flow, for members giving in US
 * dollars from abroad: initialize server-side with the secret key, redirect
 * to Flutterwave's own payment page, verify server-side on return.
 * https://developer.flutterwave.com/docs/collecting-payments/standard
 */

const BASE = "https://api.flutterwave.com/v3";

function secretKey() {
  const key = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!key || key === "PLACEHOLDER") {
    throw new Error("Flutterwave isn't configured yet (FLUTTERWAVE_SECRET_KEY is a placeholder).");
  }
  return key;
}

export async function initializeFlutterwavePayment(opts: {
  email: string;
  amountUsd: number;
  txRef: string;
  redirectUrl: string;
}): Promise<{ link: string }> {
  const res = await fetch(`${BASE}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: opts.txRef,
      amount: opts.amountUsd,
      currency: "USD",
      redirect_url: opts.redirectUrl,
      customer: { email: opts.email },
      customizations: {
        title: "Teaching Ministry — Partner with us",
      },
    }),
  });

  const json = await res.json();
  if (!res.ok || json.status !== "success") {
    throw new Error(json.message || "Flutterwave could not start the payment.");
  }
  return { link: json.data.link as string };
}

export async function verifyFlutterwaveTransaction(transactionId: string): Promise<{
  success: boolean;
  amountUsd: number;
  currency: string;
  email: string;
}> {
  const res = await fetch(`${BASE}/transactions/${encodeURIComponent(transactionId)}/verify`, {
    headers: { Authorization: `Bearer ${secretKey()}` },
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok || json.status !== "success") {
    throw new Error(json.message || "Could not verify the Flutterwave transaction.");
  }
  return {
    success: json.data.status === "successful",
    amountUsd: json.data.amount,
    currency: json.data.currency,
    email: json.data.customer?.email ?? "",
  };
}
