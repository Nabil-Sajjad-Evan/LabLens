import type { ReactNode } from "react";

// Page title, section title and the grey line under a title.
// Use these so every screen has the same heading sizes.

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="mt-[1.625rem] font-serif text-[1.9375rem] font-semibold leading-tight tracking-tight">
      {children}
    </h1>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-[2.125rem] font-serif text-[1.375rem] font-semibold leading-snug">
      {children}
    </h2>
  );
}

export function Meta({ children }: { children: ReactNode }) {
  return <p className="mt-2 font-serif text-base text-muted">{children}</p>;
}
