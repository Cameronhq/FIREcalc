"use client";

import { translations } from "./i18n";
import { useFireStore } from "@/store/useFireStore";

export function useTranslation() {
  const locale = useFireStore((s) => s.locale);
  const t = translations[locale];
  return { t, locale };
}
