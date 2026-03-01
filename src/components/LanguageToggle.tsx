"use client";

import { motion } from "framer-motion";
import { useFireStore } from "@/store/useFireStore";

export function LanguageToggle() {
  const locale = useFireStore((s) => s.locale);
  const setLocale = useFireStore((s) => s.setLocale);

  return (
    <div
      className="relative flex items-center rounded-full border border-[rgba(255,255,255,0.08)] bg-transparent p-0.5 cursor-pointer select-none"
      onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
    >
      <motion.div
        layoutId="lang-pill"
        className="absolute rounded-full bg-[#fafafa]"
        style={{
          width: "calc(50% - 2px)",
          height: "calc(100% - 4px)",
          top: 2,
          left: locale === "zh" ? 2 : "calc(50%)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      <span
        className={`relative z-10 px-3 py-1 text-[11px] font-semibold tracking-[0.5px] transition-colors ${
          locale === "zh" ? "text-[#050505]" : "text-[#555]"
        }`}
      >
        中文
      </span>
      <span
        className={`relative z-10 px-3 py-1 text-[11px] font-semibold tracking-[0.5px] transition-colors ${
          locale === "en" ? "text-[#050505]" : "text-[#555]"
        }`}
      >
        EN
      </span>
    </div>
  );
}
