
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import SearchBar from '@/components/marketplace/SearchBar';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { automationService } from '@/services/supabase';
import { useMarketplace } from '@/hooks/useMarketplace';
import type { AutomationFilters } from '@/types/automation';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

interface ExtendedProduct extends Product {
  name?: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
  };
}

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filters: AutomationFilters = {
    search: searchTerm,
    category: selectedCategory,
    sortBy,
    sortOrder: 'desc',
    price: '',
    rating: '',
    tags: []
  };

  // Fetch automations with filters
  const { data: automations, isLoading, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['automations', filters],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await automationService.getAutomations();
      const items = data || [];
      const filteredItems = items.filter((item: Product) => {
        if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        if (selectedCategory && item.category !== selectedCategory) {
          return false;
        }
        return true;
      });
      
      return {
        items: filteredItems,
        nextPage: pageParam + 1,
        hasMore: false
      };
    },
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 0
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await automationService.getAutomations();
      const uniqueCategories = Array.from(new Set(data?.map((item: Product) => item.category) || []));
      return uniqueCategories;
    }
  });

  const allAutomations = useMemo(() => {
    return automations?.pages.flatMap(page => page.items) || [];
  }, [automations]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-200 rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Automations</h1>
          <p className="text-gray-600">Discover powerful automation tools to streamline your workflow</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search automations..."
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="latest">Latest</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <List /> : <Grid />}
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {allAutomations.length} automation{allAutomations.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Automation Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {allAutomations.map((automation: ExtendedProduct) => (
              <motion.div
                key={automation.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="p-0">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <OptimizedImage
                        src={automation.image_urls?.[0] || '/placeholder.png'}
                        alt={automation.title}
                        width={400}
                        height={225}
                        quality={80}
                        className="object-cover w-full h-full"
                        placeholder="blur"
                      />
                      {automation.featured && (
                        <Badge className="absolute top-2 left-2 bg-yellow-500">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-2">{automation.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{automation.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{automation.category}</Badge>
                        <div className="text-lg font-bold text-primary">
                          ${automation.price.toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <span>⭐</span>
                          <span>{automation.rating?.toFixed(1) || '0.0'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📥</span>
                          <span>{automation.download_count}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {hasNextPage && (
            <div className="text-center">
              <Button onClick={() => fetchNextPage()} variant="outline">
                Load More
              </Button>
            </div>
          )}

          {allAutomations.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500">No automations found matching your criteria.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
