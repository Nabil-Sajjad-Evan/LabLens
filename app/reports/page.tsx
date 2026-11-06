// app/reports/page.tsx
// Screen C12: Your reports (route: /reports)
import Link from "next/link";
import Screen from "@/components/Screen";
import { PageTitle, Meta } from "@/components/Headings";
import PrimaryButton from "@/components/PrimaryButton";
import { reportHistory } from "@/lib/sample-data";

export default function ReportsPage() {
  return (
    <Screen active="Reports">
      <PageTitle>Your reports</PageTitle>
      <Meta>{reportHistory.length} reports</Meta>

      {/* Top divider */}
      <div className="mt-4 border-b-2 border-ink" />

      {/* Reports list */}
      <div className="divide-y divide-rule border-b border-rule">
        {reportHistory.map((rep) => {
          const isOutside = rep.outside > 0;
          return (
            <Link
              key={rep.id}
              href="/reports/latest"
              className="flex items-center justify-between py-4 transition-colors hover:bg-tint/40"
            >
              <div>
                <div className="font-serif text-[1.25rem] font-bold text-ink">
                  {rep.date}
                </div>
                <div className="mt-0.5 text-[1.0625rem] text-muted">
                  {rep.sub}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`size-2.5 rounded-full ${
                      isOutside ? "bg-[#97480a]" : "bg-[#1f6b4f]"
                    }`}
                  />
                  <span
                    className={`text-[0.9375rem] font-bold ${
                      isOutside ? "text-[#97480a]" : "text-[#1f6b4f]"
                    }`}
                  >
                    {isOutside
                      ? `${rep.outside} outside normal levels`
                      : "All within normal levels"}
                  </span>
                </div>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-none text-muted"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          );
        })}
      </div>

      <p className="mt-5 text-[0.9375rem] text-muted">
        Sample reports for illustration.
      </p>

      {/* Add a new report button */}
      <div className="mt-8">
        <PrimaryButton href="/upload">Add a new report</PrimaryButton>
      </div>
    </Screen>
  );
}
