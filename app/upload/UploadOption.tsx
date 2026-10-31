import Link from "next/link";

// One of the three big choices on the Upload screen.
// For now each one goes to the Reading screen. Real file picking comes later.
export default function UploadOption({
  icon,
  title,
  sub,
  primary = false,
}: {
  icon: string; // SVG path data
  title: string;
  sub: string;
  primary?: boolean;
}) {
  return (
    <Link
      href="/reading"
      className={`mt-3 flex min-h-20 items-center gap-4 rounded-md border-2 border-brand px-[1.125rem] py-3 ${
        primary ? "bg-brand text-white" : "bg-white text-brand"
      }`}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="flex-none"
      >
        <path d={icon} />
      </svg>
      <span>
        <span className="block text-[1.1875rem] font-bold">{title}</span>
        <span className={`mt-0.5 block text-[0.9375rem] ${primary ? "text-[#e3e1f8]" : "text-muted"}`}>
          {sub}
        </span>
      </span>
    </Link>
  );
}
