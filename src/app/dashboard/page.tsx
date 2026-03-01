"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { KpiCard } from "@/components/KpiCard";
import { FireModelCard } from "@/components/FireModelCard";
import { PortfolioSliders } from "@/components/PortfolioSliders";
import { useFireResult, useFireStore } from "@/store/useFireStore";
import { useTranslation } from "@/lib/useTranslation";
import { formatCurrency } from "@/utils/formatters";
import { track } from "@/lib/analytics";
import type { FireModel } from "@/utils/fireCalculations";

const ProjectionChart = dynamic(
  () => import("@/components/ProjectionChart"),
  { ssr: false }
);

export default function DashboardPage() {
  const { t, locale } = useTranslation();
  const result = useFireResult();
  const fireModel = useFireStore((s) => s.fireModel);
  const setFireModel = useFireStore((s) => s.setFireModel);
  const age = useFireStore((s) => s.age);
  const setAge = useFireStore((s) => s.setAge);
  const annualIncome = useFireStore((s) => s.annualIncome);
  const setAnnualIncome = useFireStore((s) => s.setAnnualIncome);
  const netWorth = useFireStore((s) => s.netWorth);
  const setNetWorth = useFireStore((s) => s.setNetWorth);
  const annualExpenses = useFireStore((s) => s.annualExpenses);
  const setAnnualExpenses = useFireStore((s) => s.setAnnualExpenses);
  const assumptions = useFireStore((s) => s.assumptions);
  const setAssumptions = useFireStore((s) => s.setAssumptions);

  const { yearsToFire, fireAge, fireNumber, chartData } = result;

  useEffect(() => {
    track("dashboard_view", { fireModel });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const models: FireModel[] = ["lean", "regular", "fat", "barista"];

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
      {/* ── Left column (main visual) ── */}
      <div className="space-y-6">
        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-4">
          <KpiCard
            label={locale === "zh" ? "自由年龄" : "FIRE AGE"}
            value={fireAge !== null ? `${fireAge}${locale === "zh" ? "岁" : " yrs"}` : "—"}
            color="#4ade80"
          />
          <KpiCard
            label={locale === "zh" ? "目标金额" : "FIRE NUMBER"}
            value={formatCurrency(fireNumber, locale, true)}
            color="#38bdf8"
          />
          <KpiCard
            label={locale === "zh" ? "当前进度" : "PROGRESS"}
            value={
              fireNumber > 0
                ? `${Math.min(100, Math.round((netWorth / fireNumber) * 100))}%`
                : "—"
            }
            color="#a78bfa"
          />
        </div>

        {/* Real-time chart */}
        <div className="glass-card p-4 sm:p-7" style={{ borderRadius: "18px" }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-caption font-semibold uppercase text-[#555] tracking-[2px]">
              {locale === "zh" ? "资产增长预测" : "WEALTH PROJECTION"}
            </span>
            <span className="text-[11px] text-accent">
              {yearsToFire !== null
                ? `${yearsToFire} ${locale === "zh" ? "年" : "yrs"}`
                : ""}
            </span>
          </div>
          <ProjectionChart chartData={chartData} crossoverYear={yearsToFire} />
        </div>

        {/* PRO upsell */}
        <a
          href="/dashboard/analysis"
          onClick={() => track("pro_paywall_view", { source: "dashboard_card", price: 9.9 })}
          className="block rounded-[14px] p-5 transition-all hover:-translate-y-1"
          style={{
            background: "linear-gradient(135deg, rgba(251,191,36,0.04), rgba(74,222,128,0.04))",
            border: "1px solid rgba(251,191,36,0.1)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-cn text-[15px] font-semibold text-white">
                  {locale === "zh" ? "深度财务分析" : "Deep Financial Analysis"}
                </span>
                <span className="inline-flex items-center rounded-full bg-[rgba(251,191,36,0.15)] px-1.5 py-px text-[8px] font-bold tracking-[0.5px] text-[#fbbf24] uppercase">
                  PRO
                </span>
              </div>
              <p className="text-[12px] text-[#666]">
                {locale === "zh"
                  ? "AI 评级 · 风险预警 · 行动建议"
                  : "AI grading · Risk alerts · Action steps"}
              </p>
            </div>
            <span className="text-[14px] text-[#555]">→</span>
          </div>
        </a>
      </div>

      {/* ── Right column (control panel) ── */}
      <div
        className="glass-card p-6 lg:sticky lg:top-[88px]"
        style={{ borderRadius: "18px" }}
      >
        <p className="text-caption font-semibold uppercase text-[#555] tracking-[2px] mb-5">
          CONTROL PANEL
        </p>

        <Accordion type="single" collapsible defaultValue="model">
          {/* FIRE Model */}
          <AccordionItem value="model" className="border-[rgba(255,255,255,0.04)]">
            <AccordionTrigger className="text-white">
              {t.dashboard.fireModel.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2">
                {models.map((model) => {
                  const modelInfo = t.landing.models[model] as {
                    title: string;
                    desc: string;
                    multiplier: string;
                  };
                  return (
                    <FireModelCard
                      key={model}
                      model={model}
                      title={modelInfo.title}
                      description={modelInfo.desc}
                      multiplier={modelInfo.multiplier}
                      selected={fireModel === model}
                      onSelect={(m) => {
                        setFireModel(m);
                        track("dashboard_model_change", { model: m });
                      }}
                      variant="grid"
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Portfolio / Assumptions */}
          <AccordionItem value="portfolio" className="border-[rgba(255,255,255,0.04)]">
            <AccordionTrigger className="text-white">
              {t.dashboard.portfolio.title}
            </AccordionTrigger>
            <AccordionContent>
              <PortfolioSliders />
            </AccordionContent>
          </AccordionItem>

          {/* Assumptions */}
          <AccordionItem value="assumptions" className="border-[rgba(255,255,255,0.04)]">
            <AccordionTrigger className="text-white">
              {t.dashboard.assumptions.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-5">
                <SliderRow
                  label={t.dashboard.assumptions.nominalReturn}
                  value={assumptions.nominalReturn}
                  min={0.02}
                  max={0.15}
                  step={0.01}
                  format={(v) => `${(v * 100).toFixed(0)}%`}
                  onChange={(v) => setAssumptions({ nominalReturn: v })}
                />
                <SliderRow
                  label={t.dashboard.assumptions.inflationRate}
                  value={assumptions.inflationRate}
                  min={0}
                  max={0.1}
                  step={0.01}
                  format={(v) => `${(v * 100).toFixed(0)}%`}
                  onChange={(v) => setAssumptions({ inflationRate: v })}
                />
                <SliderRow
                  label={t.dashboard.assumptions.swr}
                  value={assumptions.swr}
                  min={0.02}
                  max={0.06}
                  step={0.005}
                  format={(v) => `${(v * 100).toFixed(1)}%`}
                  onChange={(v) => setAssumptions({ swr: v })}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Base data */}
          <AccordionItem value="base" className="border-[rgba(255,255,255,0.04)]">
            <AccordionTrigger className="text-white">
              {t.dashboard.inputs.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-5">
                <SliderRow
                  label={t.dashboard.inputs.age}
                  value={age}
                  min={18}
                  max={65}
                  step={1}
                  format={(v) => `${v}`}
                  onChange={setAge}
                />
                <SliderRow
                  label={t.dashboard.inputs.netWorth}
                  value={netWorth}
                  min={0}
                  max={10000000}
                  step={50000}
                  format={(v) => `¥${v >= 10000 ? `${(v / 10000).toFixed(0)}万` : v}`}
                  onChange={setNetWorth}
                />
                <SliderRow
                  label={t.dashboard.inputs.income}
                  value={annualIncome}
                  min={50000}
                  max={2000000}
                  step={10000}
                  format={(v) => `¥${v >= 10000 ? `${(v / 10000).toFixed(0)}万` : v}`}
                  onChange={setAnnualIncome}
                />
                <SliderRow
                  label={t.dashboard.inputs.expenses}
                  value={annualExpenses}
                  min={30000}
                  max={600000}
                  step={6000}
                  format={(v) => `¥${v >= 10000 ? `${(v / 10000).toFixed(0)}万` : v}`}
                  onChange={setAnnualExpenses}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-[12px] mb-2">
        <span className="text-[#888]">{label}</span>
        <span className="text-white font-semibold">{format(value)}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  );
}
