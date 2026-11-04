// app/trends/page.tsx
// Screen C8: Trends (route: /trends)
"use client";

import { useState } from "react";
import Screen from "@/components/Screen";
import { PageTitle, Meta } from "@/components/Headings";
import PrimaryButton from "@/components/PrimaryButton";
import TrendsChart from "./TrendsChart";
import { hbTrend } from "@/lib/sample-data";

const TABS = ["Haemoglobin", "Platelets", "ESR", "Neutrophils"];

export default function TrendsPage() {
  const [activeTab, setActiveTab] = useState("Haemoglobin");

  // Sorted reverse chronologically (latest first) to match C8 mockup
  const readings = [...hbTrend].reverse();

  return (
    <Screen active="Trends">
      <PageTitle>Trends</PageTitle>
      <Meta>4 reports, January to October 2026</Meta>

      {/* Test selection tabs */}
      <div className="mt-5 flex gap-4 overflow-x-auto border-b border-rule">
        {TABS.map((tab) => {
          const on = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`-mb-px pb-2.5 text-base transition-colors ${
                on
                  ? "border-b-[3px] border-brand font-bold text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <TrendsChart />

      <p className="mt-3 text-[0.9375rem] text-muted">
        Sample data for illustration. Values in g/dl.
      </p>

      {/* Key insight */}
      <section className="mt-5">
        <h2 className="font-serif text-[1.375rem] font-bold text-ink">
          Your haemoglobin is going up.
        </h2>
        <p className="mt-1 text-[1.0625rem] leading-relaxed text-ink">
          Latest: 11.8, up from 11.1 in July. Still lower than normal.
        </p>
      </section>

      {/* All readings table */}
      <section className="mt-7">
        <div className="border-b-2 border-ink pb-2">
          <h2 className="font-serif text-[1.375rem] font-bold text-ink">
            All readings
          </h2>
        </div>

        {/* Table header */}
        <div className="flex items-center justify-between border-b border-rule py-3 text-[0.9375rem] font-bold text-ink">
          <span className="w-1/3">Date</span>
          <span className="w-1/2">Name on report</span>
          <span className="w-1/6 text-right">Value</span>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-rule border-b border-rule">
          {readings.map((r) => (
            <div
              key={r.date}
              className="flex items-center justify-between py-3.5 text-[1.0625rem]"
            >
              <span className="w-1/3 text-ink">{r.date}</span>
              <span className="w-1/2 text-muted">{r.printedAs}</span>
              <span className="w-1/6 text-right font-serif font-bold text-ink">
                {r.value.toFixed(1)}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
          Different labs call the same test by different names. LabLens matches
          them for you, so one line covers every report.
        </p>
      </section>

      {/* Call to action button */}
      <div className="mt-8">
        <PrimaryButton href="/plan">See my plan</PrimaryButton>
      </div>
    </Screen>
  );
}
