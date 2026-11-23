/**
 * Paystack's hosted-checkout flow: we initialize a transaction server-side
 * (secret key only, never exposed to the browser) and redirect the giver to
 * Paystack's own secure payment page. No client-side script, no public key.
 * https://paystack.com/docs/payments/accept-payments/
 */

const BASE = "https://api.paystack.co";

function secretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key || key === "PLACEHOLDER") {
    throw new Error("Paystack isn't configured yet (PAYSTACK_SECRET_KEY is a placeholder).");
  }
  return key;
}

export async function initializePaystackTransaction(opts: {
  email: string;
  amountNaira: number;
  reference: string;
  callbackUrl: string;
}): Promise<{ authorizationUrl: string }> {
  const res = await fetch(`${BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: opts.email,
      amount: Math.round(opts.amountNaira * 100), // kobo
      currency: "NGN",
      reference: opts.reference,
      callback_url: opts.callbackUrl,
    }),
  });

  const json = await res.json();
  if (!res.ok || !json.status) {
    throw new Error(json.message || "Paystack could not start the transaction.");
  }
  return { authorizationUrl: json.data.authorization_url as string };
}

export async function verifyPaystackTransaction(reference: string): Promise<{
  success: boolean;
  amountNaira: number;
  currency: string;
  email: string;
}> {
  const res = await fetch(`${BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secretKey()}` },
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok || !json.status) {
    throw new Error(json.message || "Could not verify the Paystack transaction.");
  }
  return {
    success: json.data.status === "success",
    amountNaira: json.data.amount / 100,
    currency: json.data.currency,
    email: json.data.customer?.email ?? "",
  };
}
