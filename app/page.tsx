// C1 Sign in (route: /)
import Screen from "@/components/Screen";
import ResultRow from "@/components/ResultRow";
import PrimaryButton from "@/components/PrimaryButton";
import TextLink from "@/components/TextLink";
import { results } from "@/lib/sample-data";

const sample = results.find((r) => r.id === "hb")!;

export default function SignInPage() {
  return (
    <Screen>
      <h1 className="mt-10 font-serif text-[2.3125rem] font-semibold leading-[1.15] tracking-tight">
        Understand your lab report in plain words
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Upload a photo or PDF of your report. See which results are low or high, and what to ask
        your doctor.
      </p>

      <div className="-mx-5 mt-8 bg-tint px-5 pb-2 pt-1">
        <ResultRow result={sample} />
      </div>
      <p className="mt-2 text-[0.9375rem] text-muted">An example result from a sample report.</p>

      <div className="min-h-6 flex-1" />

      {/* For now this goes straight to the Upload screen. Real Google sign-in comes later. */}
      <PrimaryButton href="/upload">Continue with Google</PrimaryButton>
      <TextLink href="/check" className="mt-1.5">
        Try a sample report
      </TextLink>
      <p className="mt-1 text-sm leading-normal text-muted">
        LabLens explains results in plain language. It does not diagnose. Please talk to your doctor
        about your results.
      </p>
    </Screen>
  );
}
