"use client";

import dynamic from "next/dynamic";
import { Leaf, TrendingUp, Crown, Coffee } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { KpiCard } from "@/components/KpiCard";
import { FireModelCard } from "@/components/FireModelCard";
import { PortfolioSliders } from "@/components/PortfolioSliders";
import { ExpenseBreakdown } from "@/components/ExpenseBreakdown";
import { useFireResult, useFireStore } from "@/store/useFireStore";
import { useTranslation } from "@/lib/useTranslation";
import { formatCurrency, formatYears } from "@/utils/formatters";
import type { FireModel } from "@/utils/fireCalculations";

const ProjectionChart = dynamic(
  () => import("@/components/ProjectionChart"),
  { ssr: false }
);

const MODEL_ICONS: Record<FireModel, React.ReactNode> = {
  lean: <Leaf className="h-5 w-5" />,
  regular: <TrendingUp className="h-5 w-5" />,
  fat: <Crown className="h-5 w-5" />,
  barista: <Coffee className="h-5 w-5" />,
};

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

  const { yearsToFire, fireAge, fireNumber, chartData, status } = result;

  const models: FireModel[] = ["lean", "regular", "fat", "barista"];

  return (
    <div className="grid lg:grid-cols-[3fr_2fr] gap-8">
      {/* Left column */}
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-4">
          <KpiCard
            label={t.result.kpis.yearsToFire}
            value={formatYears(yearsToFire, locale)}
            trend={
              status === "already_fired"
                ? "up"
                : status === "negative_savings"
                ? "down"
                : "neutral"
            }
            highlight={status === "already_fired"}
          />
          <KpiCard
            label={t.result.kpis.fireAge}
            value={
              fireAge !== null
                ? `${fireAge} ${locale === "zh" ? "岁" : "yrs"}`
                : "—"
            }
            trend="neutral"
          />
          <KpiCard
            label={t.result.kpis.fireNumber}
            value={formatCurrency(fireNumber, locale, true)}
            trend="up"
            highlight
          />
        </div>

        {/* Key Financials inputs */}
        <div className="glass-card p-5">
          <h2 className="text-sm font-medium text-white/60 mb-4">
            {t.dashboard.inputs.title}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-white/50 mb-1">{t.dashboard.inputs.age}</p>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-white/10 rounded px-2 py-1 text-sm text-white outline-none focus:ring-1 focus:ring-white/30"
              />
            </div>
            <div>
              <p className="text-xs text-white/50 mb-1">{t.dashboard.inputs.income}</p>
              <div className="flex items-center bg-white/10 rounded px-2 py-1 gap-1">
                <span className="text-sm text-white/50">¥</span>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  className="w-full bg-transparent text-sm text-white outline-none"
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-white/50 mb-1">{t.dashboard.inputs.netWorth}</p>
              <div className="flex items-center bg-white/10 rounded px-2 py-1 gap-1">
                <span className="text-sm text-white/50">¥</span>
                <input
                  type="number"
                  value={netWorth}
                  onChange={(e) => setNetWorth(Number(e.target.value))}
                  className="w-full bg-transparent text-sm text-white outline-none"
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-white/50 mb-1">{t.dashboard.inputs.expenses}</p>
              <div className="flex items-center bg-white/10 rounded px-2 py-1 gap-1">
                <span className="text-sm text-white/50">¥</span>
                <input
                  type="number"
                  value={annualExpenses}
                  onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                  className="w-full bg-transparent text-sm text-white outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="glass-card p-6">
          <h2 className="text-sm font-medium text-white/60 mb-4">
            {t.result.chartTitle}
          </h2>
          <ProjectionChart
            chartData={chartData}
            crossoverYear={yearsToFire}
          />
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-4">
        <Accordion type="multiple" defaultValue={["model"]}>
          {/* FIRE Model selector */}
          <AccordionItem value="model" className="glass-card border-0 mb-4">
            <AccordionTrigger className="px-5 py-4 text-sm font-medium text-white hover:no-underline">
              {t.dashboard.fireModel.title}
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              <div className="grid grid-cols-2 gap-3">
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
                      icon={MODEL_ICONS[model]}
                      selected={fireModel === model}
                      onSelect={setFireModel}
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Portfolio & Assumptions */}
          <AccordionItem value="portfolio" className="glass-card border-0 mb-4">
            <AccordionTrigger className="px-5 py-4 text-sm font-medium text-white hover:no-underline">
              {t.dashboard.portfolio.title} & {t.dashboard.assumptions.title}
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              <PortfolioSliders />
            </AccordionContent>
          </AccordionItem>

          {/* Expense Breakdown */}
          <AccordionItem value="expenses" className="glass-card border-0">
            <AccordionTrigger className="px-5 py-4 text-sm font-medium text-white hover:no-underline">
              {t.dashboard.expenses.title}
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              <ExpenseBreakdown />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
