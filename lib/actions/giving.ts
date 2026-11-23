"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { initializePaystackTransaction } from "@/lib/giving/paystack";
import { initializeFlutterwavePayment } from "@/lib/giving/flutterwave";

export type GivingState = { error?: string };

async function siteOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

export async function initiateGiving(
  _prev: GivingState,
  formData: FormData,
): Promise<GivingState> {
  const provider = formData.get("provider");
  const email = (formData.get("email") as string | null)?.trim();
  const amountRaw = (formData.get("amount") as string | null)?.trim();
  const amount = amountRaw ? Number(amountRaw) : NaN;

  if (!email || !email.includes("@")) {
    return { error: "Enter a valid email address." };
  }
  if (!amount || amount <= 0) {
    return { error: "Enter an amount greater than zero." };
  }

  const origin = await siteOrigin();
  let redirectTo: string;

  try {
    if (provider === "paystack") {
      const reference = `cc-${randomUUID()}`;
      const { authorizationUrl } = await initializePaystackTransaction({
        email,
        amountNaira: amount,
        reference,
        callbackUrl: `${origin}/partner/thank-you?provider=paystack`,
      });
      redirectTo = authorizationUrl;
    } else if (provider === "flutterwave") {
      const txRef = `cc-${randomUUID()}`;
      const { link } = await initializeFlutterwavePayment({
        email,
        amountUsd: amount,
        txRef,
        redirectUrl: `${origin}/partner/thank-you?provider=flutterwave`,
      });
      redirectTo = link;
    } else {
      return { error: "Choose how you'd like to give." };
    }
  } catch (e) {
    return { error: (e as Error).message };
  }

  redirect(redirectTo);
}
