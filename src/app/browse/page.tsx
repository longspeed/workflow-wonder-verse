
'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AutomationCard } from '@/components/AutomationCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

interface Automation {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  download_count: number;
  category: string;
  tags: string[];
  image_urls: string[];
  demo_url: string;
  documentation_url: string;
  seller_id: string;
  status: string;
  created_at: string;
  name: string; // Added for compatibility
}

export default function BrowsePage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    rating: '',
    tags: [] as string[],
    search: '',
    sortBy: 'created_at',
    sortOrder: 'desc'
  });

  const { data: automations, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('status', 'published');

      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.price) {
        const maxPrice = parseFloat(filters.price);
        query = query.lte('price', maxPrice);
      }

      if (filters.rating) {
        const minRating = parseFloat(filters.rating);
        query = query.gte('rating', minRating);
      }

      if (filters.tags.length > 0) {
        query = query.contains('tags', filters.tags);
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });

      const { data, error } = await query;
      if (error) throw error;
      
      // Transform products to automation format
      return data?.map(product => ({
        ...product,
        name: product.title, // Map title to name for compatibility
        rating: product.rating || 0,
        download_count: product.download_count || 0
      })) as Automation[];
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Browse Automations</h1>
        <Button
          onClick={() => router.push('/create')}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Automation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <FilterSidebar filters={filters} onFilterChange={setFilters} />
        </div>

        <div className="md:col-span-3">
          {isLoading ? (
            <div className="text-center py-8">Loading automations...</div>
          ) : automations?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">No automations found</p>
              <Button
                onClick={() => router.push('/create')}
                variant="outline"
                className="mt-4"
              >
                Create your first automation
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {automations?.map((automation) => (
                <AutomationCard key={automation.id} automation={automation} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
