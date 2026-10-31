// C4 Photo not clear (route: /unreadable)
import Screen from "@/components/Screen";
import { SectionTitle } from "@/components/Headings";
import TipList from "@/components/TipList";
import Note from "@/components/Note";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import TextLink from "@/components/TextLink";

export default function UnreadablePage() {
  return (
    <Screen active="Upload">
      <div className="mt-7 flex size-[3.25rem] items-center justify-center rounded-full bg-warn-bg text-warn">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3l10 18H2zM12 10v5M12 18h.01" />
        </svg>
      </div>
      <h1 className="mt-[1.125rem] font-serif text-[1.9375rem] font-semibold leading-tight tracking-tight">
        We could not read this photo clearly
      </h1>
      <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted">
        The photo is blurry, so some numbers could be wrong. Please try again with a clearer photo.
      </p>

      <SectionTitle>What helps</SectionTitle>
      <TipList
        items={[
          "Hold your phone steady and tap the screen to focus.",
          "Use good light, and keep shadows off the page.",
          "Fit the whole page in the photo.",
        ]}
      />

      <Note className="mt-[1.375rem]">
        LabLens would rather ask again than guess. A wrong number could change what your results
        mean.
      </Note>

      <div className="min-h-3 flex-1" />
      <PrimaryButton href="/upload" className="mt-[1.375rem]">
        Take a new photo
      </PrimaryButton>
      <SecondaryButton href="/upload" className="mt-3">
        Choose a different file
      </SecondaryButton>
      <TextLink href="/check" className="mt-1">
        Enter the values by hand
      </TextLink>
    </Screen>
  );
}
