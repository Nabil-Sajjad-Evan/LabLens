import { getStatus, markerPosition, type LabResult } from "@/lib/sample-data";
import { formatRange, formatValue } from "@/lib/format";
import { STATUS_STYLES } from "./status";
import StatusTag from "./StatusTag";
import RangeBar from "./RangeBar";

// One lab result: name, value, status tag, normal levels and (optionally) the range bar.
// Put several inside a <div> and they are separated by thin lines.
// showBar={false} gives the shorter row used on the "All results" screen.
export default function ResultRow({
  result,
  showBar = true,
}: {
  result: LabResult;
  showBar?: boolean;
}) {
  const status = getStatus(result);

  // No value on the report (for example MPV)
  if (status === null || result.value === null) {
    return (
      <div className="border-b border-rule py-4 last:border-b-0">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-lg font-bold">{result.name}</span>
          <span className="font-serif text-[0.9375rem] text-muted">
            Normal: {formatRange(result)} {result.unit}
          </span>
        </div>
        <p className="mt-2 text-[0.9375rem] text-warn">No value on your report.</p>
      </div>
    );
  }

  const s = STATUS_STYLES[status];
  return (
    <div
      className={`border-b border-rule last:border-b-0 ${showBar ? "py-[1.125rem]" : "py-[0.9375rem]"}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-lg font-bold">{result.name}</span>
        <span className="whitespace-nowrap">
          <span
            className={`font-serif font-bold ${s.text} ${showBar ? "text-[1.5625rem]" : "text-[1.4375rem]"}`}
          >
            {formatValue(result.value)}
          </span>{" "}
          <span className="text-[0.9375rem] text-muted">{result.unit}</span>
        </span>
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-3">
        <StatusTag status={status} />
        <span className="font-serif text-[0.9375rem] text-muted">
          Normal: {formatRange(result)}
        </span>
      </div>
      {showBar && <RangeBar status={status} position={markerPosition(result)} />}
    </div>
  );
}
