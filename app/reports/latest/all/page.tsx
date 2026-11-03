// app/reports/latest/all/page.tsx
// Screen C7: All results (route: /reports/latest/all)
"use client";

import { useState } from "react";
import Link from "next/link";
import Screen from "@/components/Screen";
import ResultRow from "@/components/ResultRow";
import PrimaryButton from "@/components/PrimaryButton";
import { PageTitle, Meta } from "@/components/Headings";
import { getStatus, report, results } from "@/lib/sample-data";

type TabKey = "all" | "low" | "high" | "normal";

export default function AllResultsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const lowResults = results.filter((r) => getStatus(r) === "low");
  const highResults = results.filter((r) => getStatus(r) === "high");
  const normalResults = results.filter((r) => getStatus(r) === "normal");
  const outsideResults = results.filter((r) => {
    const s = getStatus(r);
    return s === "low" || s === "high" || s === "urgent";
  });

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: "all", label: "All", count: 16 },
    { key: "low", label: "Low", count: 8 },
    { key: "high", label: "High", count: 3 },
    { key: "normal", label: "Normal", count: 5 },
  ];

  return (
    <Screen active="Reports" showAccount>
      {/* Top back link */}
      <Link
        href="/reports/latest"
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
        Report summary
      </Link>

      <PageTitle>All results</PageTitle>
      <Meta>
        16 results, {report.panel.toLowerCase()} from {report.lab}, {report.date}
      </Meta>

      {/* Filter Tabs */}
      <div className="mt-5 flex border-b border-rule" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 pb-2.5 text-center text-[1.0625rem] font-bold transition-colors ${
                isActive
                  ? "-mb-px border-b-[3px] border-ink font-bold text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {tab.label} <span className="font-serif font-bold">{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* All Tab (Grouped View) */}
      {activeTab === "all" && (
        <div className="mt-7">
          {/* Outside normal levels header */}
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
            <h2 className="font-serif text-[1.375rem] font-semibold leading-snug text-ink">
              Outside normal levels
            </h2>
            <span className="font-serif text-[1.125rem] font-bold text-muted">
              11
            </span>
          </div>
          <div>
            {outsideResults.map((r) => (
              <ResultRow key={r.id} result={r} showBar={false} />
            ))}
          </div>

          {/* Normal levels header */}
          <div className="mt-8 flex items-baseline justify-between border-b-2 border-ink pb-2">
            <h2 className="font-serif text-[1.375rem] font-semibold leading-snug text-ink">
              Normal
            </h2>
            <span className="font-serif text-[1.125rem] font-bold text-muted">
              5
            </span>
          </div>
          <div>
            {normalResults.map((r) => (
              <ResultRow key={r.id} result={r} showBar={false} />
            ))}
          </div>
        </div>
      )}

      {/* Low Tab */}
      {activeTab === "low" && (
        <div className="mt-6">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
            <h2 className="font-serif text-[1.375rem] font-semibold leading-snug text-ink">
              Low
            </h2>
            <span className="font-serif text-[1.125rem] font-bold text-muted">
              {lowResults.length}
            </span>
          </div>
          <div>
            {lowResults.map((r) => (
              <ResultRow key={r.id} result={r} showBar={false} />
            ))}
          </div>
        </div>
      )}

      {/* High Tab */}
      {activeTab === "high" && (
        <div className="mt-6">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
            <h2 className="font-serif text-[1.375rem] font-semibold leading-snug text-ink">
              High
            </h2>
            <span className="font-serif text-[1.125rem] font-bold text-muted">
              {highResults.length}
            </span>
          </div>
          <div>
            {highResults.map((r) => (
              <ResultRow key={r.id} result={r} showBar={false} />
            ))}
          </div>
        </div>
      )}

      {/* Normal Tab */}
      {activeTab === "normal" && (
        <div className="mt-6">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
            <h2 className="font-serif text-[1.375rem] font-semibold leading-snug text-ink">
              Normal
            </h2>
            <span className="font-serif text-[1.125rem] font-bold text-muted">
              {normalResults.length}
            </span>
          </div>
          <div>
            {normalResults.map((r) => (
              <ResultRow key={r.id} result={r} showBar={false} />
            ))}
          </div>
        </div>
      )}

      {/* MPV footnote */}
      <p className="mt-6 text-[0.875rem] leading-relaxed text-muted">
        One test, MPV, had no value on your report, so it is not shown here.
      </p>

      {/* Bottom Button */}
      <div className="mt-7 pb-2">
        <PrimaryButton href="/reports/latest">Back to summary</PrimaryButton>
      </div>
    </Screen>
  );
}