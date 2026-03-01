import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateFire, type FireModel, type FireResult } from "@/utils/fireCalculations";

export interface AssetItem {
  id: string;
  label: string;
  labelEn: string;
  color: string;
  value: number;
}

export interface ExpenseCategory {
  id: string;
  label: string;
  labelEn: string;
  icon: string;
  monthlyAmount: number;
}

export interface Assumptions {
  nominalReturn: number;
  inflationRate: number;
  swr: number;
}

const DEFAULT_PORTFOLIO_ASSETS: AssetItem[] = [
  { id: "stocks", label: "股票", labelEn: "Stocks", color: "#10b981", value: 60 },
  { id: "bonds",  label: "债券", labelEn: "Bonds",  color: "#3b82f6", value: 30 },
  { id: "cash",   label: "现金", labelEn: "Cash",   color: "#f59e0b", value: 10 },
];

const DEFAULT_EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { id: "housing",   label: "住房/租房", labelEn: "Housing",    icon: "🏠", monthlyAmount: 5000 },
  { id: "food",      label: "餐饮",      labelEn: "Food",       icon: "🍜", monthlyAmount: 2500 },
  { id: "transport", label: "交通",      labelEn: "Transport",  icon: "🚇", monthlyAmount: 800  },
  { id: "clothing",  label: "服装首饰",  labelEn: "Clothing",   icon: "👗", monthlyAmount: 1200 },
  { id: "travel",    label: "旅游度假",  labelEn: "Travel",     icon: "✈️", monthlyAmount: 1500 },
  { id: "health",    label: "医疗健康",  labelEn: "Healthcare", icon: "💊", monthlyAmount: 500  },
  { id: "education", label: "教育学习",  labelEn: "Education",  icon: "📚", monthlyAmount: 800  },
  { id: "leisure",   label: "娱乐社交",  labelEn: "Leisure",    icon: "🎮", monthlyAmount: 700  },
  { id: "other",     label: "其他",      labelEn: "Other",      icon: "📦", monthlyAmount: 1000 },
];

const ASSET_COLOR_PALETTE = ["#8b5cf6","#ec4899","#14b8a6","#f97316","#06b6d4","#a3e635"];

export interface FireStoreState {
  age: number;
  netWorth: number;
  annualExpenses: number;
  annualIncome: number;
  fireModel: FireModel;
  portfolioAssets: AssetItem[];
  portfolioInputMode: "percent" | "amount";
  expenseCategories: ExpenseCategory[];
  assumptions: Assumptions;
  locale: "zh" | "en";
  onboardingStep: number;
}

export interface FireStoreActions {
  setAge: (age: number) => void;
  setNetWorth: (netWorth: number) => void;
  setAnnualExpenses: (annualExpenses: number) => void;
  setAnnualIncome: (annualIncome: number) => void;
  setFireModel: (fireModel: FireModel) => void;
  setPortfolioAssets: (assets: AssetItem[]) => void;
  setPortfolioInputMode: (mode: "percent" | "amount") => void;
  addPortfolioAsset: () => void;
  updatePortfolioAsset: (id: string, changes: Partial<AssetItem>) => void;
  removePortfolioAsset: (id: string) => void;
  addExpenseCategory: () => void;
  updateExpenseCategory: (id: string, changes: Partial<ExpenseCategory>) => void;
  removeExpenseCategory: (id: string) => void;
  setAssumptions: (assumptions: Partial<Assumptions>) => void;
  setLocale: (locale: "zh" | "en") => void;
  setOnboardingStep: (step: number) => void;
}

export type FireStore = FireStoreState & FireStoreActions;

const defaultState: FireStoreState = {
  age: 30,
  netWorth: 500000,
  annualExpenses: 150000,
  annualIncome: 300000,
  fireModel: "regular",
  portfolioAssets: DEFAULT_PORTFOLIO_ASSETS,
  portfolioInputMode: "percent",
  expenseCategories: DEFAULT_EXPENSE_CATEGORIES,
  assumptions: {
    nominalReturn: 0.07,
    inflationRate: 0.03,
    swr: 0.04,
  },
  locale: "zh",
  onboardingStep: 0,
};

export const useFireStore = create<FireStore>()(
  persist(
    (set) => ({
      ...defaultState,

      setAge: (age) => set({ age }),
      setNetWorth: (netWorth) => set({ netWorth }),
      setAnnualExpenses: (annualExpenses) => set({ annualExpenses }),
      setAnnualIncome: (annualIncome) => set({ annualIncome }),
      setFireModel: (fireModel) => set({ fireModel }),

      setPortfolioAssets: (assets) => set({ portfolioAssets: assets }),

      setPortfolioInputMode: (mode) => set({ portfolioInputMode: mode }),

      addPortfolioAsset: () =>
        set((state) => {
          const usedColors = new Set(state.portfolioAssets.map((a) => a.color));
          const color =
            ASSET_COLOR_PALETTE.find((c) => !usedColors.has(c)) ??
            ASSET_COLOR_PALETTE[state.portfolioAssets.length % ASSET_COLOR_PALETTE.length];
          const newAsset: AssetItem = {
            id: `asset-${Date.now()}`,
            label: "新资产",
            labelEn: "New Asset",
            color,
            value: 0,
          };
          return { portfolioAssets: [...state.portfolioAssets, newAsset] };
        }),

      updatePortfolioAsset: (id, changes) =>
        set((state) => ({
          portfolioAssets: state.portfolioAssets.map((a) =>
            a.id === id ? { ...a, ...changes } : a
          ),
        })),

      removePortfolioAsset: (id) =>
        set((state) => {
          if (state.portfolioAssets.length <= 1) return state;
          return { portfolioAssets: state.portfolioAssets.filter((a) => a.id !== id) };
        }),

      addExpenseCategory: () =>
        set((state) => {
          const newCat: ExpenseCategory = {
            id: `cat-${Date.now()}`,
            label: "新类别",
            labelEn: "New Category",
            icon: "📝",
            monthlyAmount: 0,
          };
          return { expenseCategories: [...state.expenseCategories, newCat] };
        }),

      updateExpenseCategory: (id, changes) =>
        set((state) => ({
          expenseCategories: state.expenseCategories.map((c) =>
            c.id === id ? { ...c, ...changes } : c
          ),
        })),

      removeExpenseCategory: (id) =>
        set((state) => {
          if (state.expenseCategories.length <= 1) return state;
          return { expenseCategories: state.expenseCategories.filter((c) => c.id !== id) };
        }),

      setAssumptions: (assumptions) =>
        set((state) => ({
          assumptions: {
            ...state.assumptions,
            ...assumptions,
          },
        })),

      setLocale: (locale) => set({ locale }),
      setOnboardingStep: (onboardingStep) => set({ onboardingStep }),
    }),
    {
      name: "fire-calculator-store",
      skipHydration: true,
    }
  )
);

// Derived hook — NOT stored in Zustand, recalculates on every render
export function useFireResult(): FireResult {
  const age = useFireStore((s) => s.age);
  const netWorth = useFireStore((s) => s.netWorth);
  const annualExpenses = useFireStore((s) => s.annualExpenses);
  const annualIncome = useFireStore((s) => s.annualIncome);
  const fireModel = useFireStore((s) => s.fireModel);
  const assumptions = useFireStore((s) => s.assumptions);

  return calculateFire({
    age,
    netWorth,
    annualExpenses,
    annualIncome,
    fireModel,
    assumptions,
  });
}
