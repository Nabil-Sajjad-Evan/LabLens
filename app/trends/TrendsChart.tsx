// app/trends/TrendsChart.tsx
"use client";

import { useEffect, useState } from "react";
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
      y={y + 22}
      textAnchor="middle"
      className="font-serif font-bold text-ink text-[1.0625rem]"
      fill="#1f1d36"
    >
      {value.toFixed(1)}
    </text>
  );
}

export default function TrendsChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-48 w-full animate-pulse rounded bg-tint flex items-center justify-center text-muted">
        Loading chart...
      </div>
    );
  }

  const chartData = hbTrend.map((item) => ({
    month: item.month,
    value: item.value,
  }));

  return (
    <div className="relative mt-4 h-48 w-full select-none">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 12, right: 10, left: -22, bottom: 20 }}
        >
          {/* Normal range green zone */}
          <ReferenceArea
            y1={hbNormal.low}
            y2={hbNormal.high}
            fill="#BFE0CF"
            fillOpacity={0.7}
          >
            <Label
              value={`Normal ${hbNormal.low} – ${hbNormal.high}`}
              position="insideRight"
              fill="#1F6B4F"
              className="text-[0.875rem] font-bold"
              style={{ fontWeight: 700 }}
              offset={10}
            />
          </ReferenceArea>

          {/* Subtle grid lines for scale */}
          <CartesianGrid
            vertical={false}
            stroke="#DAD8E6"
            strokeDasharray="0"
          />

          <YAxis
            domain={[8, 17]}
            ticks={[8, 10, 12, 14, 16]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#55526B", fontSize: 13 }}
          />

          <XAxis
            dataKey="month"
            axisLine={{ stroke: "#1F1D36", strokeWidth: 1.5 }}
            tickLine={false}
            tick={{ fill: "#55526B", fontSize: 14 }}
            dy={8}
          />

          <Line
            type="linear"
            dataKey="value"
            stroke="#3A3485"
            strokeWidth={3}
            dot={{ r: 5, fill: "#3A3485", stroke: "#3A3485" }}
            label={<CustomizedLabel />}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
