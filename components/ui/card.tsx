import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-card border border-line rounded-2xl p-[18px]",
        className,
      )}
      {...props}
    />
  );
}
