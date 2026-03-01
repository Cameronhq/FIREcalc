"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useFireStore } from "@/store/useFireStore";
import { useTranslation } from "@/lib/useTranslation";
import { FireModelCard } from "./FireModelCard";
import { track } from "@/lib/analytics";
import type { FireModel } from "@/utils/fireCalculations";

const TOTAL_STEPS = 4;

const QUICK_NET_WORTH = [100000, 300000, 500000, 1000000, 2000000, 5000000];
const QUICK_EXPENSES = [60000, 120000, 180000, 240000, 360000];
const QUICK_INCOME = [150000, 300000, 500000, 800000, 1200000];

function formatNum(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(n % 10000 === 0 ? 0 : 1)}万`;
  return n.toLocaleString();
}

function QuickTag({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-[13px] font-sans border transition-all duration-200 ${
        active
          ? "border-accent bg-[rgba(74,222,128,0.08)] text-accent"
          : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-[#888] hover:border-[rgba(255,255,255,0.12)]"
      }`}
    >
      {label}
    </button>
  );
}

export function StepWizard() {
  const router = useRouter();
  const { t, locale } = useTranslation();

  const age = useFireStore((s) => s.age);
  const netWorth = useFireStore((s) => s.netWorth);
  const annualExpenses = useFireStore((s) => s.annualExpenses);
  const annualIncome = useFireStore((s) => s.annualIncome);
  const fireModel = useFireStore((s) => s.fireModel);
  const onboardingStep = useFireStore((s) => s.onboardingStep);

  const setAge = useFireStore((s) => s.setAge);
  const setNetWorth = useFireStore((s) => s.setNetWorth);
  const setAnnualExpenses = useFireStore((s) => s.setAnnualExpenses);
  const setAnnualIncome = useFireStore((s) => s.setAnnualIncome);
  const setFireModel = useFireStore((s) => s.setFireModel);
  const setOnboardingStep = useFireStore((s) => s.setOnboardingStep);

  const [direction, setDirection] = useState(1);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  const loadingMessages = t.onboarding.loading;

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingIndex((i) => Math.min(i + 1, loadingMessages.length - 1));
    }, 500);

    const progressInterval = setInterval(() => {
      setProgressWidth((w) => Math.min(w + 4, 100));
    }, 100);

    const timeout = setTimeout(() => router.push("/result"), 2500);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [isLoading, router, loadingMessages.length]);

  const handleNext = () => {
    if (onboardingStep < TOTAL_STEPS - 1) {
      setDirection(1);
      const nextStep = onboardingStep + 1;
      setOnboardingStep(nextStep);
      track("onboarding_step", { step: nextStep });
    } else {
      setDirection(1);
      setOnboardingStep(4);
      setIsLoading(true);
      track("onboarding_complete", {
        age,
        netWorth,
        annualExpenses,
        annualIncome,
        fireModel,
      });
    }
  };

  const handleBack = () => {
    if (onboardingStep > 0) {
      setDirection(-1);
      setOnboardingStep(onboardingStep - 1);
    }
  };

  const savingsRate = annualIncome > 0 ? ((annualIncome - annualExpenses) / annualIncome * 100) : 0;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] gap-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 rounded-full border-2 border-[rgba(255,255,255,0.06)] border-t-accent"
        />
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[#999] text-body text-center"
          >
            {loadingMessages[loadingIndex]}
          </motion.p>
        </AnimatePresence>
        <div className="w-48 h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            animate={{ width: `${progressWidth}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[680px] px-4 sm:px-page-px min-h-[75vh] flex flex-col">
      {/* Progress bar (4 segments) */}
      <div className="flex gap-1.5 mb-10 sm:mb-16">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-[2px] rounded-full transition-all duration-500"
            style={{
              background: i <= onboardingStep ? "#4ade80" : "rgba(255,255,255,0.06)",
            }}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={onboardingStep}
            custom={direction}
            initial={{ opacity: 0, y: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -30 : 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Step 0: Age */}
            {onboardingStep === 0 && (
              <div className="text-center">
                <p className="text-caption font-semibold uppercase text-[#666] tracking-[3px] mb-3">
                  {locale === "zh" ? "第一步 · 年龄" : "STEP 01 · AGE"}
                </p>
                <h2 className="font-cn text-[24px] font-light text-white mb-2">
                  {locale === "zh" ? "你的年龄" : "Your Age"}
                </h2>
                <p className="text-body-sm text-[#666] mb-12">
                  {t.onboarding.steps[0].subtitle}
                </p>

                <motion.p
                  key={age}
                  className="text-[64px] sm:text-[96px] font-extrabold font-sans text-white leading-none mb-8"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {age}
                </motion.p>

                <div className="max-w-sm mx-auto">
                  <Slider
                    value={[age]}
                    min={18}
                    max={65}
                    step={1}
                    onValueChange={([v]) => setAge(v)}
                  />
                  <div className="flex justify-between mt-2 text-micro text-[#444]">
                    <span>18</span>
                    <span>65</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Net Worth */}
            {onboardingStep === 1 && (
              <div className="text-center">
                <p className="text-caption font-semibold uppercase text-[#666] tracking-[3px] mb-3">
                  {locale === "zh" ? "第二步 · 净资产" : "STEP 02 · NET WORTH"}
                </p>
                <h2 className="font-cn text-[24px] font-light text-white mb-2">
                  {locale === "zh" ? "你目前的净资产" : "Your Net Worth"}
                </h2>
                <p className="text-body-sm text-[#666] mb-10">
                  {t.onboarding.steps[2].subtitle}
                </p>

                <motion.p
                  key={netWorth}
                  className="text-[36px] sm:text-[56px] font-extrabold font-sans text-white leading-none mb-6"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  ¥{formatNum(netWorth)}
                </motion.p>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {QUICK_NET_WORTH.map((v) => (
                    <QuickTag
                      key={v}
                      label={`¥${formatNum(v)}`}
                      active={netWorth === v}
                      onClick={() => setNetWorth(v)}
                    />
                  ))}
                </div>

                <div className="max-w-md mx-auto">
                  <Slider
                    value={[netWorth]}
                    min={0}
                    max={10000000}
                    step={50000}
                    onValueChange={([v]) => setNetWorth(v)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Annual Expenses + Income */}
            {onboardingStep === 2 && (
              <div className="text-center">
                <p className="text-caption font-semibold uppercase text-[#666] tracking-[3px] mb-3">
                  {locale === "zh" ? "第三步 · 收支" : "STEP 03 · CASHFLOW"}
                </p>
                <h2 className="font-cn text-[24px] font-light text-white mb-2">
                  {locale === "zh" ? "年支出" : "Annual Expenses"}
                </h2>

                <motion.p
                  key={annualExpenses}
                  className="text-[36px] sm:text-[56px] font-extrabold font-sans text-white leading-none mb-4 mt-6"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  ¥{formatNum(annualExpenses)}
                </motion.p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {QUICK_EXPENSES.map((v) => (
                    <QuickTag
                      key={v}
                      label={`¥${formatNum(v)}`}
                      active={annualExpenses === v}
                      onClick={() => setAnnualExpenses(v)}
                    />
                  ))}
                </div>

                <div className="max-w-md mx-auto mb-12">
                  <Slider
                    value={[annualExpenses]}
                    min={30000}
                    max={600000}
                    step={6000}
                    onValueChange={([v]) => setAnnualExpenses(v)}
                  />
                </div>

                <h2 className="font-cn text-[24px] font-light text-white mb-2">
                  {locale === "zh" ? "年收入" : "Annual Income"}
                </h2>

                <motion.p
                  key={annualIncome}
                  className="text-[36px] sm:text-[56px] font-extrabold font-sans text-white leading-none mb-4 mt-6"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  ¥{formatNum(annualIncome)}
                </motion.p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {QUICK_INCOME.map((v) => (
                    <QuickTag
                      key={v}
                      label={`¥${formatNum(v)}`}
                      active={annualIncome === v}
                      onClick={() => setAnnualIncome(v)}
                    />
                  ))}
                </div>

                <div className="max-w-md mx-auto mb-8">
                  <Slider
                    value={[annualIncome]}
                    min={50000}
                    max={2000000}
                    step={10000}
                    onValueChange={([v]) => setAnnualIncome(v)}
                  />
                </div>

                {/* Savings rate feedback */}
                <div className="glass-card inline-flex items-center gap-3 px-5 py-3 mx-auto">
                  <span className="text-[11px] text-[#555] uppercase tracking-[1px]">
                    {locale === "zh" ? "储蓄率" : "SAVINGS RATE"}
                  </span>
                  <span
                    className="text-[18px] font-extrabold"
                    style={{
                      color: savingsRate >= 50 ? "#4ade80" : savingsRate >= 25 ? "#fbbf24" : "#f87171",
                    }}
                  >
                    {Math.round(savingsRate)}%
                  </span>
                </div>
              </div>
            )}

            {/* Step 3: FIRE Model */}
            {onboardingStep === 3 && (
              <div className="text-center">
                <p className="text-caption font-semibold uppercase text-[#666] tracking-[3px] mb-3">
                  {locale === "zh" ? "第四步 · 模式" : "STEP 04 · MODEL"}
                </p>
                <h2 className="font-cn text-[24px] font-light text-white mb-2">
                  {t.onboarding.steps[3].title}
                </h2>
                <p className="text-body-sm text-[#666] mb-10">
                  {t.onboarding.steps[3].subtitle}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {(["lean", "regular", "fat", "barista"] as FireModel[]).map(
                    (model) => {
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
                          onSelect={setFireModel}
                          variant="grid"
                        />
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between py-10">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleBack}
          disabled={onboardingStep === 0}
          className={onboardingStep === 0 ? "opacity-0 pointer-events-none" : ""}
        >
          {locale === "zh" ? "← 上一步" : "← Back"}
        </Button>

        <Button onClick={handleNext}>
          {onboardingStep === TOTAL_STEPS - 1
            ? locale === "zh" ? "开始计算 ⚡" : "Calculate ⚡"
            : locale === "zh" ? "继续 →" : "Continue →"}
        </Button>
      </div>
    </div>
  );
}
