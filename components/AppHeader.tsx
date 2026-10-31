import Link from "next/link";
import { user } from "@/lib/sample-data";

// The top bar: LabLens on the left, the round account button on the right.
export default function AppHeader({ showAccount = false }: { showAccount?: boolean }) {
  return (
    <header className="flex h-[3.75rem] flex-none items-center justify-between border-b border-rule px-5">
      <span className="font-serif text-[1.4375rem] font-bold leading-none tracking-tight text-brand">
        LabLens
      </span>
      {showAccount && (
        <Link
          href="/account"
          aria-label="Account"
          className="flex size-10 items-center justify-center rounded-full border-[1.5px] border-rule bg-tint text-[0.9375rem] font-bold text-brand"
        >
          {user.initials}
        </Link>
      )}
    </header>
  );
}
