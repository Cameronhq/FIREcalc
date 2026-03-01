export type FireModel = "lean" | "regular" | "fat" | "barista";
export type FireStatus = "on_track" | "already_fired" | "negative_savings";

export interface ChartDataPoint {
  year: number;
  age: number;
  netWorth: number;
  fireTarget: number;
}

export interface FireResult {
  yearsToFire: number | null;
  fireAge: number | null;
  fireNumber: number;
  adjustedExpenses: number;
  pmt: number;
  realReturn: number;
  chartData: ChartDataPoint[];
  status: FireStatus;
}

export interface FireInputs {
  age: number;
  netWorth: number;
  annualExpenses: number;
  annualIncome: number;
  fireModel: FireModel;
  assumptions: {
    nominalReturn: number;
    inflationRate: number;
    swr: number;
  };
}

const MODEL_MULTIPLIERS: Record<FireModel, number> = {
  lean: 0.7,
  regular: 1.0,
  fat: 1.5,
  barista: 0.5,
};

export function calculateFire(inputs: FireInputs): FireResult {
  const {
    age,
    netWorth,
    annualExpenses,
    annualIncome,
    fireModel,
    assumptions,
  } = inputs;

  const { nominalReturn, inflationRate, swr } = assumptions;

  // Real return
  const r = (1 + nominalReturn) / (1 + inflationRate) - 1;

  const multiplier = MODEL_MULTIPLIERS[fireModel];
  const adjustedExpenses = annualExpenses * multiplier;
  const fireNumber = adjustedExpenses / swr;
  const pmt = annualIncome - annualExpenses;

  let yearsToFire: number | null = null;
  let status: FireStatus = "on_track";

  // Edge case 1: Already FIRE'd
  if (netWorth >= fireNumber) {
    status = "already_fired";
    yearsToFire = 0;
  } else if (pmt === 0) {
    // No contributions, pure investment growth
    if (r <= 0 || netWorth <= 0) {
      yearsToFire = null;
      status = "negative_savings";
    } else {
      const n = Math.log(fireNumber / netWorth) / Math.log(1 + r);
      yearsToFire = Math.ceil(n);
    }
  } else {
    // pmt !== 0: use NPER formula for both positive AND negative savings.
    // Negative pmt is valid when investment returns on existing net worth
    // outpace the spending deficit (denominator > 0).
    const numerator = fireNumber * r + pmt;
    const denominator = netWorth * r + pmt;

    if (denominator <= 0 || numerator <= 0) {
      // Truly unreachable: portfolio is shrinking and can never reach target
      yearsToFire = null;
      status = "negative_savings";
    } else {
      const n = Math.log(numerator / denominator) / Math.log(1 + r);
      yearsToFire = Math.ceil(n);
    }
  }

  const fireAge =
    yearsToFire !== null ? age + yearsToFire : null;

  // Build chart data: year-by-year, max 60 years, stop 5 years after crossover
  const chartData: ChartDataPoint[] = [];
  let currentNetWorth = netWorth;
  let crossoverYear: number | null = null;

  const maxYears = 60;
  const extraYearsAfterCrossover = 5;

  for (let year = 0; year <= maxYears; year++) {
    chartData.push({
      year,
      age: age + year,
      netWorth: Math.round(currentNetWorth),
      fireTarget: Math.round(fireNumber),
    });

    if (crossoverYear === null && currentNetWorth >= fireNumber) {
      crossoverYear = year;
    }

    if (
      crossoverYear !== null &&
      year >= crossoverYear + extraYearsAfterCrossover
    ) {
      break;
    }

    // Advance one year (investment growth + net savings/spending)
    currentNetWorth = currentNetWorth * (1 + r) + pmt;
  }

  return {
    yearsToFire,
    fireAge,
    fireNumber,
    adjustedExpenses,
    pmt,
    realReturn: r,
    chartData,
    status,
  };
}
