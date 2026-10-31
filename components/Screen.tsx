import type { ReactNode } from "react";
import AppHeader from "./AppHeader";
import BottomNav, { type NavTab } from "./BottomNav";

// Wraps every screen: header on top, content in the middle, tabs at the bottom.
// On a wide screen the page stays in a phone-width column in the centre.
//
//   <Screen active="Trends" showAccount> ...your screen... </Screen>
//
// Leave out `active` for screens without tabs (sign in, reading).
export default function Screen({
  active,
  showAccount = false,
  children,
}: {
  active?: NavTab;
  showAccount?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[26.875rem] flex-col bg-white sm:border-x sm:border-rule">
      <AppHeader showAccount={showAccount} />
      <main className="flex-1 px-5 pb-6">{children}</main>
      {active && <BottomNav active={active} />}
    </div>
  );
}
