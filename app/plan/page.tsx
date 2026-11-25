// app/plan/page.tsx
// Screen C9: Plan (route: /plan)
"use client";

import { useSyncExternalStore } from "react";
import Screen from "@/components/Screen";
import { PageTitle } from "@/components/Headings";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Note from "@/components/Note";
import {
  disclaimer,
  getStatus,
  plan,
  report,
  results,
} from "@/lib/sample-data";
import { formatRange, formatValue } from "@/lib/format";

const HABITS_STORAGE_KEY = "lablens-checked-habits";
const DEFAULT_HABITS_JSON = "[0]";
const HABITS_EVENT = "lablens-habits-change";

function subscribeHabits(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(HABITS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(HABITS_EVENT, callback);
  };
}

function getHabitsSnapshot(): string {
  try {
    return window.localStorage.getItem(HABITS_STORAGE_KEY) ?? DEFAULT_HABITS_JSON;
  } catch {
    return DEFAULT_HABITS_JSON;
  }
}

function getHabitsServerSnapshot(): string {
  return DEFAULT_HABITS_JSON;
}

function parseCheckedHabits(raw: string): number[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is number => typeof item === "number");
    }
  } catch {
    // Fallback to default checked state
  }
  return [0];
}

function downloadCalendarFile() {
  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//LabLens//Next Test Reminder//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:lablens-next-test-20270107@lablens.local",
    "DTSTAMP:20261125T000000Z",
    "DTSTART;VALUE=DATE:20270107",
    "DTEND;VALUE=DATE:20270108",
    `SUMMARY:${plan.nextTest}`,
    `DESCRIPTION:${plan.nextTest} (${plan.nextTestDate}). Your doctor decides the right time.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([icsLines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lablens-next-test.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const PRINT_STYLES = `
@media print {
  @page {
    margin: 12mm;
  }
  nav[aria-label="Main"],
  header a[aria-label="Account"] {
    display: none !important;
  }
  .mx-auto.min-h-dvh {
    max-width: 100% !important;
    min-height: auto !important;
    border: none !important;
  }
}
`;

export default function PlanPage() {
  const rawHabits = useSyncExternalStore(
    subscribeHabits,
    getHabitsSnapshot,
    getHabitsServerSnapshot
  );
  const checkedHabits = parseCheckedHabits(rawHabits);

  const toggleHabit = (index: number) => {
    const next = checkedHabits.includes(index)
      ? checkedHabits.filter((i) => i !== index)
      : [...checkedHabits, index];
    try {
      window.localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(HABITS_EVENT));
    } catch {
      // Ignore storage errors in restricted environments
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const resultsNeedingLook = results.filter((r) => {
    const status = getStatus(r);
    return status === "low" || status === "high" || status === "urgent";
  });

  return (
    <Screen active="Plan">
      <style>{PRINT_STYLES}</style>

      {/* Screen heading */}
      <div className="print:hidden">
        <PageTitle>Your plan</PageTitle>
        <p className="mt-2 text-[1.0625rem] leading-relaxed text-muted">
          General tips from your latest results. This is not medical advice.
        </p>
      </div>

      {/* Print-only heading */}
      <div className="hidden print:block">
        <h1 className="mt-3 font-serif text-2xl font-semibold text-ink">
          Summary for your doctor
        </h1>
        <p className="mt-1 font-serif text-base text-muted">
          {report.panel} from {report.lab}, {report.date}
        </p>
      </div>

      {/* Next test section */}
      <section className="mt-7 print:mt-4">
        <div className="border-b-2 border-ink pb-2 print:pb-1">
          <h2 className="font-serif text-[1.375rem] font-bold text-ink print:text-lg">
            Next test
          </h2>
        </div>
        <h3 className="mt-4 font-serif text-[1.375rem] font-bold leading-snug text-ink print:mt-2 print:text-base">
          {plan.nextTest}
        </h3>
        <p className="mt-1.5 font-serif text-[1.125rem] font-bold text-brand print:mt-0.5 print:text-base">
          {plan.nextTestDate}
        </p>
        <p className="mt-1 text-[1.0625rem] text-muted print:text-sm">
          Your doctor decides the right time.
        </p>
        <div className="mt-4 print:hidden">
          <SecondaryButton onClick={downloadCalendarFile}>
            Add to my calendar
          </SecondaryButton>
        </div>
      </section>

      {/* Print-only: Results outside normal levels */}
      <section className="hidden print:mt-4 print:block">
        <div className="border-b-2 border-ink pb-1">
          <h2 className="font-serif text-lg font-bold text-ink">
            Results that need a look ({resultsNeedingLook.length})
          </h2>
        </div>
        <div className="divide-y divide-rule border-b border-rule">
          {resultsNeedingLook.map((r) => {
            const status = getStatus(r);
            const isLow = status === "low";
            const isUrgent = status === "urgent";
            const statusLabel = isUrgent
              ? "! Urgent"
              : isLow
              ? "↓ Low"
              : "↑ High";
            const statusColor = isUrgent
              ? "text-urgent"
              : isLow
              ? "text-low"
              : "text-high";

            return (
              <div
                key={r.id}
                className="flex items-baseline justify-between gap-4 py-1.5 text-sm"
              >
                <span className="font-bold text-ink">{r.name}</span>
                <div className="flex items-baseline gap-3 whitespace-nowrap">
                  <span className={`font-bold ${statusColor}`}>
                    {statusLabel}
                  </span>
                  <span className="font-serif font-bold text-ink">
                    {r.value !== null ? formatValue(r.value) : "—"} {r.unit}
                  </span>
                  <span className="font-serif text-muted">
                    Normal: {formatRange(r)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Healthy habits to try section (screen only) */}
      <section className="mt-8 print:hidden">
        <div className="border-b-2 border-ink pb-2">
          <h2 className="font-serif text-[1.375rem] font-bold text-ink">
            Healthy habits to try
          </h2>
        </div>
        <ul className="divide-y divide-rule border-b border-rule">
          {plan.habits.map((habit, index) => {
            const isChecked = checkedHabits.includes(index);
            return (
              <li key={habit} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleHabit(index)}
                  className="flex w-full items-center gap-3.5 text-left"
                  aria-checked={isChecked}
                  role="checkbox"
                >
                  <span
                    className={`flex size-6 flex-none items-center justify-center rounded-full border-2 transition-colors ${
                      isChecked
                        ? "border-brand bg-brand text-white"
                        : "border-muted bg-white"
                    }`}
                  >
                    {isChecked && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2.5 6.5L5 9L9.5 3.5" />
                      </svg>
                    )}
                  </span>
                  <span className="text-[1.0625rem] leading-normal text-ink">
                    {habit}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
          General tips only. LabLens never suggests medicines or supplements.
        </p>
      </section>

      {/* Questions for your doctor section */}
      <section className="mt-8 print:mt-4">
        <div className="border-b-2 border-ink pb-2 print:pb-1">
          <h2 className="font-serif text-[1.375rem] font-bold text-ink print:text-lg">
            Questions for your doctor
          </h2>
        </div>
        <ul className="divide-y divide-rule border-b border-rule">
          {plan.doctorQuestions.map((question) => (
            <li
              key={question}
              className="py-4 text-[1.0625rem] leading-normal text-ink print:py-1.5 print:text-sm"
            >
              {question}
            </li>
          ))}
        </ul>
      </section>

      {/* Print-only disclaimer */}
      <div className="hidden print:mt-4 print:block">
        <Note className="mt-0 py-2 text-xs">{disclaimer}</Note>
      </div>

      {/* Print summary button */}
      <div className="mt-6 print:hidden">
        <PrimaryButton onClick={handlePrint}>
          Print a summary for my doctor
        </PrimaryButton>
      </div>
    </Screen>
  );
}
