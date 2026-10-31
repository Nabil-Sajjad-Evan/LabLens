import Link from "next/link";

export type NavTab = "Reports" | "Upload" | "Trends" | "Plan";

const TABS: { name: NavTab; href: string; icon: string }[] = [
  { name: "Reports", href: "/reports", icon: "M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" },
  { name: "Upload", href: "/upload", icon: "M12 16V4M7 9l5-5 5 5M4 20h16" },
  { name: "Trends", href: "/trends", icon: "M3 17l6-6 4 4 7-8M15 7h5v5" },
  {
    name: "Plan",
    href: "/plan",
    icon: "M9 6h11M9 12h11M9 18h11M3.5 6l1.5 1.5L7 5M3.5 12l1.5 1.5L7 11M3.5 18l1.5 1.5L7 17",
  },
];

// The four tabs at the bottom. Pass the tab that is open: <BottomNav active="Trends" />
export default function BottomNav({ active }: { active: NavTab }) {
  return (
    <nav aria-label="Main" className="sticky bottom-0 flex border-t border-rule bg-white">
      {TABS.map((tab) => {
        const on = tab.name === active;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            aria-current={on ? "page" : undefined}
            className={`-mt-px flex h-[4.5rem] flex-1 flex-col items-center justify-center gap-1 border-t-[3px] text-sm ${
              on ? "border-brand font-bold text-brand" : "border-transparent text-muted"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={tab.icon} />
            </svg>
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
}
