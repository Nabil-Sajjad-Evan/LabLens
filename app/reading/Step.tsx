// One line of the progress list on the Reading screen.
// state: "done" (green tick), "active" (spinning circle) or "todo" (empty circle).
export default function Step({
  state,
  children,
}: {
  state: "done" | "active" | "todo";
  children: string;
}) {
  return (
    <li className="flex min-h-[3.875rem] items-center gap-4 border-b border-rule">
      {state === "done" && (
        <span className="flex size-[1.875rem] flex-none items-center justify-center rounded-full bg-ok text-white">
          <svg
            width="16"
            height="16"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 6.5L5 9.5L10 3" />
          </svg>
        </span>
      )}
      {state === "active" && (
        <span className="size-[1.875rem] flex-none animate-spin rounded-full border-[3.5px] border-rule border-t-brand motion-reduce:animate-none" />
      )}
      {state === "todo" && (
        <span className="size-[1.875rem] flex-none rounded-full border-2 border-rule" />
      )}
      <span
        className={`text-lg ${state === "active" ? "font-bold" : ""} ${state === "todo" ? "text-muted" : ""}`}
      >
        {children}
      </span>
    </li>
  );
}
