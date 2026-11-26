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
import type { TestTrendData } from "@/lib/sample-data";

interface CustomizedLabelProps {
  x?: number;
  y?: number;
  value?: number;
  isLargeNumber?: boolean;
}

function CustomizedLabel({
  x = 0,
  y = 0,
  value,
  isLargeNumber = false,
}: CustomizedLabelProps) {
  if (value === undefined) return null;
  const labelText = isLargeNumber
    ? `${Math.round(value / 1000)}k`
    : Number.isInteger(value)
    ? `${value}`
    : value.toFixed(1);

  return (
    <text
      x={x}
      y={y - 12}
      textAnchor="middle"
      className="font-serif font-bold text-ink text-[1.0625rem]"
      fill="var(--color-ink)"
    >
      {labelText}
    </text>
  );
}

const emptySubscribe = () => () => {};

export default function TrendsChart({ test }: { test: TestTrendData }) {
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

  const chartData = test.readings.map((item) => ({
    month: item.month,
    value: item.value,
  }));

  const isLarge = test.normal.high >= 1000;
  const normalLowText =
    test.normal.low >= 1000
      ? `${test.normal.low / 1000}k`
      : `${test.normal.low}`;
  const normalHighText =
    test.normal.high >= 1000
      ? `${test.normal.high / 1000}k`
      : `${test.normal.high}`;

  return (
    <div className="relative mt-4 h-[16.25rem] w-full select-none">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 20, left: isLarge ? -8 : -20, bottom: 20 }}
        >
          {/* Normal range green zone */}
          <ReferenceArea
            y1={test.normal.low}
            y2={test.normal.high}
            fill="var(--color-zone)"
            fillOpacity={0.7}
          >
            <Label
              value={`Normal ${normalLowText} – ${normalHighText}`}
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
            domain={test.yDomain}
            ticks={test.yTicks}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => (v >= 1000 ? `${v / 1000}k` : `${v}`)}
            tick={{ fill: "var(--color-muted)", fontSize: 13 }}
          />

          <XAxis
            dataKey="month"
            padding={{ left: 20, right: 20 }}
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
            label={<CustomizedLabel isLargeNumber={isLarge} />}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
