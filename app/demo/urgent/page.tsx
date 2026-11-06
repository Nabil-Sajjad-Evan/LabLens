// app/demo/urgent/page.tsx
// Screen C10: Urgent result (route: /demo/urgent)
"use client";

import Screen from "@/components/Screen";
import TextLink from "@/components/TextLink";

export default function UrgentResultPage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <Screen active="Reports" showAccount>
      {/* Full-width Red Urgent Banner sitting right below the header line */}
      <div className="-mx-5 mt-0 bg-[#A4201E] px-5 py-6 text-white">
        <h1 className="font-serif text-[1.75rem] font-bold leading-tight">
          Please see a doctor as soon as you can
        </h1>
        <p className="mt-3 font-serif text-[1.0625rem] leading-snug text-white/95">
          One result is very far from normal levels. Do not wait for your next test.
        </p>
      </div>

      {/* Meta header with underline */}
      <div className="mt-5 border-b-2 border-ink pb-2">
        <p className="font-serif text-[1.0625rem] text-ink">
          Blood count from Lab A, 7 Oct 2026
        </p>
      </div>

      {/* Platelet Count Urgent Card */}
      <div className="mt-4 border-b border-rule pb-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[1.125rem] font-bold text-ink">Platelet count</h3>
            <div className="mt-2 inline-flex items-center gap-1 rounded bg-[#A4201E] px-2 py-0.5 text-[0.875rem] font-bold text-white">
              <span>!</span>
              <span>Urgent</span>
            </div>
          </div>

          <div className="text-right">
            <div className="font-serif text-[1.75rem] font-bold leading-none text-[#A4201E]">
              18,000 <span className="font-sans text-[0.875rem] font-normal text-muted">/Cmm</span>
            </div>
            <p className="mt-2 font-serif text-[0.9375rem] text-muted">
              Normal: 1,50,000 – 4,50,000
            </p>
          </div>
        </div>

        {/* Range bar with Red indicator */}
        <div className="relative mt-4 h-2 w-full rounded-full bg-rule">
          {/* Normal range green segment */}
          <div
            className="absolute top-0 bottom-0 rounded-full bg-[#B2D8C6]"
            style={{ left: "25%", width: "50%" }}
          />

          {/* Red target indicator for 18,000 */}
          <div
            className="absolute top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#A4201E] bg-white shadow-sm"
            style={{ left: "2%" }}
          >
            <div className="h-2 w-2 rounded-full bg-[#A4201E]" />
          </div>
        </div>
      </div>

      {/* What to do now section */}
      <div className="mt-7">
        <div className="border-b-2 border-ink pb-2">
          <h2 className="font-serif text-[1.375rem] font-bold text-ink">
            What to do now
          </h2>
        </div>

        <div className="divide-y divide-rule font-serif text-[1.0625rem] leading-relaxed text-ink">
          <p className="py-4">Contact a doctor or go to a hospital today.</p>
          <p className="py-4">
            Take your report with you. You can print this page.
          </p>
        </div>
      </div>

      {/* Working Print Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handlePrint}
          className="flex h-12 w-full items-center justify-center rounded-lg bg-brand font-bold text-white transition-opacity hover:opacity-90 active:opacity-80"
        >
          Print a summary for my doctor
        </button>
      </div>

      {/* See all results link */}
      <div className="mt-4">
        <TextLink href="/reports/latest/all">See all results</TextLink>
      </div>

      {/* Disclaimer footnote */}
      <p className="mt-6 font-serif text-[0.9375rem] leading-relaxed text-muted">
        Sample result for illustration. This is an automated summary, not a
        diagnosis. Only a doctor can tell you what it means.
      </p>
    </Screen>
  );
}