import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { cn } from '@/lib/utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface DateRange {
  from: Date;
  to: Date;
}

interface SellerAnalyticsProps {
  sellerId: string;
}

export function SellerAnalytics({ sellerId }: SellerAnalyticsProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [timeframe, setTimeframe] = useState('30d');

  // Mock analytics data since the service doesn't exist yet
  const analytics = {
    totalRevenue: 12500.50,
    revenueChange: 15.2,
    totalSales: 85,
    salesChange: 8.3,
    averageRating: 4.7,
    totalReviews: 156,
    activeAutomations: 12,
    totalAutomations: 15,
    revenueData: [
      { date: '2024-01-01', revenue: 1200 },
      { date: '2024-01-02', revenue: 1400 },
      { date: '2024-01-03', revenue: 1100 },
    ],
    salesData: [
      { automation: 'Automation 1', sales: 25 },
      { automation: 'Automation 2', sales: 35 },
      { automation: 'Automation 3', sales: 15 },
    ],
    ratingData: [
      { rating: '5 stars', value: 65 },
      { rating: '4 stars', value: 25 },
      { rating: '3 stars', value: 8 },
      { rating: '2 stars', value: 2 },
    ],
    automationData: [
      { name: 'Automation 1', revenue: 3500, sales: 25 },
      { name: 'Automation 2', revenue: 4200, sales: 35 },
      { name: 'Automation 3', revenue: 2100, sales: 15 },
    ],
    insights: [
      {
        title: 'Top Performing Category',
        description: 'AI & Automation category generates 60% of your revenue',
      },
      {
        title: 'Growth Opportunity',
        description: 'Consider adding more workflow automation products',
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
        <div className="flex items-center gap-4">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">${analytics.totalRevenue.toFixed(2)}</p>
          <p className={cn(
            'text-sm mt-2',
            analytics.revenueChange > 0 ? 'text-green-500' : 'text-red-500'
          )}>
            {analytics.revenueChange > 0 ? '+' : ''}{analytics.revenueChange}% from previous period
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
          <p className="text-2xl font-bold mt-2">{analytics.totalSales}</p>
          <p className={cn(
            'text-sm mt-2',
            analytics.salesChange > 0 ? 'text-green-500' : 'text-red-500'
          )}>
            {analytics.salesChange > 0 ? '+' : ''}{analytics.salesChange}% from previous period
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
          <p className="text-2xl font-bold mt-2">{analytics.averageRating.toFixed(1)}</p>
          <p className="text-sm text-gray-500 mt-2">Based on {analytics.totalReviews} reviews</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Automations</h3>
          <p className="text-2xl font-bold mt-2">{analytics.activeAutomations}</p>
          <p className="text-sm text-gray-500 mt-2">Out of {analytics.totalAutomations} total</p>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="ratings">Ratings</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue Over Time</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Sales Distribution</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="automation" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="ratings" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.ratingData}
                    dataKey="value"
                    nameKey="rating"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label
                  >
                    {analytics.ratingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="automations" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Automation Performance</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.automationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="Revenue" />
                  <Bar yAxisId="right" dataKey="sales" fill="#82ca9d" name="Sales" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analytics.insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <h4 className="font-medium mb-2">{insight.title}</h4>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
