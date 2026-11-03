// app/demo/all-normal/page.tsx
// Screen C11: All normal (route: /demo/all-normal)
import Link from "next/link";
import Screen from "@/components/Screen";
import PrimaryButton from "@/components/PrimaryButton";
import TextLink from "@/components/TextLink";

export default function AllNormalDemoPage() {
  return (
    <Screen active="Reports" showAccount>
      {/* Top back navigation */}
      <div className="pt-1">
        <Link
          href="/reports"
          className="inline-flex items-center gap-1 font-serif text-[1rem] font-bold text-brand hover:underline"
        >
          <span className="text-base leading-none">‹</span> All reports
        </Link>
      </div>

      {/* Screen Title & Subtitle */}
      <h1 className="mt-3 font-serif text-[1.875rem] font-bold text-ink">
        Report summary
      </h1>
      <p className="mt-1 font-serif text-[1.0625rem] text-ink">
        Blood count from Lab A, 7 Oct 2026
      </p>

      {/* All Normal Green Banner */}
      <div className="-mx-5 mt-5 bg-[#1B6B45] px-5 py-6 text-white">
        <h2 className="font-serif text-[1.625rem] font-bold leading-tight">
          All your results are within normal levels
        </h2>
        <p className="mt-3 font-serif text-[1.0625rem] leading-snug text-white/95">
          Nothing on this report is outside normal levels.
        </p>

        <div className="mt-6">
          <div className="font-serif text-[2.25rem] font-bold leading-none">
            16
          </div>
          <div className="mt-2 flex items-center gap-2 font-serif text-[1rem] text-white/95">
            <span className="h-2 w-2 rounded-full bg-[#7FD3A6]" />
            <span>Normal</span>
          </div>
          {/* Solid full green progress indicator bar */}
          <div className="mt-3 h-2 w-full rounded-full bg-[#7FD3A6]" />
        </div>
      </div>

      {/* A few of your results section */}
      <div className="mt-7">
        <div className="border-b-2 border-ink pb-2">
          <h2 className="font-serif text-[1.375rem] font-bold text-ink">
            A few of your results
          </h2>
        </div>

        {/* Result 1: Haemoglobin */}
        <div className="border-b border-rule py-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[1.125rem] font-bold text-ink">Haemoglobin</h3>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded bg-[#E3F2E9] px-2 py-0.5 text-[0.875rem] font-medium text-[#1B6B45]">
                <span className="text-xs">✓</span>
                <span>Normal</span>
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif text-[1.625rem] font-bold leading-none text-[#1B6B45]">
                14.6{" "}
                <span className="font-sans text-[0.875rem] font-normal text-muted">
                  g/dl
                </span>
              </div>
              <p className="mt-2 font-serif text-[0.9375rem] text-muted">
                Normal: 13.0 – 17.0
              </p>
            </div>
          </div>

          {/* Haemoglobin Range Bar with centered marker */}
          <div className="relative mt-4 h-2 w-full rounded-full bg-rule">
            <div
              className="absolute top-0 bottom-0 rounded-full bg-[#B2D8C6]"
              style={{ left: "25%", width: "45%" }}
            />
            <div
              className="absolute top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#1B6B45] bg-white shadow-sm"
              style={{ left: "55%" }}
            >
              <div className="h-2 w-2 rounded-full bg-[#1B6B45]" />
            </div>
          </div>
        </div>

        {/* Result 2: Platelet count */}
        <div className="border-b border-rule py-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[1.125rem] font-bold text-ink">
                Platelet count
              </h3>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded bg-[#E3F2E9] px-2 py-0.5 text-[0.875rem] font-medium text-[#1B6B45]">
                <span className="text-xs">✓</span>
                <span>Normal</span>
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif text-[1.625rem] font-bold leading-none text-[#1B6B45]">
                2,40,000{" "}
                <span className="font-sans text-[0.875rem] font-normal text-muted">
                  /Cmm
                </span>
              </div>
              <p className="mt-2 font-serif text-[0.9375rem] text-muted">
                Normal: 1,50,000 – 4,50,000
              </p>
            </div>
          </div>

          {/* Platelet Range Bar with centered marker */}
          <div className="relative mt-4 h-2 w-full rounded-full bg-rule">
            <div
              className="absolute top-0 bottom-0 rounded-full bg-[#B2D8C6]"
              style={{ left: "25%", width: "48%" }}
            />
            <div
              className="absolute top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#1B6B45] bg-white shadow-sm"
              style={{ left: "44%" }}
            >
              <div className="h-2 w-2 rounded-full bg-[#1B6B45]" />
            </div>
          </div>
        </div>
      </div>

      {/* See all 16 results link */}
      <div className="mt-5">
        <TextLink href="/reports/latest/all">See all 16 results</TextLink>
      </div>

      {/* LabLens Insights section */}
      <div className="mt-8">
        <h2 className="font-serif text-[1.375rem] font-bold text-ink">
          LabLens Insights
        </h2>

        <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink">
          All 16 results LabLens could read are within normal levels.
        </p>

        <p className="mt-4 font-serif text-[1.0625rem] leading-relaxed text-ink">
          A normal report does not rule out every health problem. If you feel
          unwell, talk to your doctor.
        </p>

        {/* Disclaimer box */}
        <div className="mt-6 rounded-lg bg-[#F3F4F6] p-4 text-[0.9375rem] leading-relaxed text-ink">
          Automated summary for general information. It is not a diagnosis.
          Always check with your doctor.
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="mt-6 pb-2">
        <PrimaryButton href="/trends">
          See how your results changed
        </PrimaryButton>
      </div>
    </Screen>
  );
}