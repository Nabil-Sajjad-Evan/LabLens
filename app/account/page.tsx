// app/account/page.tsx
// Screen C13: Account (route: /account)
import Screen from "@/components/Screen";
import { PageTitle } from "@/components/Headings";
import SecondaryButton from "@/components/SecondaryButton";
import TextLink from "@/components/TextLink";
import BottomNav from "@/components/BottomNav";
import { user } from "@/lib/sample-data";

export default function AccountPage() {
  return (
    <Screen showAccount={true}>
      <PageTitle>Account</PageTitle>

      {/* Top divider */}
      <div className="mt-4 border-b-2 border-ink" />

      {/* User profile card */}
      <div className="flex items-center gap-5 border-b border-rule py-6">
        <div className="flex size-16 flex-none items-center justify-center rounded-full bg-tint text-xl font-bold text-brand">
          {user.initials}
        </div>
        <div>
          <h2 className="text-[1.25rem] font-bold text-ink">{user.name}</h2>
          <p className="mt-0.5 text-[1.0625rem] text-muted">{user.email}</p>
          <p className="mt-0.5 text-[1.0625rem] text-muted">Signed in with Google</p>
        </div>
      </div>

      {/* Your data section */}
      <section className="mt-6">
        <h2 className="font-serif text-[1.375rem] font-bold text-ink">Your data</h2>
        <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">
          Your reports are private to your account. You can delete them at any time.
        </p>
      </section>

      {/* Sign out and delete account actions */}
      <div className="mt-8">
        <SecondaryButton href="/">Sign out</SecondaryButton>
      </div>

      <div className="mt-2">
        <TextLink href="/" danger>
          Delete my account and all my reports
        </TextLink>
      </div>

      {/* Push nav to bottom */}
      <div className="min-h-12 flex-1" />

      {/* Bottom navigation with no tab active */}
      <div className="-mx-5 -mb-7 mt-auto">
        <BottomNav active={"" as any} />
      </div>
    </Screen>
  );
}
