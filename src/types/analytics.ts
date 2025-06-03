
export interface DateRange {
  from: Date;
  to: Date;
}

export interface AnalyticsData {
  totalRevenue: number;
  revenueChange: number;
  totalSales: number;
  salesChange: number;
  averageRating: number;
  totalReviews: number;
  activeAutomations: number;
  totalAutomations: number;
  revenueData: Array<{ date: string; revenue: number }>;
  salesData: Array<{ automation: string; sales: number }>;
  ratingData: Array<{ rating: number; value: number }>;
  automationData: Array<{ name: string; revenue: number; sales: number }>;
  insights: Array<{
    title: string;
    description: string;
    type: 'positive' | 'negative' | 'neutral';
    impact: 'high' | 'medium' | 'low';
  }>;
}
