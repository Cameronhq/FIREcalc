export interface AnalysisResult {
  grade: "A" | "B" | "C";
  score: number;
  redFlags: string[];
  redFlagsEn: string[];
  actionSteps: string[];
  actionStepsEn: string[];
  summary: string;
  summaryEn: string;
}

export const mockAnalysisResult: AnalysisResult = {
  grade: "B",
  score: 72,
  redFlags: [
    "储蓄率低于30%，FIRE进程较慢",
    "投资组合股票比例不足，长期增长潜力受限",
    "紧急备用金少于6个月生活费",
  ],
  redFlagsEn: [
    "Savings rate below 30%, slowing FIRE progress",
    "Equity allocation too low, limiting long-term growth",
    "Emergency fund less than 6 months of expenses",
  ],
  actionSteps: [
    "将储蓄率提高至40%以上，每年额外储蓄可缩短2-3年退休时间",
    "将股票配置提高至60-70%，历史年化收益率更接近7%",
    "建立6-12个月的现金应急储备，避免提前动用投资",
    "考虑副业收入，每月额外收入1万元可提前3年实现FIRE",
    "优化税务筹划，利用企业年金和个税递延降低税负",
  ],
  actionStepsEn: [
    "Increase savings rate to 40%+ — each extra 10% cuts 2-3 years off your FIRE date",
    "Raise equity allocation to 60-70% to get closer to the 7% historical average",
    "Build a 6-12 month emergency fund to avoid early portfolio withdrawals",
    "Consider side income — an extra ¥10K/month can bring FIRE 3 years closer",
    "Optimize tax strategy using corporate pensions and deferred tax accounts",
  ],
  summary:
    "您的财务状况总体健康，但储蓄率和资产配置有优化空间。按当前轨迹，预计可在计划时间内实现FIRE目标。",
  summaryEn:
    "Your financial health is generally solid, but savings rate and asset allocation have room for optimization. At the current trajectory, you're on track to reach FIRE within the projected timeline.",
};
