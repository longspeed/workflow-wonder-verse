
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { LoadingState } from '@/components/ui/loading-state';
import { RealTimeUpdateIndicator } from '@/components/ui/loading-state';
import { ConnectionStatusBadge } from '@/components/ui/connection-status';

interface Purchase {
  id: string;
  user_id: string;
  product_id: string;
  purchase_price: number;
  purchase_date: string;
  created_at: string;
  product?: {
    id: string;
    title: string;
    description: string;
    demo_url: string;
    price: number;
  };
}

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState<'purchases' | 'favorites'>('purchases');

  // Fetch user's purchases
  const { data: purchases, isLoading: isLoadingPurchases } = useQuery({
    queryKey: ['user-purchases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_purchases')
        .select(`
          *,
          product:products(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Purchase[];
    }
  });

  // Mock favorites since table doesn't exist
  const { data: favorites, isLoading: isLoadingFavorites } = useQuery({
    queryKey: ['user-favorites'],
    queryFn: async () => {
      return [];
    }
  });

  if (isLoadingPurchases || isLoadingFavorites) {
    return <LoadingState message="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <div className="flex items-center space-x-4">
              <ConnectionStatusBadge status="connected" />
              <RealTimeUpdateIndicator lastUpdated={new Date()} isUpdating={isLoadingPurchases || isLoadingFavorites} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('purchases')}
                className={`${
                  activeTab === 'purchases'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                My Purchases
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`${
                  activeTab === 'favorites'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                My Favorites
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'purchases' ? (
              <div className="space-y-6">
                {purchases?.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {purchase.product?.title || 'Product'}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Purchased on {new Date(purchase.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-900">
                        ${purchase.purchase_price}
                      </span>
                      {purchase.product?.demo_url && (
                        <button
                          onClick={() => window.open(purchase.product?.demo_url, '_blank')}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          View Demo
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {purchases?.length === 0 && (
                  <p className="text-center text-gray-500">No purchases yet.</p>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {favorites?.length === 0 && (
                  <p className="text-center text-gray-500">No favorites yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
