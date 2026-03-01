"use client";

import { Trash2 } from "lucide-react";
import { useFireStore } from "@/store/useFireStore";
import { useTranslation } from "@/lib/useTranslation";

export function PortfolioSliders() {
  const { t, locale } = useTranslation();
  const portfolioAssets = useFireStore((s) => s.portfolioAssets);
  const portfolioInputMode = useFireStore((s) => s.portfolioInputMode);
  const setPortfolioInputMode = useFireStore((s) => s.setPortfolioInputMode);
  const addPortfolioAsset = useFireStore((s) => s.addPortfolioAsset);
  const updatePortfolioAsset = useFireStore((s) => s.updatePortfolioAsset);
  const removePortfolioAsset = useFireStore((s) => s.removePortfolioAsset);

  const isPercent = portfolioInputMode === "percent";
  const total = portfolioAssets.reduce((sum, a) => sum + a.value, 0);
  const percentages = portfolioAssets.map((a) =>
    total === 0 ? 0 : isPercent ? a.value : (a.value / total) * 100
  );

  const conicParts: string[] = [];
  let cumulative = 0;
  for (let i = 0; i < portfolioAssets.length; i++) {
    const pct = percentages[i];
    const startDeg = cumulative * 3.6;
    cumulative += pct;
    const endDeg = cumulative * 3.6;
    conicParts.push(`${portfolioAssets[i].color} ${startDeg}deg ${endDeg}deg`);
  }
  const donutGradient =
    conicParts.length > 0
      ? `conic-gradient(${conicParts.join(", ")})`
      : "conic-gradient(#333 0deg 360deg)";

  const displayTotal = isPercent
    ? `${portfolioAssets.reduce((s, a) => s + a.value, 0)}%`
    : `¥${portfolioAssets.reduce((s, a) => s + a.value, 0).toLocaleString()}`;

  const pt = t.dashboard.portfolio;

  return (
    <div className="space-y-5">
      {/* Header with toggle */}
      <div className="flex items-center justify-between">
        <h4 className="text-[13px] font-semibold text-white tracking-[0.5px]">{pt.title}</h4>
        <div className="flex items-center rounded-full border border-[rgba(255,255,255,0.08)] p-0.5 text-[11px]">
          <button
            onClick={() => setPortfolioInputMode("percent")}
            className={`px-3 py-1 rounded-full transition-all ${
              isPercent
                ? "bg-[#fafafa] text-[#050505] font-semibold"
                : "text-[#555] hover:text-[#999]"
            }`}
          >
            {pt.inputModePercent}
          </button>
          <button
            onClick={() => setPortfolioInputMode("amount")}
            className={`px-3 py-1 rounded-full transition-all ${
              !isPercent
                ? "bg-[#fafafa] text-[#050505] font-semibold"
                : "text-[#555] hover:text-[#999]"
            }`}
          >
            {pt.inputModeAmount}
          </button>
        </div>
      </div>

      {/* Donut chart */}
      <div className="flex items-center gap-4">
        <div
          className="h-14 w-14 flex-shrink-0 rounded-full"
          style={{ background: donutGradient }}
        />
        <div className="space-y-1 text-[11px] flex-1 min-w-0">
          {portfolioAssets.map((asset) => (
            <div key={asset.id} className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: asset.color }}
              />
              <span className="text-[#666] truncate">
                {locale === "zh" ? asset.label : asset.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Asset rows */}
      <div className="space-y-2">
        {portfolioAssets.map((asset) => (
          <div key={asset.id} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
              style={{ backgroundColor: asset.color }}
            />
            <input
              type="text"
              value={locale === "zh" ? asset.label : asset.labelEn}
              onChange={(e) =>
                updatePortfolioAsset(asset.id, {
                  [locale === "zh" ? "label" : "labelEn"]: e.target.value,
                })
              }
              placeholder={pt.namePlaceholder}
              className="flex-1 min-w-0 bg-transparent text-[11px] text-[#888] border-b border-[rgba(255,255,255,0.04)] focus:border-[rgba(255,255,255,0.12)] outline-none pb-0.5"
            />
            <input
              type="number"
              value={asset.value}
              min={0}
              onChange={(e) =>
                updatePortfolioAsset(asset.id, {
                  value: parseFloat(e.target.value) || 0,
                })
              }
              className="w-16 text-right bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-md px-2 py-1 text-[11px] text-white outline-none focus:border-[rgba(255,255,255,0.12)] number-input"
            />
            <span className="text-[11px] text-[#444] w-4">
              {isPercent ? "%" : "¥"}
            </span>
            <button
              onClick={() => removePortfolioAsset(asset.id)}
              disabled={portfolioAssets.length <= 1}
              className="text-[#333] hover:text-danger disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              aria-label="Remove asset"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#444]">
          {pt.total}: {displayTotal}
        </span>
        <button
          onClick={addPortfolioAsset}
          className="text-[11px] text-accent hover:text-accent/80 transition-colors"
        >
          ＋ {pt.addAsset}
        </button>
      </div>
    </div>
  );
}
