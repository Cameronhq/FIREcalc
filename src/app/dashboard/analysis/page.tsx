"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, Lock, Zap, CheckCircle2, AlertTriangle, Shield, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockAnalysisResult } from "@/lib/mockData";
import { useTranslation } from "@/lib/useTranslation";
import { track } from "@/lib/analytics";

export default function AnalysisPage() {
  const { t, locale } = useTranslation();
  const [phase, setPhase] = useState<"scanning" | "paywall">("scanning");
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    track("page_view", { page: "analysis" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("paywall");
      track("pro_paywall_view", { source: "analysis_page", price: 9.9 });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const result = mockAnalysisResult;
  const redFlags = locale === "zh" ? result.redFlags : result.redFlagsEn;
  const actionSteps = locale === "zh" ? result.actionSteps : result.actionStepsEn;

  const gradeColors: Record<string, string> = {
    A: "#4ade80",
    B: "#fbbf24",
    C: "#f87171",
  };

  const handleCTAClick = () => {
    track("pro_paywall_cta_click", {
      source: "analysis_page",
      price: 9.9,
      currency: "USD",
    });
    setShowWaitlist(true);
    setTimeout(() => emailRef.current?.focus(), 100);
  };

  const handleSubmitEmail = () => {
    if (!email.trim() || !email.includes("@")) return;
    track("pro_waitlist_submit", { email: email.trim() });
    setSubmitted(true);

    try {
      const waitlist = JSON.parse(localStorage.getItem("fp_waitlist") || "[]");
      waitlist.push({ email: email.trim(), ts: Date.now() });
      localStorage.setItem("fp_waitlist", JSON.stringify(waitlist));
    } catch { /* */ }
  };

  const handleDismissWaitlist = () => {
    track("pro_paywall_dismiss", { source: "waitlist_modal" });
    setShowWaitlist(false);
    setEmail("");
    setSubmitted(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-[24px] font-cn font-bold text-white">
            {t.analysis.title}
          </h1>
          <span className="inline-flex items-center rounded-full bg-[rgba(251,191,36,0.15)] px-2 py-0.5 text-[10px] font-bold tracking-[1px] text-[#fbbf24] uppercase">
            PRO
          </span>
        </div>
        <p className="text-body-sm text-[#666]">{t.analysis.subtitle}</p>
      </div>

      <AnimatePresence mode="wait">
        {phase === "scanning" ? (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-6"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="h-16 w-16 rounded-full border-2 border-[rgba(255,255,255,0.06)] border-t-accent"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Scan className="h-6 w-6 text-accent" />
              </div>
            </div>
            <p className="text-[#888] text-body-sm">{t.analysis.scanning}</p>
          </motion.div>
        ) : (
          <motion.div
            key="paywall"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Compressed blurred preview — single row of 3 mini cards */}
            <div className="relative mb-0">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 filter blur-[5px] select-none pointer-events-none">
                {/* Grade mini card */}
                <div className="glass-card p-2.5 sm:p-4">
                  <p className="text-[9px] text-[#555] uppercase tracking-[1px] mb-2">
                    {t.analysis.grade}
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{
                        background: `${gradeColors[result.grade]}15`,
                        boxShadow: `0 0 0 2px ${gradeColors[result.grade]}40`,
                      }}
                    >
                      <span className="text-lg font-black" style={{ color: gradeColors[result.grade] }}>
                        {result.grade}
                      </span>
                    </div>
                    <span className="text-xl font-bold" style={{ color: gradeColors[result.grade] }}>
                      {result.score}
                    </span>
                  </div>
                </div>

                {/* Red flags mini card */}
                <div className="glass-card p-2.5 sm:p-4">
                  <p className="text-[9px] text-[#555] uppercase tracking-[1px] mb-2 flex items-center gap-1">
                    <AlertTriangle className="h-2.5 w-2.5 text-danger" />
                    {t.analysis.redFlags}
                  </p>
                  <div className="space-y-1.5">
                    {redFlags.slice(0, 2).map((_, i) => (
                      <div key={i} className="h-2 rounded-full bg-[rgba(255,255,255,0.06)]" style={{ width: `${85 - i * 15}%` }} />
                    ))}
                  </div>
                </div>

                {/* Actions mini card */}
                <div className="glass-card p-2.5 sm:p-4">
                  <p className="text-[9px] text-[#555] uppercase tracking-[1px] mb-2 flex items-center gap-1">
                    <CheckCircle2 className="h-2.5 w-2.5 text-accent" />
                    {t.analysis.actionSteps}
                  </p>
                  <div className="space-y-1.5">
                    {actionSteps.slice(0, 2).map((_, i) => (
                      <div key={i} className="h-2 rounded-full bg-[rgba(255,255,255,0.06)]" style={{ width: `${90 - i * 20}%` }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Gradient fade overlay on blurred cards */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent 20%, #050505 95%)" }}
              />
            </div>

            {/* ── PRO Paywall card — directly visible ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative -mt-4"
            >
              <div
                className="rounded-[18px] px-4 sm:px-8 py-8 sm:py-10 text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(251,191,36,0.04), rgba(74,222,128,0.04))",
                  border: "1px solid rgba(251,191,36,0.12)",
                }}
              >
                <div className="flex items-center justify-center mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(251,191,36,0.1)]">
                    <Lock className="h-5 w-5 text-[#fbbf24]" />
                  </div>
                </div>

                <h2 className="font-cn text-[20px] font-bold text-white mb-2">
                  {locale === "zh" ? "解锁深度财务分析" : "Unlock Deep Financial Analysis"}
                </h2>

                <p className="text-body-sm text-[#888] max-w-sm mx-auto mb-6 leading-relaxed">
                  {locale === "zh"
                    ? "获取 AI 驱动的个性化诊断报告，包含健康评级、风险预警和精准行动建议。"
                    : "Get an AI-powered personalized diagnostic report with health grades, risk alerts, and precise action steps."}
                </p>

                {/* Compact feature list — 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-sm mx-auto mb-8 text-left">
                  {(locale === "zh"
                    ? [
                        "财务健康评分",
                        "风险预警诊断",
                        "个性化行动建议",
                        "投资组合优化",
                        "税务筹划方案",
                        "持续更新迭代",
                      ]
                    : [
                        "Health score grading",
                        "Risk alert diagnosis",
                        "Action step plan",
                        "Portfolio optimization",
                        "Tax planning tips",
                        "Continuous updates",
                      ]
                  ).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-[12px] text-[#999]">
                      <CheckCircle2 className="h-3 w-3 text-accent flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Price — original + beta */}
                <div className="mb-6">
                  {/* Beta badge */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="inline-flex items-center rounded-full bg-[rgba(74,222,128,0.1)] px-2.5 py-0.5 text-[10px] font-bold tracking-[1px] text-accent uppercase">
                      {locale === "zh" ? "限时 BETA 价" : "BETA PRICE"}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="text-[20px] font-semibold text-[#444] line-through">
                      $19.9
                    </span>
                    <span className="text-[40px] font-extrabold text-white leading-none">
                      $9.9
                    </span>
                    <span className="text-[14px] text-[#555]">USD</span>
                  </div>
                  <p className="text-[11px] text-[#444] mt-1.5">
                    {locale === "zh" ? "一次购买 · 永久解锁 · 含未来所有更新" : "One-time · Lifetime access · All future updates"}
                  </p>
                </div>

                {/* CTA */}
                <Button
                  variant="accent"
                  size="lg"
                  onClick={handleCTAClick}
                  className="w-full max-w-xs"
                >
                  <Zap className="h-4 w-4" />
                  {locale === "zh" ? "立即解锁 PRO 分析" : "Unlock PRO Analysis"}
                </Button>

                {/* Trust signals */}
                <div className="flex items-center justify-center gap-4 mt-5 text-[10px] text-[#444]">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    {locale === "zh" ? "安全支付" : "Secure Payment"}
                  </div>
                  <span>·</span>
                  <span>{locale === "zh" ? "不满意退款" : "Money-back guarantee"}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Waitlist Modal ── */}
      <AnimatePresence>
        {showWaitlist && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDismissWaitlist}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div
                className="relative w-full max-w-md rounded-[18px] p-8 text-center"
                style={{
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Close button */}
                <button
                  onClick={handleDismissWaitlist}
                  className="absolute top-4 right-4 text-[#444] hover:text-[#888] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                {!submitted ? (
                  <>
                    {/* Coming Soon state */}
                    <div className="flex items-center justify-center mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(74,222,128,0.1)]">
                        <Mail className="h-5 w-5 text-accent" />
                      </div>
                    </div>

                    <span className="inline-flex items-center rounded-full bg-[rgba(251,191,36,0.12)] px-2.5 py-0.5 text-[10px] font-bold tracking-[1px] text-[#fbbf24] uppercase mb-4">
                      COMING SOON
                    </span>

                    <h3 className="font-cn text-[20px] font-bold text-white mb-2">
                      {locale === "zh"
                        ? "PRO 分析即将上线"
                        : "PRO Analysis Coming Soon"}
                    </h3>

                    <p className="text-[13px] text-[#888] leading-relaxed mb-6 max-w-xs mx-auto">
                      {locale === "zh"
                        ? "加入等待名单，上线时第一时间通知你，并锁定 $9.9 Beta 特价。"
                        : "Join the waitlist to get notified at launch and lock in the $9.9 beta price."}
                    </p>

                    {/* Email input */}
                    <div className="flex gap-2 max-w-xs mx-auto">
                      <input
                        ref={emailRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmitEmail()}
                        placeholder={locale === "zh" ? "你的邮箱地址" : "Your email address"}
                        className="flex-1 rounded-button bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-[13px] text-white placeholder-[#444] outline-none focus:border-accent/40 transition-colors"
                      />
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={handleSubmitEmail}
                        className="px-5 rounded-button"
                      >
                        {locale === "zh" ? "加入" : "Join"}
                      </Button>
                    </div>

                    <p className="text-[10px] text-[#333] mt-3">
                      {locale === "zh" ? "无垃圾邮件，仅上线通知" : "No spam, launch notification only"}
                    </p>
                  </>
                ) : (
                  <>
                    {/* Success state */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="flex items-center justify-center mb-5"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(74,222,128,0.15)]">
                        <CheckCircle2 className="h-7 w-7 text-accent" />
                      </div>
                    </motion.div>

                    <h3 className="font-cn text-[20px] font-bold text-white mb-2">
                      {locale === "zh" ? "已加入等待名单！" : "You're on the list!"}
                    </h3>

                    <p className="text-[13px] text-[#888] leading-relaxed mb-6 max-w-xs mx-auto">
                      {locale === "zh"
                        ? `我们会在 PRO 分析上线时通过 ${email} 通知你，同时为你锁定 $9.9 Beta 特价。`
                        : `We'll notify you at ${email} when PRO Analysis launches, with your $9.9 beta price locked in.`}
                    </p>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleDismissWaitlist}
                    >
                      {locale === "zh" ? "好的 →" : "Got it →"}
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
