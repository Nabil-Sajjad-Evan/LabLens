// lib/format.ts
// Small helpers for showing lab numbers the same way on every screen.
import type { LabResult } from "./sample-data";

function decimalsOf(n: number): number {
  const s = String(n);
  const i = s.indexOf(".");
  return i === -1 ? 0 : s.length - i - 1;
}

function withDecimals(n: number, d: number): string {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
}

// 135000 -> "1,35,000", 11.8 -> "11.8"
export function formatValue(n: number): string {
  return n.toLocaleString("en-IN", { maximumFractionDigits: 3 });
}

// "13.0 – 17.0" or "1,50,000 – 4,50,000"
export function formatRange(r: LabResult): string {
  const valueDecimals = r.value === null ? 0 : Math.min(decimalsOf(r.value), 1);
  const d = Math.max(decimalsOf(r.normalLow), decimalsOf(r.normalHigh), valueDecimals);
  return `${withDecimals(r.normalLow, d)} – ${withDecimals(r.normalHigh, d)}`;
}
