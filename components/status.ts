// components/status.ts
// The colour classes for each status, kept in one place so every component matches.
import type { Status } from "@/lib/sample-data";

export const STATUS_STYLES: Record<
  Status,
  { label: string; text: string; tag: string; marker: string }
> = {
  low: {
    label: "Low",
    text: "text-low",
    tag: "bg-low-bg text-low",
    marker: "bg-low ring-low",
  },
  high: {
    label: "High",
    text: "text-high",
    tag: "bg-high-bg text-high",
    marker: "bg-high ring-high",
  },
  urgent: {
    label: "Urgent",
    text: "text-urgent",
    tag: "bg-urgent text-white",
    marker: "bg-urgent ring-urgent",
  },
  normal: {
    label: "Normal",
    text: "text-ok",
    tag: "bg-ok-bg text-ok",
    marker: "bg-ok ring-ok",
  },
};
