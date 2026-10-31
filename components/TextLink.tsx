import Link from "next/link";
import type { ReactNode } from "react";

// A bold underlined link with a big tap area (for "Cancel", "See all results", "All reports").
// danger turns it red (for "Delete my account").
export default function TextLink({
  href,
  danger = false,
  className = "",
  children,
}: {
  href: string;
  danger?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex min-h-14 items-center text-[1.0625rem] font-bold underline underline-offset-4 ${
        danger ? "text-urgent" : "text-brand"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
