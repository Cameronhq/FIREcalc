"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { ChartDataPoint } from "@/utils/fireCalculations";
import { useFireStore } from "@/store/useFireStore";
import { formatCurrency } from "@/utils/formatters";

interface ProjectionChartProps {
  chartData: ChartDataPoint[];
  crossoverYear?: number | null;
}

interface TooltipPayloadEntry {
  value: number;
  name: string;
  color: string;
  payload: { age: number; year: number; netWorth: number; fireTarget: number };
}

function CustomTooltip({
  active,
  payload,
  label,
  locale,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: number;
  locale: "zh" | "en";
}) {
  if (!active || !payload || payload.length === 0) return null;

  const age = payload[0]?.payload?.age;

  return (
    <div className="glass-card p-3 text-xs shadow-xl">
      <p className="text-[#888] mb-2">
        {locale === "zh" ? `第 ${label} 年 (${age} 岁)` : `Year ${label} (Age ${age})`}
      </p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="mb-1">
          {entry.name === "netWorth"
            ? locale === "zh" ? "净资产" : "Net Worth"
            : locale === "zh" ? "FIRE目标" : "FIRE Target"}
          :{" "}
          {formatCurrency(entry.value, locale, true)}
        </p>
      ))}
    </div>
  );
}

function formatYAxisTick(value: number, locale: "zh" | "en"): string {
  if (locale === "zh") {
    if (value >= 1e8) return `${(value / 1e8).toFixed(1)}亿`;
    if (value >= 1e4) return `${(value / 1e4).toFixed(0)}万`;
    return `${value}`;
  }
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(0)}K`;
  return `${value}`;
}

export default function ProjectionChart({
  chartData,
  crossoverYear,
}: ProjectionChartProps) {
  const locale = useFireStore((s) => s.locale);

  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-[#444]">
        {locale === "zh" ? "暂无数据" : "No data available"}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart
        data={chartData}
        margin={{ top: 30, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4ade80" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
          </linearGradient>
          <filter id="chart-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid
          strokeDasharray="0"
          stroke="rgba(255,255,255,0.03)"
          vertical={false}
        />
        <XAxis
          dataKey="year"
          tick={{ fill: "#333", fontSize: 9, fontFamily: "var(--font-sora)" }}
          axisLine={{ stroke: "rgba(255,255,255,0.03)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#333", fontSize: 9, fontFamily: "var(--font-sora)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => formatYAxisTick(v, locale)}
          width={55}
        />
        <Tooltip content={<CustomTooltip locale={locale} />} />
        <Area
          type="monotone"
          dataKey="netWorth"
          name="netWorth"
          stroke="#4ade80"
          strokeWidth={2}
          fill="url(#netWorthGradient)"
          dot={false}
          activeDot={{ r: 5, fill: "#4ade80", filter: "url(#chart-glow)" }}
        />
        <Area
          type="monotone"
          dataKey="fireTarget"
          name="fireTarget"
          stroke="#f87171"
          strokeWidth={1}
          strokeDasharray="5 4"
          strokeOpacity={0.5}
          fill="none"
          dot={false}
          activeDot={{ r: 3, fill: "#f87171" }}
        />
        {crossoverYear !== null && crossoverYear !== undefined && crossoverYear > 0 && (
          <ReferenceLine
            x={crossoverYear}
            stroke="#4ade80"
            strokeWidth={1}
            strokeDasharray="4 3"
            strokeOpacity={0.4}
            label={{
              value: "FREEDOM",
              position: "top",
              fill: "#4ade80",
              fontSize: 9,
              fontWeight: 600,
            }}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
