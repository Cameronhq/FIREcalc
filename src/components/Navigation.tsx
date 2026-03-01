"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageToggle } from "./LanguageToggle";
import { useTranslation } from "@/lib/useTranslation";
import { track } from "@/lib/analytics";

export function Navigation() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: t.nav.home, pro: false },
    { href: "/dashboard", label: t.nav.dashboard, pro: false },
    { href: "/dashboard/analysis", label: t.nav.analysis, pro: true },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.04)] bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-container items-center justify-between px-4 sm:px-page-px h-nav-h">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-[10px] w-[10px] rotate-45 rounded-sm bg-white" />
          <span className="font-sans text-[14px] font-semibold tracking-[1.5px] text-white">
            FIREPATH
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/" || link.href === "/dashboard"
                ? pathname === link.href
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => track("nav_click", { target: link.href })}
                className={`relative flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[1.5px] transition-colors ${
                  isActive
                    ? "text-[#fafafa] after:absolute after:-bottom-[21px] after:left-0 after:right-0 after:h-px after:bg-accent"
                    : "text-[#555] hover:text-[#999]"
                }`}
              >
                {link.label}
                {link.pro && (
                  <span className="inline-flex items-center rounded-full bg-[rgba(251,191,36,0.15)] px-1.5 py-px text-[8px] font-bold tracking-[0.5px] text-[#fbbf24] uppercase">
                    PRO
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] text-[#555] tracking-[1px]">
              LIVE
            </span>
          </div>
          <LanguageToggle />
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center h-9 w-9 md:hidden text-[#999] hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[rgba(255,255,255,0.04)] bg-[#050505]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((link) => {
                const isActive =
                  link.href === "/" || link.href === "/dashboard"
                    ? pathname === link.href
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      track("nav_click", { target: link.href });
                      setMobileOpen(false);
                    }}
                    className={`flex items-center gap-2 rounded-lg px-3 py-3 text-[13px] font-semibold uppercase tracking-[1px] transition-colors ${
                      isActive
                        ? "text-[#fafafa] bg-[rgba(255,255,255,0.04)]"
                        : "text-[#666] hover:text-white hover:bg-[rgba(255,255,255,0.02)]"
                    }`}
                  >
                    {link.label}
                    {link.pro && (
                      <span className="inline-flex items-center rounded-full bg-[rgba(251,191,36,0.15)] px-1.5 py-px text-[8px] font-bold tracking-[0.5px] text-[#fbbf24] uppercase">
                        PRO
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
