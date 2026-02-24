// Call history tracking and statistics

export interface CallRecord {
  id: string;
  timestamp: string;
  prospectInfo: {
    name: string;
    company: string;
    email: string;
  };
  outcome: 'qualified' | 'disqualified' | 'in-progress';
  finalStep: string;
  answers: Record<string, string>;
  fullTranscript?: string;
  mirrorTexts?: Record<string, string>; // stepId -> mirror text generated
  costAnalysis?: {
    hoursSearching: number;
    missedShotsPerMonth: number;
    costPerVideo: number;
    monthlyFollowerGoal: number;
    researchWaste: number;
    productionWaste: number;
    totalAnnualWaste: number;
  };
  /** @deprecated old cost model — kept for backward compat with saved history */
  legacyCostAnalysis?: {
    editors: number;
    hoursPerWeek: number;
    ratePerHour: number;
    annualCost: number;
    monthlyCost: number;
  };
}

const HISTORY_KEY = 'outlier-sales-call-history';

export function saveCallToHistory(record: CallRecord): void {
  try {
    const history = getCallHistory();
    history.unshift(record); // Add to beginning
    // Keep only last 50 calls
    const trimmed = history.slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Failed to save call to history:', error);
  }
}

export function getCallHistory(): CallRecord[] {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load call history:', error);
  }
  return [];
}

export function clearCallHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear call history:', error);
  }
}

export interface CallStats {
  totalCalls: number;
  qualified: number;
  disqualified: number;
  inProgress: number;
  qualificationRate: number;
  averageAnnualCost: number;
  averageMonthlyCost: number;
  totalPotentialRevenue: number;
}

export function calculateStats(history: CallRecord[]): CallStats {
  const totalCalls = history.length;
  const qualified = history.filter(c => c.outcome === 'qualified').length;
  const disqualified = history.filter(c => c.outcome === 'disqualified').length;
  const inProgress = history.filter(c => c.outcome === 'in-progress').length;
  
  const qualificationRate = totalCalls > 0 ? (qualified / totalCalls) * 100 : 0;
  
  const callsWithCosts = history.filter(c => c.costAnalysis || c.legacyCostAnalysis);
  const totalAnnualCost = callsWithCosts.reduce((sum, c) => {
    if (c.costAnalysis) return sum + c.costAnalysis.totalAnnualWaste;
    if (c.legacyCostAnalysis) return sum + c.legacyCostAnalysis.annualCost;
    return sum;
  }, 0);
  const averageAnnualCost = callsWithCosts.length > 0 ? totalAnnualCost / callsWithCosts.length : 0;
  const averageMonthlyCost = averageAnnualCost / 12;
  
  // Assuming your product saves them the full cost (conservative estimate)
  const totalPotentialRevenue = qualified * averageAnnualCost;
  
  return {
    totalCalls,
    qualified,
    disqualified,
    inProgress,
    qualificationRate,
    averageAnnualCost,
    averageMonthlyCost,
    totalPotentialRevenue
  };
}
