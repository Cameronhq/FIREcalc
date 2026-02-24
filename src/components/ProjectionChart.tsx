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
      <p className="text-white/70 mb-2">
        {locale === "zh" ? `第 ${label} 年 (${age} 岁)` : `Year ${label} (Age ${age})`}
      </p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="mb-1">
          {entry.name === "netWorth"
            ? locale === "zh"
              ? "净资产"
              : "Net Worth"
            : locale === "zh"
            ? "FIRE目标"
            : "FIRE Target"}
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
      <div className="flex h-64 items-center justify-center text-white/40">
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
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="year"
          tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
          axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          tickLine={false}
          label={{
            value: locale === "zh" ? "年" : "Years",
            position: "insideRight",
            offset: -5,
            fill: "rgba(255,255,255,0.3)",
            fontSize: 11,
          }}
        />
        <YAxis
          tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => formatYAxisTick(v, locale)}
          width={55}
        />
        <Tooltip
          content={
            <CustomTooltip locale={locale} />
          }
        />
        {/* Net worth area */}
        <Area
          type="monotone"
          dataKey="netWorth"
          name="netWorth"
          stroke="#10b981"
          strokeWidth={2.5}
          fill="url(#netWorthGradient)"
          dot={false}
          activeDot={{ r: 4, fill: "#10b981" }}
        />
        {/* FIRE target dashed line */}
        <Area
          type="monotone"
          dataKey="fireTarget"
          name="fireTarget"
          stroke="#ef4444"
          strokeWidth={1.5}
          strokeDasharray="5 4"
          fill="none"
          dot={false}
          activeDot={{ r: 3, fill: "#ef4444" }}
        />
        {/* Crossover reference line */}
        {crossoverYear !== null && crossoverYear !== undefined && crossoverYear > 0 && (
          <ReferenceLine
            x={crossoverYear}
            stroke="#f59e0b"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            label={{
              value: locale === "zh" ? "FIRE!" : "FIRE!",
              position: "top",
              fill: "#f59e0b",
              fontSize: 11,
              fontWeight: 600,
            }}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
