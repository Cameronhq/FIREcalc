"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  color?: string;
  className?: string;
}

export function KpiCard({
  label,
  value,
  color = "#4ade80",
  className,
}: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex-1 min-w-0 glass-card px-3 sm:px-[18px] py-4 sm:py-5",
        className
      )}
    >
      <p className="text-[10px] sm:text-[11px] text-[#555] tracking-[1px] mb-1.5 sm:mb-2 uppercase font-semibold truncate">
        {label}
      </p>
      <p
        className="text-[18px] sm:text-heading-2 font-extrabold font-sans truncate"
        style={{ color }}
      >
        {value}
      </p>
    </motion.div>
  );
}
