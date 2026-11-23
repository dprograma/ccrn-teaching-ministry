"use client";

import { useState } from "react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API can be unavailable (older browsers, insecure context)
    }
  };

  return (
    <button
      onClick={onClick}
      className="text-[12px] font-semibold text-gold shrink-0"
      aria-label="Copy"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
