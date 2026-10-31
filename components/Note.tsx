import type { ReactNode } from "react";

// The soft grey box used for disclaimers and tips.
export default function Note({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={`mt-5 rounded-md bg-tint p-4 text-[0.9375rem] leading-relaxed text-ink ${className}`}
    >
      {children}
    </p>
  );
}
