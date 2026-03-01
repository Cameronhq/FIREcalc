"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";
import type { AnalysisResult } from "@/lib/mockData";
import { useTranslation } from "@/lib/useTranslation";

interface AnalysisReportProps {
  result: AnalysisResult;
}

const gradeConfig = {
  A: {
    color: "text-growth",
    ring: "ring-growth/50",
    bg: "bg-growth/10",
    label: { zh: "优秀", en: "Excellent" },
  },
  B: {
    color: "text-gold",
    ring: "ring-gold/50",
    bg: "bg-gold/10",
    label: { zh: "良好", en: "Good" },
  },
  C: {
    color: "text-target",
    ring: "ring-target/50",
    bg: "bg-target/10",
    label: { zh: "需改进", en: "Needs Work" },
  },
};

export function AnalysisReport({ result }: AnalysisReportProps) {
  const { t, locale } = useTranslation();
  const config = gradeConfig[result.grade];

  const redFlags = locale === "zh" ? result.redFlags : result.redFlagsEn;
  const actionSteps =
    locale === "zh" ? result.actionSteps : result.actionStepsEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Grade card */}
      <div className="glass-card p-6">
        <p className="text-sm text-white/50 mb-4">{t.analysis.grade}</p>
        <div className="flex items-center gap-6">
          {/* Grade circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className={clsx(
              "flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full ring-4",
              config.bg,
              config.ring
            )}
          >
            <span className={clsx("text-4xl font-black", config.color)}>
              {result.grade}
            </span>
          </motion.div>

          {/* Score & summary */}
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-1">
              <span className={clsx("text-3xl font-bold", config.color)}>
                {result.score}
              </span>
              <span className="text-white/40 text-sm">/ 100</span>
              <span
                className={clsx(
                  "ml-2 rounded-full px-2 py-0.5 text-xs font-medium",
                  config.bg,
                  config.color
                )}
              >
                {config.label[locale]}
              </span>
            </div>
            <p className="text-sm text-white/60">
              {locale === "zh" ? result.summary : result.summaryEn}
            </p>
          </div>
        </div>
      </div>

      {/* Red flags */}
      {redFlags.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-white mb-4">
            <AlertTriangle className="h-4 w-4 text-target" />
            {t.analysis.redFlags}
          </h3>
          <ul className="space-y-3">
            {redFlags.map((flag, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3 text-sm text-white/70"
              >
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-target/20 text-xs text-target font-bold">
                  !
                </span>
                {flag}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Action steps */}
      {actionSteps.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="flex items-center gap-2 font-semibold text-white mb-4">
            <CheckCircle2 className="h-4 w-4 text-growth" />
            {t.analysis.actionSteps}
          </h3>
          <ol className="space-y-3">
            {actionSteps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-3 text-sm text-white/70"
              >
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-growth/20 text-xs text-growth font-bold">
                  {i + 1}
                </span>
                {step}
              </motion.li>
            ))}
          </ol>
        </div>
      )}
    </motion.div>
  );
}
