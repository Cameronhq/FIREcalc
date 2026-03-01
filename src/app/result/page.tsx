"use client";

import { useEffect, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Share2, Twitter, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/KpiCard";
import { useFireResult, useFireStore } from "@/store/useFireStore";
import { useTranslation } from "@/lib/useTranslation";
import { formatCurrency } from "@/utils/formatters";
import { track } from "@/lib/analytics";

const ProjectionChart = dynamic(
  () => import("@/components/ProjectionChart"),
  { ssr: false }
);

function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  };
}

export default function ResultPage() {
  const { t, locale } = useTranslation();
  const result = useFireResult();
  const annualIncome = useFireStore((s) => s.annualIncome);
  const annualExpenses = useFireStore((s) => s.annualExpenses);
  const [copied, setCopied] = useState(false);

  const { yearsToFire, fireAge, fireNumber, chartData, status } = result;

  const savingsRate =
    annualIncome > 0
      ? Math.round(((annualIncome - annualExpenses) / annualIncome) * 100)
      : 0;

  const progress =
    fireNumber > 0
      ? Math.min(100, Math.round((useFireStore.getState().netWorth / fireNumber) * 100))
      : 0;

  const shareText = locale === "zh"
    ? yearsToFire !== null
      ? `我测算了自己的 FIRE 时间线：${yearsToFire} 年后（${fireAge} 岁）实现财务自由！储蓄率 ${savingsRate}%，目标 ${formatCurrency(fireNumber, locale, true)}。你呢？`
      : `我刚用 FIREPATH 测算了 FIRE 时间线，快来试试！`
    : yearsToFire !== null
      ? `I just calculated my FIRE timeline: ${yearsToFire} years to financial freedom (age ${fireAge})! Savings rate ${savingsRate}%, target ${formatCurrency(fireNumber, locale, true)}. What's yours?`
      : `I just calculated my FIRE timeline with FIREPATH. Try it!`;

  const shareUrl = typeof window !== "undefined" ? window.location.origin : "https://firepath.app";

  const handleCopyLink = useCallback(() => {
    const text = `${shareText}\n${shareUrl}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      track("result_share", { method: "copy" });
      setTimeout(() => setCopied(false), 2000);
    });
  }, [shareText, shareUrl]);

  const handleShareTwitter = useCallback(() => {
    track("result_share", { method: "twitter" });
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [shareText, shareUrl]);

  const handleNativeShare = useCallback(async () => {
    track("result_share", { method: "native" });
    if (navigator.share) {
      try {
        await navigator.share({
          title: "FIREPATH",
          text: shareText,
          url: shareUrl,
        });
      } catch { /* user cancelled */ }
    } else {
      handleCopyLink();
    }
  }, [shareText, shareUrl, handleCopyLink]);

  useEffect(() => {
    track("result_view", {
      yearsToFire: yearsToFire ?? -1,
      fireAge: fireAge ?? -1,
      status,
      savingsRate,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto max-w-[900px] px-4 sm:px-page-px py-10 sm:py-16">
      {/* Edge case: Already FIRE'd */}
      {status === "already_fired" && (
        <motion.div
          {...stagger(0)}
          className="glass-card p-10 mb-12 text-center"
          style={{ borderColor: "rgba(74,222,128,0.2)" }}
        >
          <CheckCircle2 className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-[24px] font-cn font-bold text-white mb-2">
            {t.result.alreadyFired.title}
          </h2>
          <p className="text-[#666]">{t.result.alreadyFired.subtitle}</p>
        </motion.div>
      )}

      {/* Edge case: Negative savings */}
      {status === "negative_savings" && (
        <motion.div
          {...stagger(0)}
          className="glass-card p-10 mb-12 text-center"
          style={{ borderColor: "rgba(248,113,113,0.2)" }}
        >
          <AlertTriangle className="h-12 w-12 text-danger mx-auto mb-4" />
          <h2 className="text-[24px] font-cn font-bold text-white mb-2">
            {t.result.negativeSavings.title}
          </h2>
          <p className="text-[#666]">{t.result.negativeSavings.subtitle}</p>
        </motion.div>
      )}

      {/* Core verdict */}
      <div className="text-center mb-16">
        {/* Eyebrow */}
        <motion.div {...stagger(0)} className="flex items-center justify-center gap-2.5 mb-8">
          <div className="h-px w-8 bg-accent" />
          <span className="text-caption font-semibold uppercase text-accent tracking-[4px]">
            YOUR FIRE PROJECTION
          </span>
          <div className="h-px w-8 bg-accent" />
        </motion.div>

        {/* Giant number */}
        <motion.div
          {...stagger(1)}
          className="mb-4"
        >
          <span className="text-display-md font-extrabold font-sans text-gradient-green inline-block">
            {yearsToFire !== null ? yearsToFire : "∞"}
            {" "}
            <span className="text-[40px]">
              {locale === "zh" ? "年" : "yrs"}
            </span>
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p {...stagger(2)} className="text-body text-[#999] font-light mb-6">
          {fireAge !== null
            ? locale === "zh"
              ? `你将在 ${fireAge} 岁达成 FIRE，获得人生的自由`
              : `You'll achieve FIRE at age ${fireAge}`
            : locale === "zh"
              ? "调整参数以查看预测"
              : "Adjust parameters to see projection"}
        </motion.p>

        {/* Share buttons */}
        <motion.div {...stagger(2)} className="flex items-center justify-center gap-2">
          <button
            onClick={handleNativeShare}
            className="inline-flex items-center gap-2 rounded-button border border-[rgba(255,255,255,0.08)] bg-transparent px-5 py-2.5 text-[12px] font-semibold text-[#999] transition-all hover:border-[rgba(255,255,255,0.16)] hover:text-white hover:-translate-y-0.5"
          >
            <Share2 className="h-3.5 w-3.5" />
            {locale === "zh" ? "分享结果" : "Share"}
          </button>
          <button
            onClick={handleShareTwitter}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-[rgba(255,255,255,0.08)] bg-transparent text-[#999] transition-all hover:border-[rgba(255,255,255,0.16)] hover:text-white hover:-translate-y-0.5"
            aria-label="Share on Twitter"
          >
            <Twitter className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-[rgba(255,255,255,0.08)] bg-transparent text-[#999] transition-all hover:border-[rgba(255,255,255,0.16)] hover:text-white hover:-translate-y-0.5"
            aria-label="Copy link"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Link2 className="h-3.5 w-3.5" />}
          </button>
        </motion.div>
      </div>

      {/* KPI row */}
      <motion.div {...stagger(2)} className="grid grid-cols-3 gap-3 sm:flex sm:justify-center sm:gap-12 mb-12">
        <KpiCard
          label={locale === "zh" ? "储蓄率" : "SAVINGS RATE"}
          value={`${savingsRate}%`}
          color={savingsRate >= 50 ? "#4ade80" : savingsRate >= 25 ? "#fbbf24" : "#f87171"}
        />
        <KpiCard
          label={locale === "zh" ? "当前进度" : "PROGRESS"}
          value={`${progress}%`}
          color="#38bdf8"
        />
        <KpiCard
          label={locale === "zh" ? "目标金额" : "FIRE NUMBER"}
          value={formatCurrency(fireNumber, locale, true)}
          color="#a78bfa"
        />
      </motion.div>

      {/* Chart */}
      {chartData.length > 0 && (
        <motion.div
          {...stagger(3)}
          className="glass-card p-4 sm:p-7 mb-12"
          style={{ borderRadius: "18px" }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-caption font-semibold uppercase text-[#555] tracking-[2px]">
              {locale === "zh" ? "资产增长预测" : "WEALTH PROJECTION"}
            </span>
            <span className="text-[11px] text-accent">
              {yearsToFire !== null
                ? `${yearsToFire} ${locale === "zh" ? "年达成" : "yrs to FIRE"}`
                : ""}
            </span>
          </div>
          <ProjectionChart chartData={chartData} crossoverYear={yearsToFire} />
        </motion.div>
      )}

      {/* Hook card */}
      <motion.div
        {...stagger(4)}
        className="rounded-[18px] p-6 sm:p-10"
        style={{
          background: "linear-gradient(135deg, rgba(74,222,128,0.04), rgba(56,189,248,0.04))",
          border: "1px solid rgba(74,222,128,0.1)",
        }}
      >
        <h3 className="font-cn text-[20px] font-semibold text-white mb-3">
          {yearsToFire !== null
            ? locale === "zh"
              ? `觉得 ${yearsToFire} 年太久了？`
              : `Think ${yearsToFire} years is too long?`
            : t.result.upsell.title}
        </h3>
        <p className="text-[14px] text-[#888] leading-relaxed mb-8">
          {locale === "zh"
            ? "通过优化投资策略、调整支出结构、发展副业收入，你可以大幅缩短 FIRE 时间线。"
            : "Optimize investments, restructure expenses, and develop side income to significantly shorten your FIRE timeline."}
        </p>

        <Link href="/dashboard" onClick={() => track("result_cta_click", { target: "dashboard" })}>
          <Button variant="accent">
            {locale === "zh" ? "⚡ 深度定制我的 FIRE 方案" : "⚡ Customize My FIRE Plan"}
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
