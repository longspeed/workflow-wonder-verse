import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Download, User, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingState } from '@/components/ui/loading-state';
import { AutomationCard } from '@/components/marketplace/AutomationCard';
import { SearchBar } from '@/components/marketplace/SearchBar';
import { CategoryFilter } from '@/components/marketplace/CategoryFilter';
import { SortFilter } from '@/components/marketplace/SortFilter';
import { useInView } from 'react-intersection-observer';

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
  profiles?: {
    full_name: string;
    avatar_url: string;
  } | null;
}

const ITEMS_PER_PAGE = 20;

const Browse = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [page, setPage] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null);
  const { ref: loadMoreRef, inView } = useInView();

  // Fetch automations with pagination
  const { data: automationsData, isLoading: isLoadingAutomations, fetchNextPage, hasNextPage, isFetchingNextPage } = useQuery({
    queryKey: ['automations', searchTerm, selectedCategory, sortBy],
    queryFn: async ({ pageParam = 0 }) => {
      let query = supabase
        .from('automations')
        .select('*', { count: 'exact' })
        .eq('status', 'published');

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      if (sortBy === 'price_low') {
        query = query.order('price', { ascending: true });
      } else if (sortBy === 'price_high') {
        query = query.order('price', { ascending: false });
      } else if (sortBy === 'rating') {
        query = query.order('rating', { ascending: false });
      } else if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else {
        // featured
        query = query.order('featured', { ascending: false }).order('rating', { ascending: false });
      }

      const start = pageParam * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;
      query = query.range(start, end);

      const { data, error, count } = await query;
      if (error) throw error;

      return {
        items: data || [],
        nextPage: data?.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
        totalCount: count || 0
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });

  // Flatten pages for virtualized list
  const allAutomations = automationsData?.pages.flatMap(page => page.items) || [];

  // Setup virtualizer
  const rowVirtualizer = useVirtualizer({
    count: allAutomations.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 200, []), // Estimate card height
    overscan: 5, // Number of items to render outside of the visible area
  });

  // Load more when reaching the end
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Fetch seller profiles
  const { data: profilesData } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      if (error) throw error;
      return data;
    }
  });

  const getSellerProfile = (sellerId: string) => {
    return profilesData?.find(profile => profile.id === sellerId) || null;
  };

  const handlePurchase = async (automation: Automation) => {
    try {
      // Add purchase logic here
      toast({
        title: 'Purchase Successful',
        description: `You have successfully purchased ${automation.title}!`
      });
    } catch (error) {
      toast({
        title: 'Purchase Failed',
        description: 'There was an error processing your purchase.',
        variant: 'destructive'
      });
    }
  };

  const filteredCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'data', label: 'Data Processing' },
    { value: 'social', label: 'Social Media' },
    { value: 'ecommerce', label: 'E-commerce' },
  ];

  if (isLoadingAutomations) {
    return <LoadingState message="Loading automations..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 mb-8">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="flex gap-4">
          <CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
          <SortFilter value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      <div
        ref={parentRef}
        className="h-[calc(100vh-200px)] overflow-auto"
        style={{
          contain: 'strict',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const automation = allAutomations[virtualRow.index];
            const sellerProfile = getSellerProfile(automation.seller_id);
            return (
              <div
                key={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <AutomationCard automation={automation} />
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-yellow-900">
                    ${automation.price.toFixed(2)}
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handlePurchase(automation)}
                    >
                      Purchase
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div ref={loadMoreRef} className="h-4" />
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center mt-4">
          <LoadingState message="Loading more..." />
        </div>
      )}
    </div>
  );
};

export default Browse;
