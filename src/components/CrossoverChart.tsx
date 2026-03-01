"use client";

import { motion } from "framer-motion";

export function CrossoverChart() {
  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 700 260"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="40"
            y1={40 + i * 45}
            x2="660"
            y2={40 + i * 45}
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />
        ))}

        {/* Area fill under net worth curve */}
        <motion.path
          d="M 40 220 C 120 215, 180 195, 250 165 S 380 100, 450 65 S 570 25, 660 15 L 660 250 L 40 250 Z"
          fill="url(#crossoverGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />

        {/* Net worth growth curve */}
        <motion.path
          d="M 40 220 C 120 215, 180 195, 250 165 S 380 100, 450 65 S 570 25, 660 15"
          stroke="#4ade80"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Expenses flat line (dashed) */}
        <motion.path
          d="M 40 150 L 660 150"
          stroke="#f87171"
          strokeWidth="1"
          strokeDasharray="5,4"
          strokeLinecap="round"
          opacity="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
        />

        {/* Freedom Point – glow */}
        <defs>
          <filter id="glow-fp">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="crossoverGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Crossover outer ring */}
        <motion.circle
          cx="345"
          cy="150"
          r="12"
          fill="none"
          stroke="#4ade80"
          strokeWidth="1"
          opacity="0.3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ delay: 2.4, type: "spring", stiffness: 300 }}
        />

        {/* Crossover inner dot with glow */}
        <motion.circle
          cx="345"
          cy="150"
          r="5"
          fill="#4ade80"
          filter="url(#glow-fp)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.2, type: "spring", stiffness: 400 }}
        />

        {/* Freedom Point label */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          <rect
            x="310"
            y="118"
            width="70"
            height="22"
            rx="11"
            fill="rgba(74,222,128,0.07)"
            stroke="rgba(74,222,128,0.27)"
            strokeWidth="1"
          />
          <text
            x="345"
            y="133"
            textAnchor="middle"
            fill="#4ade80"
            fontSize="9"
            fontWeight="600"
            fontFamily="var(--font-sora)"
          >
            FREEDOM
          </text>
        </motion.g>

        {/* Labels */}
        <motion.text
          x="630"
          y="20"
          fill="#4ade80"
          fontSize="9"
          fontWeight="600"
          fontFamily="var(--font-sora)"
          opacity="0.8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 2.5 }}
        >
          NET WORTH
        </motion.text>
        <motion.text
          x="630"
          y="145"
          fill="#f87171"
          fontSize="9"
          fontWeight="600"
          fontFamily="var(--font-sora)"
          opacity="0.8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.8 }}
        >
          EXPENSES
        </motion.text>

        {/* Axis labels */}
        <text x="40" y="248" fill="#333" fontSize="9" fontFamily="var(--font-sora)">
          TODAY
        </text>
        <text x="340" y="248" fill="#333" fontSize="9" fontFamily="var(--font-sora)">
          FIRE
        </text>
        <text x="630" y="248" fill="#333" fontSize="9" fontFamily="var(--font-sora)">
          FUTURE
        </text>
      </svg>
    </div>
  );
}
