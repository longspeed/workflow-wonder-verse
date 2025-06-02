
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { LoadingState } from '@/components/ui/loading-state';
import { RealTimeUpdateIndicator } from '@/components/ui/loading-state';
import { ConnectionStatusBadge } from '@/components/ui/connection-status';

interface Automation {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  download_count: number;
  category: string;
  status: string;
  created_at: string;
}

type AutomationStatus = 'draft' | 'published' | 'archived';

export default function SellerDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<AutomationStatus>('published');

  // Fetch seller's automations from products table
  const { data: automations, isLoading } = useQuery({
    queryKey: ['seller-automations', selectedStatus],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', selectedStatus)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Automation[];
    }
  });

  // Fetch sales analytics from user_purchases
  const { data: salesAnalytics } = useQuery({
    queryKey: ['seller-sales'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_purchases')
        .select(`
          *,
          product:products(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const totalSales = data.reduce((sum, purchase) => sum + purchase.purchase_price, 0);
      const salesByMonth = data.reduce((acc, purchase) => {
        const month = new Date(purchase.created_at).toLocaleString('default', { month: 'long' });
        acc[month] = (acc[month] || 0) + purchase.purchase_price;
        return acc;
      }, {} as Record<string, number>);

      return {
        totalSales,
        salesByMonth,
        recentSales: data.slice(0, 5)
      };
    }
  });

  // Update automation status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ automationId, status }: { automationId: string; status: AutomationStatus }) => {
      const { data, error } = await supabase
        .from('products')
        .update({ status })
        .eq('id', automationId)
        .select()
        .single();

      if (error) throw error;
      return data as Automation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-automations'] });
      toast({
        title: 'Status Updated',
        description: 'The automation status has been updated successfully.'
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  if (isLoading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
            <div className="flex items-center space-x-4">
              <ConnectionStatusBadge status="connected" />
              <RealTimeUpdateIndicator lastUpdated={new Date()} isUpdating={isLoading} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${salesAnalytics?.totalSales?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sales by Month</p>
                  <div className="mt-2 space-y-2">
                    {Object.entries(salesAnalytics?.salesByMonth || {}).map(([month, amount]) => (
                      <div key={month} className="flex justify-between">
                        <span className="text-sm text-gray-600">{month}</span>
                        <span className="text-sm font-medium text-gray-900">${amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Automations List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Your Automations</h2>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as AutomationStatus)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {automations?.map((automation) => (
                  <div key={automation.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{automation.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{automation.description}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-900">
                          ${automation.price}
                        </span>
                        <select
                          value={automation.status}
                          onChange={(e) => updateStatusMutation.mutate({
                            automationId: automation.id,
                            status: e.target.value as AutomationStatus
                          })}
                          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                      <span>Downloads: {automation.download_count}</span>
                      <span>Rating: {automation.rating.toFixed(1)}</span>
                      <span>Created: {new Date(automation.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                {automations?.length === 0 && (
                  <div className="p-6 text-center text-gray-500">
                    No automations found for status: {selectedStatus}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
