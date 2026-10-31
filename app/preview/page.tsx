// A test page that shows every shared component. Open http://localhost:3000/preview
// You can delete this folder once all screens are built.
import Screen from "@/components/Screen";
import StatusBanner from "@/components/StatusBanner";
import ResultRow from "@/components/ResultRow";
import StatusTag from "@/components/StatusTag";
import Note from "@/components/Note";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import TextLink from "@/components/TextLink";
import { PageTitle, SectionTitle, Meta } from "@/components/Headings";
import { disclaimer, report, results, urgentResult } from "@/lib/sample-data";

const pick = (id: string) => results.find((r) => r.id === id)!;

export default function PreviewPage() {
  return (
    <Screen active="Reports" showAccount>
      <TextLink href="/reports">All reports</TextLink>
      <PageTitle>Report summary</PageTitle>
      <Meta>
        {report.panel} from {report.lab}, {report.date}
      </Meta>

      <StatusBanner
        tone="info"
        title="11 results are outside normal levels"
        text="Please talk to your doctor about them."
        counts={{ low: 8, high: 3, normal: 5 }}
      />

      <SectionTitle>Outside normal levels</SectionTitle>
      <div className="mt-2">
        <ResultRow result={pick("plt")} />
        <ResultRow result={pick("hb")} />
        <ResultRow result={pick("esr")} />
        <ResultRow result={pick("neu")} />
      </div>
      <TextLink href="/reports/latest/all">See all 16 results</TextLink>

      <SectionTitle>Rows without the bar</SectionTitle>
      <div className="mt-2">
        <ResultRow result={pick("rbc")} showBar={false} />
        <ResultRow result={pick("wbc")} showBar={false} />
        <ResultRow result={pick("mpv")} showBar={false} />
      </div>

      <SectionTitle>Tags</SectionTitle>
      <div className="mt-3 flex flex-wrap gap-2">
        <StatusTag status="low" />
        <StatusTag status="high" />
        <StatusTag status="normal" />
        <StatusTag status="urgent" />
      </div>

      <SectionTitle>Other banners</SectionTitle>
      <StatusBanner
        tone="urgent"
        title="Please see a doctor as soon as you can"
        text="One result is very far from normal levels. Do not wait for your next test."
      />
      <div className="mt-2">
        <ResultRow result={urgentResult} />
      </div>
      <StatusBanner
        tone="ok"
        title="All your results are within normal levels"
        text="Nothing on this report is outside normal levels."
        counts={{ normal: 16 }}
      />

      <Note>{disclaimer}</Note>
      <PrimaryButton href="/trends" className="mt-6">
        See how your results changed
      </PrimaryButton>
      <SecondaryButton href="/plan" className="mt-3">
        Add to my calendar
      </SecondaryButton>
      <TextLink href="/account" danger>
        Delete my account and all my reports
      </TextLink>
    </Screen>
  );
}
