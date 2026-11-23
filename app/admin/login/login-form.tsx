"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const data = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });
    setBusy(false);
    if (res?.error) {
      setError("Email or password is incorrect.");
      return;
    }
    router.push(params.get("callbackUrl") ?? "/admin");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-[13px] font-semibold mb-1.5" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full p-3 rounded-xl border border-line bg-card text-ink"
        />
      </div>
      <div>
        <label className="block text-[13px] font-semibold mb-1.5" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full p-3 rounded-xl border border-line bg-card text-ink"
        />
      </div>
      {error && <p className="text-claret text-sm">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full py-3 rounded-full bg-navy text-white font-semibold disabled:opacity-60"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
