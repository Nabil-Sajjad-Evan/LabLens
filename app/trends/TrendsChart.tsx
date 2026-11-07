// app/trends/TrendsChart.tsx
"use client";

import { useSyncExternalStore } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceArea,
  CartesianGrid,
  Label,
} from "recharts";
import { hbTrend, hbNormal } from "@/lib/sample-data";

interface CustomizedLabelProps {
  x?: number;
  y?: number;
  value?: number;
}

function CustomizedLabel({ x = 0, y = 0, value }: CustomizedLabelProps) {
  if (value === undefined) return null;
  return (
    <text
      x={x}
      y={y + 24}
      textAnchor="middle"
      className="font-serif font-bold text-ink text-[1.0625rem]"
      fill="var(--color-ink)"
    >
      {value.toFixed(1)}
    </text>
  );
}

const emptySubscribe = () => () => {};

export default function TrendsChart() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient) {
    return (
      <div className="h-[16.25rem] w-full animate-pulse rounded bg-tint flex items-center justify-center text-muted">
        Loading chart...
      </div>
    );
  }

  const chartData = hbTrend.map((item) => ({
    month: item.month,
    value: item.value,
  }));

  return (
    <div className="relative mt-4 h-[16.25rem] w-full select-none">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 16, right: 28, left: -22, bottom: 20 }}
        >
          {/* Normal range green zone */}
          <ReferenceArea
            y1={hbNormal.low}
            y2={hbNormal.high}
            fill="var(--color-zone)"
            fillOpacity={0.7}
          >
            <Label
              value={`Normal ${hbNormal.low} – ${hbNormal.high}`}
              position="insideRight"
              fill="var(--color-ok)"
              className="text-[0.875rem] font-bold"
              style={{ fontWeight: 700 }}
              offset={10}
            />
          </ReferenceArea>

          {/* Subtle grid lines for scale */}
          <CartesianGrid
            vertical={false}
            stroke="var(--color-rule)"
            strokeDasharray="0"
          />

          <YAxis
            domain={[7, 18]}
            ticks={[8, 10, 12, 14, 16]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-muted)", fontSize: 13 }}
          />

          <XAxis
            dataKey="month"
            axisLine={{ stroke: "var(--color-ink)", strokeWidth: 1.5 }}
            tickLine={false}
            tick={{ fill: "var(--color-muted)", fontSize: 14 }}
            dy={8}
          />

          <Line
            type="linear"
            dataKey="value"
            stroke="var(--color-brand)"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "var(--color-brand)",
              stroke: "var(--color-brand)",
            }}
            label={<CustomizedLabel />}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
