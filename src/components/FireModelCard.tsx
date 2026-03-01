"use client";

import { motion } from "framer-motion";
import type { FireModel } from "@/utils/fireCalculations";

const MODEL_COLORS: Record<FireModel, string> = {
  lean: "#a3e635",
  regular: "#4ade80",
  fat: "#f87171",
  barista: "#fbbf24",
};

const MODEL_EMOJIS: Record<FireModel, string> = {
  lean: "🌿",
  regular: "🔥",
  fat: "👑",
  barista: "☕",
};

interface FireModelCardProps {
  model: FireModel;
  title: string;
  description: string;
  multiplier: string;
  selected: boolean;
  onSelect: (model: FireModel) => void;
  variant?: "landing" | "grid";
}

export function FireModelCard({
  model,
  title,
  description,
  multiplier,
  selected,
  onSelect,
  variant = "grid",
}: FireModelCardProps) {
  const color = MODEL_COLORS[model];
  const emoji = MODEL_EMOJIS[model];

  if (variant === "landing") {
    return (
      <motion.div
        onClick={() => onSelect(model)}
        className="group relative flex-1 cursor-pointer flex flex-col justify-between rounded-[14px] border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.015)] p-4 sm:p-8 min-h-[160px] sm:min-h-[200px] transition-all duration-[400ms] ease-out-expo sm:hover:flex-[2.5] sm:hover:px-7"
        style={{
          borderColor: selected ? `${color}33` : undefined,
          background: selected
            ? `linear-gradient(135deg, ${color}08, ${color}03)`
            : undefined,
        }}
      >
        {/* Top glow on hover */}
        <div
          className="pointer-events-none absolute right-4 top-4 h-[120px] w-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${color}15, transparent)`,
          }}
        />

        <div className="relative z-10">
          <span className="text-[26px]">{emoji}</span>
          <p className="text-[12px] font-bold uppercase tracking-[1px] text-[#fafafa] mt-2">
            {model.toUpperCase()}
          </p>
          <p className="text-[11px] text-[#555] font-cn">{title}</p>
        </div>

        {/* Description only on hover */}
        <p className="relative z-10 text-[13px] text-[#888] mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:block leading-relaxed">
          {description}
        </p>

        <p
          className="relative z-10 text-[22px] font-extrabold mt-auto pt-4 transition-all duration-300 group-hover:text-[34px]"
          style={{ color: selected ? color : "#333" }}
        >
          {multiplier}
        </p>
      </motion.div>
    );
  }

  return (
    <div
      onClick={() => onSelect(model)}
      className="cursor-pointer rounded-md px-3 py-3.5 border transition-all duration-200"
      style={{
        borderColor: selected ? `${color}44` : "rgba(255,255,255,0.04)",
        background: selected ? `${color}08` : "rgba(255,255,255,0.015)",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{emoji}</span>
        <span className="text-[12px] font-bold uppercase tracking-[0.5px] text-white">
          {model}
        </span>
      </div>
      <p className="text-[11px] text-[#555] font-cn">{title}</p>
      <p
        className="text-[14px] font-extrabold mt-1.5"
        style={{ color: selected ? color : "#555" }}
      >
        {multiplier}
      </p>
    </div>
  );
}
