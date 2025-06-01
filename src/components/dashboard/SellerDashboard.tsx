import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Zap, Star, MessageSquare, Plus, Edit, Users, TrendingUp, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAccountData } from '@/hooks/useAccountData';
import AddAutomationModal from './AddAutomationModal';
import { toast } from '@/components/ui/use-toast';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'] & {
  sales_count?: number;
};

const SellerDashboard = () => {
  const { user } = useAuth();
  const { profile, products, loading, error, refresh } = useAccountData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await refresh();
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Auto-refresh failed:', error);
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [refresh]);

  const handleRefresh = async () => {
    try {
      await refresh();
      setLastUpdate(new Date());
      toast({
        title: "Data refreshed",
        description: "Your dashboard data has been updated.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Failed to refresh dashboard data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const publishedProducts = products.filter(product => product.status === 'published');

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${publishedProducts.reduce((sum, p) => sum + (p.price || 0), 0).toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Active Listings',
      value: publishedProducts.length.toString(),
      change: `${publishedProducts.filter(p => p.status === 'published').length} published`,
      icon: Zap,
      color: 'text-blue-600',
    },
    {
      title: 'Average Rating',
      value: publishedProducts.length > 0 
        ? (publishedProducts.reduce((sum, p) => sum + (p.rating || 0), 0) / publishedProducts.length).toFixed(1)
        : '0.0',
      change: `${publishedProducts.length} products`,
      icon: Star,
      color: 'text-yellow-600',
    },
    {
      title: 'Total Sales',
      value: publishedProducts.reduce((sum, p) => sum + ((p as Product).sales_count || 0), 0).toString(),
      change: '+18 today',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
  ];

  const topAutomations = publishedProducts
    .sort((a, b) => ((b as Product).sales_count || 0) - ((a as Product).sales_count || 0))
    .slice(0, 3)
    .map(product => ({
      name: product.title,
      sales: (product as Product).sales_count || 0,
      revenue: `$${(product.price || 0) * ((product as Product).sales_count || 0)}`,
      rating: product.rating || 0,
    }));

  if (loading) {
    return (
      <LoadingState 
        message="Loading your dashboard data..."
        subMessage="This may take a few moments"
      />
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Error loading dashboard data"
        error={error}
        onRetry={handleRefresh}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-yellow-900 mb-2">
            Welcome back, {profile?.full_name || user?.user_metadata?.full_name || 'Seller'}!
          </h1>
          <p className="text-yellow-700">
            Here's what's happening with your automations today.
            <span className="text-sm text-yellow-600 ml-2">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-700">{stat.title}</p>
                    <p className="text-2xl font-bold text-yellow-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color} font-medium`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-yellow-100`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Top Automations */}
      <Card className="bg-white border-yellow-200 mb-8">
        <CardHeader>
          <CardTitle className="text-yellow-900">Top Performing Automations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topAutomations.map((automation, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-yellow-900">{automation.name}</h3>
                  <p className="text-sm text-yellow-700">{automation.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-yellow-900">{automation.revenue}</p>
                  <p className="text-sm text-yellow-700">Rating: {automation.rating.toFixed(1)}</p>
                </div>
              </div>
            ))}
            {topAutomations.length === 0 && (
              <div className="text-center py-8 text-yellow-700">
                <p>No automations yet. Start by adding your first automation!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add New Automation Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Automation
        </Button>
      </div>

      <AddAutomationModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />
    </div>
  );
};

export default SellerDashboard;
