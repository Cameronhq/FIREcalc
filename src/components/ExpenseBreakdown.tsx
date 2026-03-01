"use client";

import { Trash2 } from "lucide-react";
import { useFireStore } from "@/store/useFireStore";
import { useTranslation } from "@/lib/useTranslation";

export function ExpenseBreakdown() {
  const { t, locale } = useTranslation();
  const expenseCategories = useFireStore((s) => s.expenseCategories);
  const annualExpenses = useFireStore((s) => s.annualExpenses);
  const setAnnualExpenses = useFireStore((s) => s.setAnnualExpenses);
  const addExpenseCategory = useFireStore((s) => s.addExpenseCategory);
  const updateExpenseCategory = useFireStore((s) => s.updateExpenseCategory);
  const removeExpenseCategory = useFireStore((s) => s.removeExpenseCategory);

  const et = t.dashboard.expenses;

  const monthlyTotal = expenseCategories.reduce((sum, c) => sum + c.monthlyAmount, 0);
  const annualTotal = monthlyTotal * 12;
  const isSynced = annualTotal === annualExpenses;

  return (
    <div className="space-y-4">
      <p className="text-xs text-white/50">{et.subtitle}</p>

      {/* Category rows */}
      <div className="space-y-2">
        {expenseCategories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-2">
            {/* Emoji icon */}
            <span className="text-base w-6 flex-shrink-0 text-center">
              {cat.icon}
            </span>
            {/* Label input */}
            <input
              type="text"
              value={locale === "zh" ? cat.label : cat.labelEn}
              onChange={(e) =>
                updateExpenseCategory(cat.id, {
                  [locale === "zh" ? "label" : "labelEn"]: e.target.value,
                })
              }
              placeholder={et.namePlaceholder}
              className="flex-1 min-w-0 bg-transparent text-xs text-white/80 border-b border-white/20 focus:border-white/50 outline-none pb-0.5"
            />
            {/* Monthly amount input */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-white/40">¥</span>
              <input
                type="number"
                value={cat.monthlyAmount}
                min={0}
                onChange={(e) =>
                  updateExpenseCategory(cat.id, {
                    monthlyAmount: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-24 text-right bg-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:ring-1 focus:ring-white/30 number-input"
              />
            </div>
            {/* Delete button */}
            <button
              onClick={() => removeExpenseCategory(cat.id)}
              disabled={expenseCategories.length <= 1}
              className="text-white/30 hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              aria-label="Remove category"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add category button */}
      <button
        onClick={addExpenseCategory}
        className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        ＋ {et.addCategory}
      </button>

      {/* Footer summary card */}
      <div className="bg-white/5 rounded-lg p-3 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-white/60">{et.monthlyTotal}</span>
          <span className="text-white font-medium">
            ¥{monthlyTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/60">{et.annualTotal}</span>
          <span className="text-white font-medium">
            ¥{annualTotal.toLocaleString()}
          </span>
        </div>

        {/* Apply button */}
        <button
          onClick={() => setAnnualExpenses(annualTotal)}
          disabled={isSynced}
          className={`w-full mt-1 py-2 rounded-lg text-xs font-medium transition-all ${
            isSynced
              ? "bg-white/10 text-white/40 cursor-default"
              : "bg-emerald-500 hover:bg-emerald-400 text-white"
          }`}
        >
          {isSynced
            ? et.alreadySynced
            : `${et.applyButton} ¥${annualTotal.toLocaleString()}/年`}
        </button>
      </div>
    </div>
  );
}
