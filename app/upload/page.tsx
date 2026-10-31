// C2 Upload (route: /upload)
import Screen from "@/components/Screen";
import { PageTitle, SectionTitle } from "@/components/Headings";
import TipList from "@/components/TipList";
import Note from "@/components/Note";
import TextLink from "@/components/TextLink";
import UploadOption from "./UploadOption";

const CAMERA = "M4 8h3l2-3h6l2 3h3v11H4zM12 9.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z";
const PHOTO = "M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM21 16l-5-5-8 9";
const PDF = "M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h6";

export default function UploadPage() {
  return (
    <Screen active="Upload">
      <PageTitle>Add your report</PageTitle>
      <p className="mt-2.5 text-[1.0625rem] leading-relaxed text-muted">
        Take a photo of your lab report, or choose a photo or PDF you already have.
      </p>

      <div className="mt-2.5">
        <UploadOption icon={CAMERA} title="Take a photo" sub="Use your phone camera" primary />
        <UploadOption icon={PHOTO} title="Choose a photo" sub="From your phone gallery" />
        <UploadOption icon={PDF} title="Choose a PDF" sub="From your phone or computer" />
      </div>

      <SectionTitle>For a clear photo</SectionTitle>
      <TipList
        items={[
          "Lay the report flat, in good light.",
          "Fit the whole page in the photo, including the normal levels printed beside each result.",
          "Photograph one page at a time.",
        ]}
      />

      <Note className="mt-[1.375rem]">
        You will check every value before anything is saved. Please upload only your own reports.
      </Note>
      <TextLink href="/check" className="mt-2">
        Try a sample report
      </TextLink>
    </Screen>
  );
}
