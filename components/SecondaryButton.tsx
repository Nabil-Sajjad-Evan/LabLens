import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string; // give an href to make it a link to another screen
};

const BASE =
  "flex h-[3.625rem] w-full items-center justify-center rounded-md border-2 border-brand bg-white px-4 text-lg font-bold text-brand";

// The big outlined button, for the second choice on a screen.
export default function SecondaryButton({ href, className = "", children, ...rest }: Props) {
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
