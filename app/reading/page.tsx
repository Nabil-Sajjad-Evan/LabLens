// C3 Reading your report (route: /reading)
import Link from "next/link";
import Screen from "@/components/Screen";
import { PageTitle } from "@/components/Headings";
import TextLink from "@/components/TextLink";
import Step from "./Step";

export default function ReadingPage() {
  return (
    <Screen>
      <PageTitle>Reading your report</PageTitle>
      <p className="mt-2.5 text-[1.0625rem] leading-relaxed text-muted">
        This usually takes less than a minute. Please keep this page open.
      </p>

      {/* Tapping the page sketch goes on to the Check results screen (for the demo). */}
      <Link href="/check" className="-mx-5 mt-6 block bg-tint px-5 py-4" aria-label="Continue">
        <svg
          viewBox="0 0 350 210"
          className="block h-auto w-full"
          role="img"
          aria-label="A lab report being read"
        >
          <rect x="85" y="14" width="180" height="188" fill="#FFFFFF" stroke="#DAD8E6" strokeWidth="1.5" />
          <rect x="101" y="30" width="70" height="8" fill="#DAD8E6" />
          <rect x="101" y="52" width="148" height="6" fill="#ECEAF4" />
          <rect x="101" y="68" width="148" height="6" fill="#ECEAF4" />
          <rect x="101" y="88" width="148" height="18" fill="#D9D6F0" />
          <rect x="101" y="112" width="148" height="6" fill="#ECEAF4" />
          <rect x="101" y="128" width="148" height="18" fill="#D9D6F0" />
          <rect x="101" y="152" width="148" height="6" fill="#ECEAF4" />
          <rect x="101" y="168" width="110" height="6" fill="#ECEAF4" />
          <rect x="85" y="84" width="180" height="3" fill="#3A3485" />
        </svg>
      </Link>

      <ul className="mt-5 border-t-2 border-ink">
        <Step state="done">Photo received</Step>
        <Step state="active">Reading the values</Step>
        <Step state="todo">Matching test names across labs</Step>
        <Step state="todo">Checking against normal levels</Step>
      </ul>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
        You will check every value on the next screen.
      </p>

      <div className="min-h-3 flex-1" />
      <TextLink href="/upload" muted className="mt-3">
        Cancel
      </TextLink>
    </Screen>
  );
}
