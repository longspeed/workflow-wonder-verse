import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Star, Eye, Download, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import AutomationDetailsModal from '@/components/browse/AutomationDetailsModal';
import type { Database } from '@/integrations/supabase/types';
import { LoadingState, RealTimeUpdateIndicator } from '@/components/ui/loading-state';
import { RealTimeUpdateToast } from '@/components/ui/real-time-toast';
import { useEnhancedData } from '@/hooks/useEnhancedData';
import { ConnectionStatusBadge } from '@/components/ui/connection-status';
import { AutomationCard } from '@/components/AutomationCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { SearchBar } from '@/components/SearchBar';
import { Automation, AutomationFilters, AutomationWithProfiles } from '@/types/automation';

const Browse = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<AutomationFilters>({
    category: '',
    price: '',
    rating: ''
  });
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);

  const { data, isLoading, error, connectionStatus, isConnected } = useEnhancedData<Automation[]>({
    queryKey: ['automations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map((item: AutomationWithProfiles) => {
        const profiles = item.profiles && typeof item.profiles === 'object' && !('error' in item.profiles)
          ? item.profiles
          : undefined;

        return {
          id: item.id,
          name: item.name || '',
          description: item.description || '',
          category: item.category || '',
          price: item.price || 0,
          rating: item.rating,
          download_count: item.download_count,
          currency: item.currency || 'USD',
          tags: item.tags || [],
          image_urls: item.image_urls || [],
          demo_url: item.demo_url || '',
          documentation_url: item.documentation_url || '',
          created_at: item.created_at || new Date().toISOString(),
          updated_at: item.updated_at || new Date().toISOString(),
          featured: item.featured || false,
          status: item.status || 'draft',
          seller_id: item.seller_id || '',
          profiles
        };
      });
    },
    realTimeChannel: 'products',
    onRealtimeUpdate: (newData) => {
      console.log('Real-time update received:', newData);
      RealTimeUpdateToast.updateReceived();
    },
    options: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true
    }
  });

  const filteredData = data?.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesPrice = !filters.price || item.price <= parseFloat(filters.price);
    const matchesRating = !filters.rating || (item.rating || 0) >= parseFloat(filters.rating);
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  const handlePurchase = async (automation: Automation) => {
    if (!user) {
      toast.error('Please log in to purchase automations');
      return;
    }

    if (automation.price === 0) {
      // Free automation - just add to user's library
      try {
        const { error } = await supabase
          .from('user_purchases')
          .insert({
            user_id: user.id,
            product_id: automation.id,
            purchase_price: 0,
            purchase_date: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (error) throw error;

        // Update download count
        await supabase
          .from('products')
          .update({ download_count: (automation.download_count || 0) + 1 })
          .eq('id', automation.id);

        toast.success('Free automation added to your library!');
      } catch (error) {
        console.error('Error adding free automation:', error);
        toast.error('Failed to add automation to library');
      }
    } else {
      // Paid automation - would implement Stripe checkout here
      toast.info('Paid checkout coming soon! This would redirect to Stripe.');
    }
  };

  const categories = ['all', 'Productivity', 'CRM', 'Marketing', 'Analytics', 'E-commerce', 'Social Media'];

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Automations</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Browse Automations</h1>
            <div className="flex items-center space-x-4">
              <ConnectionStatusBadge status={connectionStatus} />
              <RealTimeUpdateIndicator lastUpdated={new Date()} isUpdating={isLoading} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          <div className="lg:w-3/4">
            <div className="mb-6">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {isLoading ? (
              <LoadingState message="Loading automations..." />
            ) : filteredData?.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No automations found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData?.map((automation) => (
                  <AutomationCard
                    key={automation.id}
                    automation={automation}
                    isConnected={isConnected}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Automation Details Modal */}
      {selectedAutomation && (
        <AutomationDetailsModal
          automation={selectedAutomation}
          isOpen={!!selectedAutomation}
          onClose={() => setSelectedAutomation(null)}
          onPurchase={handlePurchase}
        />
      )}
    </div>
  );
};

export default Browse;
