"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CrossoverChart } from "@/components/CrossoverChart";
import { FireModelCard } from "@/components/FireModelCard";
import { useTranslation } from "@/lib/useTranslation";
import { useFireStore } from "@/store/useFireStore";
import { track } from "@/lib/analytics";
import type { FireModel } from "@/utils/fireCalculations";

function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  };
}

const FEATURE_SYMBOLS = ["◈", "◆", "◇"];

export default function HomePage() {
  const { t, locale } = useTranslation();
  const fireModel = useFireStore((s) => s.fireModel);
  const setFireModel = useFireStore((s) => s.setFireModel);
  const models: FireModel[] = ["lean", "regular", "fat", "barista"];

  useEffect(() => {
    track("page_view", { page: "landing" });
  }, []);

  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative mx-auto max-w-container px-4 sm:px-page-px pt-16 sm:pt-24 pb-12 sm:pb-section-gap">
        {/* Conic gradient background glow */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[220px] w-[220px] animate-float"
          style={{
            background: "conic-gradient(from 180deg, #4ade8011, #38bdf811, #a78bfa11, #4ade8011)",
            filter: "blur(60px)",
          }}
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end">
          {/* Left column */}
          <div>
            {/* Eyebrow */}
            <motion.div {...stagger(0)} className="flex items-center gap-2.5 mb-8">
              <div className="h-px w-8 bg-accent" />
              <span className="text-caption font-semibold uppercase text-accent tracking-[4px]">
                FIREPATH
              </span>
            </motion.div>

            {/* Mixed typography heading */}
            <motion.h1 {...stagger(1)} className="mb-6">
              <span className="block font-cn text-[clamp(36px,6vw,72px)] font-black text-[#fafafa] leading-[1.1]">
                {locale === "zh" ? "你距离财富自由" : "How Far From"}
              </span>
              <span className="block font-serif-display text-[clamp(40px,7vw,80px)] text-[#fafafa] leading-[1.1]">
                {locale === "zh" ? "还有多远？" : "Freedom?"}
              </span>
            </motion.h1>

            <motion.p {...stagger(2)} className="text-body text-[#999] font-light max-w-md leading-relaxed mb-10">
              {t.landing.hero.subtitle}
            </motion.p>

            {/* CTA + info */}
            <motion.div {...stagger(3)} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Link href="/onboarding" onClick={() => track("onboarding_start", { source: "hero_cta" })}>
                <Button size="default">
                  {locale === "zh" ? "开始测算 →" : "Start Calculating →"}
                </Button>
              </Link>
              <p className="text-[11px] text-[#444] tracking-[0.5px]">
                {t.landing.hero.ctaSub}
              </p>
            </motion.div>
          </div>

          {/* Right column — intentionally empty space for visual breath */}
          <div />
        </div>

        {/* Expand line */}
        <motion.div
          className="h-px bg-[rgba(255,255,255,0.04)] mt-20"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
        />
      </section>

      {/* ── Crossover Chart Section ── */}
      <section className="mx-auto max-w-container px-4 sm:px-page-px pb-12 sm:pb-section-gap">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-14">
          {/* Left: section header */}
          <div>
            <motion.p {...stagger(0)} className="text-caption font-semibold uppercase text-text-tertiary tracking-[3px] mb-4">
              {locale === "zh" ? "核心概念" : "KEY CONCEPT"}
            </motion.p>
            <motion.div {...stagger(1)}>
              <span className="block font-cn text-[28px] font-light text-[#fafafa] leading-[1.35]">
                {locale === "zh" ? "财富交叉点" : "The Crossover"}
              </span>
              <span className="block font-serif-display text-[32px] text-[#fafafa] leading-[1.35]">
                {locale === "zh" ? "Freedom Point" : "Point"}
              </span>
            </motion.div>
            <motion.p {...stagger(2)} className="text-body-sm text-[#666] mt-4 leading-relaxed">
              {t.landing.whatIsFire.crossoverDesc}
            </motion.p>
          </div>

          {/* Right: chart */}
          <motion.div
            {...stagger(1)}
            className="glass-card p-7 h-[280px]"
            style={{ borderRadius: "18px" }}
          >
            <CrossoverChart />
          </motion.div>
        </div>
      </section>

      {/* ── FIRE Models Section ── */}
      <section className="mx-auto max-w-container px-4 sm:px-page-px pb-12 sm:pb-section-gap border-t border-[rgba(255,255,255,0.04)] pt-12 sm:pt-section-gap">
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.p {...stagger(0)} className="text-caption font-semibold uppercase text-text-tertiary tracking-[3px] mb-4">
              {locale === "zh" ? "选择模式" : "CHOOSE MODEL"}
            </motion.p>
            <motion.div {...stagger(1)}>
              <span className="block font-cn text-[28px] font-light text-[#fafafa] leading-[1.35]">
                {locale === "zh" ? "四种 FIRE" : "Four FIRE"}
              </span>
              <span className="block font-serif-display text-[32px] text-[#fafafa] leading-[1.35]">
                Models
              </span>
            </motion.div>
          </div>
          <motion.span
            {...stagger(1)}
            className="font-serif-display text-[64px] text-[#1a1a1a] hidden lg:block"
          >
            04
          </motion.span>
        </div>

        <motion.div {...stagger(2)} className="grid grid-cols-2 sm:flex gap-2">
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
                onSelect={setFireModel}
                variant="landing"
              />
            );
          })}
        </motion.div>
      </section>

      {/* ── Features Section ── */}
      <section className="mx-auto max-w-container px-4 sm:px-page-px pb-12 sm:pb-section-gap border-t border-[rgba(255,255,255,0.04)] pt-12 sm:pt-section-gap">
        <motion.p {...stagger(0)} className="text-caption font-semibold uppercase text-text-tertiary tracking-[3px] mb-10">
          {locale === "zh" ? "核心功能" : "FEATURES"}
        </motion.p>

        {[
          { title: t.landing.features.calc.title, desc: t.landing.features.calc.desc },
          { title: t.landing.features.bilingual.title, desc: t.landing.features.bilingual.desc },
          { title: t.landing.features.scenarios.title, desc: t.landing.features.scenarios.desc },
        ].map((feature, i) => (
          <motion.div
            key={i}
            {...stagger(i)}
            className="group grid grid-cols-[40px_1fr] sm:grid-cols-[60px_1fr_1fr_40px] items-start sm:items-center gap-y-1 sm:gap-y-0 py-6 sm:py-8 border-t border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
          >
            <span className="text-[12px] font-mono text-[#333] group-hover:text-white transition-colors row-span-2 sm:row-span-1 pt-1 sm:pt-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[18px] sm:text-[20px] font-cn font-semibold text-white">
              {feature.title}
            </h3>
            <p className="text-[13px] sm:text-[14px] text-[#555] leading-relaxed col-start-2 sm:col-start-auto">
              {feature.desc}
            </p>
            <span className="text-[16px] text-[#333] text-right hidden sm:block">
              {FEATURE_SYMBOLS[i]}
            </span>
          </motion.div>
        ))}
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative mx-auto max-w-container px-4 sm:px-page-px py-16 sm:py-24 border-t border-[rgba(255,255,255,0.04)]">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px]"
          style={{
            background: "radial-gradient(circle, rgba(74,222,128,0.06), transparent)",
          }}
        />

        <div className="relative text-center">
          <motion.p {...stagger(0)} className="text-caption font-semibold uppercase text-text-tertiary tracking-[4px] mb-6">
            {locale === "zh" ? "准备好了吗" : "READY?"}
          </motion.p>
          <motion.h2 {...stagger(1)} className="font-cn text-[32px] font-bold text-white mb-10">
            {t.landing.finalCta.title}
          </motion.h2>
          <motion.div {...stagger(2)}>
            <Link href="/onboarding" onClick={() => track("onboarding_start", { source: "bottom_cta" })}>
              <Button size="lg">
                {locale === "zh" ? "开始测算 →" : "Start Calculating →"}
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          {...stagger(3)}
          className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-16 sm:mt-24 text-[11px] text-[#333] text-center sm:text-left"
        >
          <span>© 2026 FIREPATH</span>
          <span className="tracking-[1px]">FINANCIAL INDEPENDENCE, RETIRE EARLY</span>
        </motion.div>
      </section>
    </main>
  );
}
