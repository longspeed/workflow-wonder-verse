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
  revenueData: RevenueDataPoint[];
  salesData: SalesDataPoint[];
  ratingData: RatingDataPoint[];
  automationData: AutomationDataPoint[];
  insights: Insight[];
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
}

export interface SalesDataPoint {
  automation: string;
  sales: number;
}

export interface RatingDataPoint {
  rating: number;
  value: number;
}

export interface AutomationDataPoint {
  name: string;
  revenue: number;
  sales: number;
}

export interface Insight {
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
  impact: 'high' | 'medium' | 'low';
} 