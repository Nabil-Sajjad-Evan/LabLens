import type { Status } from "@/lib/sample-data";
import { STATUS_STYLES } from "./status";

function Icon({ status }: { status: Status }) {
  const common = {
    width: 12,
    height: 12,
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (status === "low")
    return (
      <svg {...common}>
        <path d="M6 2v8M2.5 6.5L6 10l3.5-3.5" />
      </svg>
    );
  if (status === "high")
    return (
      <svg {...common}>
        <path d="M6 10V2M2.5 5.5L6 2l3.5 3.5" />
      </svg>
    );
  if (status === "normal")
    return (
      <svg {...common}>
        <path d="M2 6.5L5 9.5L10 3" />
      </svg>
    );
  return (
    <span aria-hidden="true" className="font-bold">
      !
    </span>
  );
}

// The small coloured label: ↓ Low, ↑ High, ✓ Normal, ! Urgent.
// Always a word plus a symbol, never colour alone.
export default function StatusTag({ status }: { status: Status }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex h-7 items-center gap-1.5 rounded px-2.5 text-[0.9375rem] font-bold ${s.tag}`}
    >
      <Icon status={status} />
      {s.label}
    </span>
  );
}
