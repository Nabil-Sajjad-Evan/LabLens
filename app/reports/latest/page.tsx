// app/reports/latest/page.tsx
// Screen C6: Report summary (route: /reports/latest)
import Link from "next/link";
import Screen from "@/components/Screen";
import StatusBanner from "@/components/StatusBanner";
import ResultRow from "@/components/ResultRow";
import Note from "@/components/Note";
import PrimaryButton from "@/components/PrimaryButton";
import TextLink from "@/components/TextLink";
import { PageTitle, Meta } from "@/components/Headings";
import { disclaimer, insights, report, results } from "@/lib/sample-data";

const pick = (id: string) => results.find((r) => r.id === id)!;

export default function ReportSummaryPage() {
  return (
    <Screen active="Reports" showAccount>
      {/* Top back link */}
      <Link
        href="/reports"
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
        All reports
      </Link>

      <PageTitle>Report summary</PageTitle>
      <Meta>
        {report.panel} from {report.lab}, {report.date}
      </Meta>

      {/* Indigo StatusBanner */}
      <StatusBanner
        tone="info"
        title="11 results are outside normal levels"
        text="Please talk to your doctor about them."
        counts={{ low: 8, high: 3, normal: 5 }}
      />

      {/* Section Header with '4 of 11' indicator */}
      <div className="mt-8 flex items-baseline justify-between border-b-2 border-ink pb-2">
        <h2 className="font-serif text-[1.375rem] font-semibold leading-snug text-ink">
          Outside normal levels
        </h2>
        <span className="font-serif text-[0.9375rem] text-muted">
          4 of 11
        </span>
      </div>

      {/* 4 highlighted out-of-range results */}
      <div className="divide-y divide-rule">
        <ResultRow result={pick("plt")} />
        <ResultRow result={pick("hb")} />
        <ResultRow result={pick("esr")} />
        <ResultRow result={pick("neu")} />
      </div>

      <TextLink href="/reports/latest/all" className="mt-1">
        See all 16 results
      </TextLink>

      {/* LabLens Insights section */}
      <h2 className="mt-8 font-serif text-[1.375rem] font-semibold leading-snug text-ink">
        LabLens Insights
      </h2>
      <div className="mt-3.5 space-y-3.5 font-serif text-[1.0625rem] leading-relaxed text-ink">
        {insights.map((insight, idx) => (
          <p key={idx}>{insight}</p>
        ))}
      </div>

      {/* Medical disclaimer note */}
      <Note className="mt-6">{disclaimer}</Note>

      {/* Bottom action button */}
      <div className="mt-7 pb-2">
        <PrimaryButton href="/trends">See how your results changed</PrimaryButton>
      </div>
    </Screen>
  );
}