import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Settings, Bell, HelpCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SellerAnalytics } from '@/components/analytics/SellerAnalytics';
import { useAuth } from '@/hooks/useAuth';
import { automationService } from '@/services/supabase';
import { cn } from '@/lib/utils';

export default function SellerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch seller's automations
  const { data: automations, isLoading: isLoadingAutomations, isError: isErrorAutomations, error: automationsError } = useQuery({
    queryKey: ['seller-automations', user?.id],
    queryFn: () => automationService.getSellerAutomations(user!.id),
    enabled: !!user,
  });

  // Fetch recent sales
  const { data: recentSales, isLoading: isLoadingSales, isError: isErrorSales, error: salesError } = useQuery({
    queryKey: ['recent-sales', user?.id],
    queryFn: () => automationService.getRecentSales(user!.id),
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to access the seller dashboard</h1>
          <Button onClick={() => window.location.href = '/login'}>Sign In</Button>
        </div>
      </div>
    );
  }

  const isLoading = isLoadingAutomations || isLoadingSales;
  const isError = isErrorAutomations || isErrorSales;
  const errorMessage = automationsError?.message || salesError?.message || 'An unknown error occurred.';

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading dashboard data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-red-600">
        <AlertCircle className="h-12 w-12 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error loading dashboard data</h2>
        <p className="text-muted-foreground mb-4">{errorMessage}</p>
        {/* Optionally add a retry button if the error is temporary */}
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Seller Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user.full_name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <HelpCircle className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button>
              <Plus className="w-5 h-5 mr-2" />
              New Automation
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="automations">Automations</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <p className="text-2xl font-bold mt-2">
                  ${automations?.reduce((sum, a) => sum + a.price, 0).toFixed(2)}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-sm font-medium text-gray-500">Active Automations</h3>
                <p className="text-2xl font-bold mt-2">
                  {automations?.filter(a => a.status === 'active').length}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
                <p className="text-2xl font-bold mt-2">
                  {recentSales?.length}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
                <p className="text-2xl font-bold mt-2">
                  {/* TODO: Calculate average rating based on actual reviews */}
                  {/* For now, using a placeholder or potentially calculating from available data */}
                  {/* Example placeholder: 'N/A' */}
                   0
                </p>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentSales?.slice(0, 5).map((sale, index) => (
                  <motion.div
                    key={sale.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{sale.automation.name}</p>
                      <p className="text-sm text-gray-600">
                        Sold on {new Date(sale.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${sale.purchase_price.toFixed(2)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
               {recentSales?.length === 0 && (
                <p className="text-center text-gray-500">No recent sales yet.</p>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <SellerAnalytics sellerId={user.id} />
          </TabsContent>

          <TabsContent value="automations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Automations</h2>
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                New Automation
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {automations?.map((automation, index) => (
                <motion.div
                  key={automation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* TODO: Replace with optimized AutomationCard */}
                   <Card className="p-6">
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img
                        src={automation.image_urls?.[0] || '/placeholder.png'}
                        alt={automation.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold mb-2">{automation.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {automation.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          ${automation.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {/* TODO: Display actual sales count */}
                           {automation.download_count || 0} sales
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
               {automations?.length === 0 && (
                <p className="text-center text-gray-500 col-span-full">You haven't created any automations yet.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Sales History</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Automation</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-right py-3 px-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSales?.map((sale) => (
                      <tr key={sale.id} className="border-b">
                        <td className="py-3 px-4">{sale.automation.name}</td>
                        <td className="py-3 px-4">
                          {new Date(sale.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          ${sale.purchase_price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                     {recentSales?.length === 0 && (
                      <tr>
                        <td colSpan={3} className="text-center py-4 text-gray-500">No sales history yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
