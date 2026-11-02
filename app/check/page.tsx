// app/check/page.tsx
// Screen C5: Check results (route: /check)
"use client";

import { useState } from "react";
import Link from "next/link";
import Screen from "@/components/Screen";
import { PageTitle } from "@/components/Headings";
import PrimaryButton from "@/components/PrimaryButton";
import TextLink from "@/components/TextLink";
import { results as initialResults, formatNumber } from "@/lib/sample-data";
import { formatRange } from "@/lib/format";

export default function CheckResultsPage() {
  const [reportDate, setReportDate] = useState("07/10/2026");
  const [labName, setLabName] = useState("Lab A");
  const [showAll, setShowAll] = useState(false);

  // Keep test values in state
  const [testValues, setTestValues] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const r of initialResults) {
      if (r.id === "mpv") {
        map[r.id] = "";
      } else if (r.value !== null) {
        map[r.id] = r.id === "plt" ? formatNumber(r.value) : String(r.value);
      } else {
        map[r.id] = "";
      }
    }
    return map;
  });

  const handleValueChange = (id: string, val: string) => {
    setTestValues((prev) => ({ ...prev, [id]: val }));
  };

  // The 6 tests visible initially in the mockup
  const initialIds = ["hb", "rbc", "esr", "plt", "mpv", "wbc"];
  const initialItems = initialIds
    .map((id) => initialResults.find((r) => r.id === id))
    .filter(Boolean) as typeof initialResults;

  const remainingItems = initialResults.filter((r) => !initialIds.includes(r.id));
  const displayedItems = showAll ? [...initialItems, ...remainingItems] : initialItems;

  return (
    <Screen active="Upload" showAccount>
      {/* Back button */}
      <Link
        href="/upload"
        className="mt-1 flex items-center gap-1.5 text-[1.0625rem] font-bold text-brand"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back
      </Link>

      <PageTitle>Check your results</PageTitle>

      <p className="mt-2 text-[1.0625rem] leading-snug text-muted">
        LabLens read these from your report. Compare them with your paper report and fix anything
        that looks wrong.
      </p>

      {/* Meta input fields */}
      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="report-date" className="block text-[0.9375rem] font-bold text-ink">
            Report date (day / month / year)
          </label>
          <input
            id="report-date"
            type="text"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
            className="mt-1.5 h-12 w-full rounded-md border-2 border-rule bg-white px-3.5 font-serif text-lg text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
        </div>

        <div>
          <label htmlFor="lab-name" className="block text-[0.9375rem] font-bold text-ink">
            Lab name
          </label>
          <input
            id="lab-name"
            type="text"
            value={labName}
            onChange={(e) => setLabName(e.target.value)}
            className="mt-1.5 h-12 w-full rounded-md border-2 border-rule bg-white px-3.5 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
        </div>
      </div>

      {/* Count summary bar */}
      <div className="mt-7 flex items-baseline justify-between border-b-2 border-ink pb-2">
        <span className="font-serif text-[1.375rem] font-bold text-ink">17 results found</span>
        <span className="font-serif text-[0.9375rem] font-bold text-warn">
          1 needs a look
        </span>
      </div>

      {/* Results list */}
      <div>
        {displayedItems.map((r) => {
          const isMpv = r.id === "mpv";
          const val = testValues[r.id] ?? "";

          return (
            <div
              key={r.id}
              className={`py-3.5 ${
                isMpv
                  ? "-mx-5 bg-[#FFF2DE] px-5 py-4"
                  : "border-b border-rule last:border-b-0"
              }`}
            >
              <label htmlFor={`input-${r.id}`} className="block text-[1.0625rem] font-bold text-ink">
                {r.name}
              </label>

              <div className="mt-2 flex items-center gap-2.5">
                <input
                  id={`input-${r.id}`}
                  type="text"
                  value={val}
                  placeholder={isMpv ? "empty" : ""}
                  onChange={(e) => handleValueChange(r.id, e.target.value)}
                  className={`h-11 w-36 rounded-md border-2 bg-white px-3 text-right font-serif text-[1.25rem] font-bold ${
                    isMpv && !val
                      ? "border-[#8A3F00] text-center font-serif text-base font-bold text-muted placeholder:text-muted"
                      : "border-rule text-ink"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand`}
                />
                <span className="font-serif text-[0.9375rem] text-muted">{r.unit}</span>
              </div>

              {isMpv && !val && (
                <p className="mt-2 text-[0.875rem] font-bold leading-snug text-warn">
                  There is no value for this on your report. Add it, or leave it empty.
                </p>
              )}

              <p className="mt-2 font-serif text-[0.9375rem] text-muted">
                Normal: {formatRange(r)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Show more toggle */}
      {!showAll && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="text-[1.0625rem] font-bold text-brand underline underline-offset-4"
          >
            Show 11 more results
          </button>
        </div>
      )}

      {/* Bottom actions */}
      <div className="mt-8 flex flex-col items-center">
        <PrimaryButton href="/reports/latest">Looks right, show my results</PrimaryButton>
        <TextLink href="/upload" muted className="mt-1">
          Cancel
        </TextLink>
      </div>
    </Screen>
  );
}