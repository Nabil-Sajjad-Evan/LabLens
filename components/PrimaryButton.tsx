import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string; // give an href to make it a link to another screen
};

const BASE =
  "flex h-[3.625rem] w-full items-center justify-center rounded-md border-2 border-brand bg-brand px-4 text-lg font-bold text-white";

// The big filled button. One per screen is usually enough.
// <PrimaryButton href="/plan">See my plan</PrimaryButton>
export default function PrimaryButton({ href, className = "", children, ...rest }: Props) {
  if (href) {
    return (
      <Link href={href} className={`${BASE} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={`${BASE} ${className}`} {...rest}>
      {children}
    </button>
  );
}
