import type { ReactNode } from "react";

type Tone = "info" | "urgent" | "ok";

const TONE: Record<Tone, { bg: string; swatch: { low: string; high: string; normal: string } }> = {
  info: {
    bg: "bg-brand",
    swatch: { low: "#86b8f2", high: "#f5aa62", normal: "#74d1a2" },
  },
  urgent: {
    bg: "bg-urgent",
    swatch: { low: "#86b8f2", high: "#f5aa62", normal: "#74d1a2" },
  },
  ok: {
    bg: "bg-ok",
    swatch: { low: "#86b8f2", high: "#f5aa62", normal: "#8fe0b6" },
  },
};

// The full-width coloured block at the top of the summary screens.
// tone="info" (indigo) for a normal summary, "urgent" (red), "ok" (green).
// counts={{ low: 8, high: 3, normal: 5 }} adds the numbers and the three-colour bar.
export default function StatusBanner({
  tone = "info",
  title,
  text,
  counts,
  children,
}: {
  tone?: Tone;
  title: string;
  text?: string;
  counts?: { low?: number; high?: number; normal?: number };
  children?: ReactNode;
}) {
  const t = TONE[tone];
  const items = counts
    ? ([
        ["low", "Low", counts.low],
        ["high", "High", counts.high],
        ["normal", "Normal", counts.normal],
      ] as const).filter(([, , n]) => n !== undefined)
    : [];
  const summary = items.map(([, label, n]) => `${n} ${label.toLowerCase()}`).join(", ");

  return (
    <section className={`-mx-5 mt-[1.375rem] px-5 pb-[1.625rem] pt-6 text-white ${t.bg}`}>
      <h2 className="font-serif text-[1.6875rem] font-semibold leading-tight">{title}</h2>
      {text && <p className="mt-2.5 text-lg leading-normal text-[#edebfa]">{text}</p>}

      {items.length > 0 && (
        <>
          <div className="mt-[1.375rem] flex gap-2">
            {items.map(([key, label, n]) => (
              <div key={key} className="flex-1">
                <div className="font-serif text-4xl font-bold leading-none">{n}</div>
                <div className="mt-2 flex items-center gap-[0.4375rem] text-base">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: t.swatch[key] }}
                  />
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div
            role="img"
            aria-label={summary}
            className="mt-4 flex h-3 gap-[3px] overflow-hidden rounded-sm"
          >
            {items.map(([key, , n]) => (
              <div key={key} style={{ flex: n, background: t.swatch[key] }} />
            ))}
          </div>
        </>
      )}
      {children}
    </section>
  );
}
