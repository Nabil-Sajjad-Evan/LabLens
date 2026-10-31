import type { Status } from "@/lib/sample-data";
import { STATUS_STYLES } from "./status";

// A bar with the normal zone in green and a round marker for the result.
// `position` is 0 to 100. Use markerPosition(result) from lib/sample-data.ts.
export default function RangeBar({
  status,
  position,
}: {
  status: Status;
  position: number;
}) {
  const s = STATUS_STYLES[status];
  return (
    <div
      role="img"
      aria-label={`${s.label}, shown against the normal levels`}
      className="relative mt-3.5 h-6"
    >
      <div className="absolute inset-x-0 top-[0.5625rem] h-1.5 rounded-sm bg-rule" />
      <div className="absolute left-1/4 top-[0.3125rem] h-3.5 w-1/2 rounded-sm bg-zone" />
      <div
        className={`absolute top-[0.1875rem] -ml-[0.5625rem] size-[1.125rem] rounded-full border-[3px] border-white ring-[1.5px] ${s.marker}`}
        style={{ left: `${position}%` }}
      />
    </div>
  );
}
