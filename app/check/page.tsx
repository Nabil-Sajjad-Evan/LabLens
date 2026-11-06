// app/check/page.tsx
// Screen C5: Check your results (route: /check)
"use client";

import { useState } from "react";
import Link from "next/link";
import Screen from "@/components/Screen";
import PrimaryButton from "@/components/PrimaryButton";

interface ResultField {
  id: string;
  name: string;
  value: string;
  unit: string;
  range?: string;
  needsAttention?: boolean;
}

const initialResults: ResultField[] = [
  {
    id: "hb",
    name: "Haemoglobin",
    value: "11.8",
    unit: "g/dl",
    range: "Normal: 13.0 – 17.0",
  },
  {
    id: "rbc",
    name: "Total RBC",
    value: "4.74",
    unit: "million/Cmm",
    range: "Normal: 4.5 – 5.5",
  },
  {
    id: "esr",
    name: "ESR",
    value: "36",
    unit: "mm",
    range: "Normal: 0 – 10",
  },
  {
    id: "platelet",
    name: "Platelet count",
    value: "1,35,000",
    unit: "/Cmm",
    range: "Normal: 1,50,000 – 4,50,000",
  },
  {
    id: "mpv",
    name: "MPV",
    value: "",
    unit: "fl",
    needsAttention: true,
  },
  {
    id: "wbc",
    name: "Total WBC",
    value: "6800",
    unit: "/Cmm",
    range: "Normal: 4,000 – 11,000",
  },
];

export default function CheckResultsPage() {
  const [reportDate, setReportDate] = useState("07/10/2026");
  const [labName, setLabName] = useState("Lab A");
  const [resultsData, setResultsData] = useState<ResultField[]>(initialResults);

  const handleValueChange = (id: string, newValue: string) => {
    setResultsData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  };

  return (
    <Screen active="Upload" showAccount>
      {/* Top back navigation */}
      <div className="pt-1">
        <Link
          href="/upload"
          className="inline-flex items-center gap-1 font-sans text-[1rem] font-bold text-brand hover:underline"
        >
          <span className="text-base leading-none">‹</span> Back
        </Link>
      </div>

      {/* Title & Description */}
      <h1 className="mt-3 font-serif text-[1.875rem] font-bold leading-tight text-ink">
        Check your results
      </h1>
      <p className="mt-2 font-sans text-[1.0625rem] leading-relaxed text-ink">
        LabLens read these from your report. Compare them with your paper report and fix anything that looks wrong.
      </p>

      {/* Date Input Field */}
      <div className="mt-6">
        <label
          htmlFor="report-date"
          className="block font-sans text-[1rem] font-bold text-ink"
        >
          Report date (day / month / year)
        </label>
        <input
          id="report-date"
          type="text"
          value={reportDate}
          onChange={(e) => setReportDate(e.target.value)}
          className="mt-2 h-12 w-full rounded border border-ink bg-white px-3 font-serif text-[1.125rem] font-bold text-ink focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      {/* Lab Name Input Field */}
      <div className="mt-5">
        <label
          htmlFor="lab-name"
          className="block font-sans text-[1rem] font-bold text-ink"
        >
          Lab name
        </label>
        <input
          id="lab-name"
          type="text"
          value={labName}
          onChange={(e) => setLabName(e.target.value)}
          className="mt-2 h-12 w-full rounded border border-ink bg-white px-3 font-sans text-[1.0625rem] text-ink focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      {/* Results Header */}
      <div className="mt-8 flex items-baseline justify-between border-b-2 border-ink pb-2">
        <h2 className="font-serif text-[1.375rem] font-bold text-ink">
          17 results found
        </h2>
        <span className="font-sans text-[0.9375rem] font-bold text-warn">
          1 needs a look
        </span>
      </div>

      {/* Result Rows */}
      <div className="divide-y divide-rule">
        {resultsData.map((item) => {
          if (item.needsAttention) {
            return (
              <div key={item.id} className="-mx-5 bg-warn-bg px-5 py-4">
                <h3 className="font-sans text-[1.125rem] font-bold text-ink">
                  {item.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={item.value}
                      placeholder="empty"
                      onChange={(e) => handleValueChange(item.id, e.target.value)}
                      className="h-11 w-32 rounded border border-ink bg-white px-3 text-center font-sans text-[1.125rem] font-bold text-muted placeholder:font-bold placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>
                  <span className="font-sans text-[0.9375rem] text-ink">
                    {item.unit}
                  </span>
                </div>
                <p className="mt-3 font-sans text-[0.9375rem] font-bold leading-snug text-warn">
                  There is no value for this on your report. Add it, or leave it empty.
                </p>
              </div>
            );
          }

          return (
            <div key={item.id} className="py-4">
              <h3 className="font-sans text-[1.125rem] font-bold text-ink">
                {item.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => handleValueChange(item.id, e.target.value)}
                  className="h-11 w-32 rounded border border-ink bg-white px-3 text-right font-serif text-[1.25rem] font-bold text-ink focus:outline-none focus:ring-1 focus:ring-brand"
                />
                <span className="font-sans text-[0.9375rem] text-muted">
                  {item.unit}
                </span>
              </div>
              {item.range && (
                <p className="mt-2 font-serif text-[0.9375rem] text-muted">
                  {item.range}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Show more results link */}
      <div className="mt-6 border-b border-rule pb-5">
        <button
          type="button"
          className="font-sans text-[1.0625rem] font-bold text-brand underline decoration-brand underline-offset-4 hover:opacity-80"
        >
          Show 11 more results
        </button>
      </div>

      {/* Bottom CTA Button */}
      <div className="mt-6">
        <PrimaryButton href="/reports/latest">
          Looks right, show my results
        </PrimaryButton>
      </div>

      {/* Cancel Link */}
      <div className="mt-4 pb-4">
        <Link
          href="/upload"
          className="font-sans text-[1.0625rem] font-bold text-ink underline underline-offset-4 hover:text-muted"
        >
          Cancel
        </Link>
      </div>
    </Screen>
  );
}