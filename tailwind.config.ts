import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#fafafa",

        "bg-elevated": "rgba(255,255,255,0.015)",
        "bg-hover": "rgba(255,255,255,0.02)",

        "border-subtle": "rgba(255,255,255,0.04)",
        "border-hover": "rgba(255,255,255,0.08)",

        "text-primary": "#fafafa",
        "text-secondary": "#999999",
        "text-tertiary": "#666666",
        "text-muted": "#444444",
        "text-ghost": "#333333",

        accent: {
          DEFAULT: "#4ade80",
          bg: "rgba(74,222,128,0.08)",
          glow: "rgba(74,222,128,0.04)",
        },
        danger: "#f87171",
        info: "#38bdf8",
        warning: "#fbbf24",
        purple: "#a78bfa",

        "fire-lean": "#a3e635",
        "fire-barista": "#fbbf24",
        "fire-fat": "#f87171",
        "fire-coast": "#38bdf8",

        growth: "#4ade80",
        target: "#f87171",
      },
      fontFamily: {
        sans: ["var(--font-sora)", "sans-serif"],
        serif: ["var(--font-instrument)", "serif"],
        cn: ["var(--font-noto)", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(56px, 10vw, 120px)", { lineHeight: "1.1" }],
        "display-lg": ["clamp(48px, 8vw, 96px)", { lineHeight: "1.05" }],
        "display-md": ["clamp(48px, 8vw, 88px)", { lineHeight: "1.1" }],
        "heading-1": ["30px", { lineHeight: "1.35" }],
        "heading-2": ["22px", { lineHeight: "1.3" }],
        body: ["15px", { lineHeight: "1.65" }],
        "body-sm": ["13px", { lineHeight: "1.6" }],
        caption: ["11px", { lineHeight: "1.5", letterSpacing: "3px" }],
        micro: ["9px", { lineHeight: "1.4" }],
      },
      spacing: {
        "nav-h": "64px",
        "section-gap": "80px",
        "page-px": "40px",
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        sm: "2px",
        md: "10px",
        lg: "16px",
        xl: "20px",
        full: "99px",
        button: "60px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "count-in": {
          from: { opacity: "0", transform: "scale(0.8) translateY(20px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        expand: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.4s ease forwards",
        "count-in": "count-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
        expand: "expand 1.5s ease 1s forwards",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s infinite",
        grain: "grain-shift 8s steps(10) infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
