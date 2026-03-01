export function formatCurrency(
  amount: number,
  locale: "zh" | "en" = "zh",
  compact = false
): string {
  if (locale === "zh") {
    if (compact) {
      if (Math.abs(amount) >= 1e8) {
        return `¥${(amount / 1e8).toFixed(2)}亿`;
      }
      if (Math.abs(amount) >= 1e4) {
        return `¥${(amount / 1e4).toFixed(0)}万`;
      }
      return `¥${amount.toFixed(0)}`;
    }
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // English locale
  if (compact) {
    if (Math.abs(amount) >= 1e9) {
      return `¥${(amount / 1e9).toFixed(2)}B`;
    }
    if (Math.abs(amount) >= 1e6) {
      return `¥${(amount / 1e6).toFixed(2)}M`;
    }
    if (Math.abs(amount) >= 1e3) {
      return `¥${(amount / 1e3).toFixed(0)}K`;
    }
    return `¥${amount.toFixed(0)}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatYears(years: number | null, locale: "zh" | "en" = "zh"): string {
  if (years === null) return locale === "zh" ? "无法计算" : "N/A";
  if (years === 0) return locale === "zh" ? "已实现" : "Achieved";
  return locale === "zh" ? `${years} 年` : `${years} yrs`;
}
