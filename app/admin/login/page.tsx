import type { Metadata } from "next";
import { Suspense } from "react";
import { Crest } from "@/components/crest";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Admin sign in" };

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <div className="text-center mb-6">
        <Crest className="w-10 h-10 mx-auto mb-2 text-navy" />
        <h1 className="font-display text-2xl font-semibold">Committee sign in</h1>
        <p className="text-muted text-sm mt-1">For the Bible Study Committee admin area.</p>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
