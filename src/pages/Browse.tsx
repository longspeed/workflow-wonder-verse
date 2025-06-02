import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Download, User, Search, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingState } from '@/components/ui/loading-state';
import { AutomationCard } from '@/components/marketplace/AutomationCard';
import { SearchBar } from '@/components/marketplace/SearchBar';
import { CategoryFilter } from '@/components/marketplace/CategoryFilter';
import { SortFilter } from '@/components/marketplace/SortFilter';
import { PriceRangeFilter } from '@/components/marketplace/PriceRangeFilter';
import { RatingFilter } from '@/components/marketplace/RatingFilter';
import { TagsFilter } from '@/components/marketplace/TagsFilter';
import { SavedFilters } from '@/components/marketplace/SavedFilters';
import { useInView } from 'react-intersection-observer';
import { useMarketplace } from '@/hooks/useMarketplace';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<string>('0-1000');
  const [minRating, setMinRating] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

  const {
    automations,
    isLoadingAutomations,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
    filters,
    setFilters,
  } = useMarketplace();

  // Update filters when any filter value changes
  useEffect(() => {
    setFilters({
      ...filters,
      search: searchTerm,
      category: selectedCategory,
      sortBy: sortBy,
      price: priceRange,
      rating: minRating,
      tags: selectedTags,
    });
  }, [searchTerm, selectedCategory, sortBy, priceRange, minRating, selectedTags, setFilters]);

  // Setup virtualizer
  const rowVirtualizer = useVirtualizer({
    count: automations.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 200, []),
    overscan: 5,
  });

  const handlePurchase = async (automation: any) => {
    try {
      // Add purchase logic here
      toast({
        title: 'Purchase Successful',
        description: `You have successfully purchased ${automation.name}!`
      });
    } catch (error) {
      toast({
        title: 'Purchase Failed',
        description: 'There was an error processing your purchase.',
        variant: 'destructive'
      });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('featured');
    setPriceRange('0-1000');
    setMinRating('');
    setSelectedTags([]);
  };

  const applySavedFilters = (savedFilters: any) => {
    if (savedFilters.search) setSearchTerm(savedFilters.search);
    if (savedFilters.category) setSelectedCategory(savedFilters.category);
    if (savedFilters.sortBy) setSortBy(savedFilters.sortBy);
    if (savedFilters.price) setPriceRange(savedFilters.price);
    if (savedFilters.rating) setMinRating(savedFilters.rating);
    if (savedFilters.tags) setSelectedTags(savedFilters.tags);
  };

  if (isLoadingAutomations) {
    return <LoadingState message="Loading automations..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="whitespace-nowrap"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Categories</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
              <CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Price & Rating</h3>
              <PriceRangeFilter value={priceRange} onChange={setPriceRange} />
              <RatingFilter value={minRating} onChange={setMinRating} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tags & Sort</h3>
              <TagsFilter value={selectedTags} onChange={setSelectedTags} />
              <SortFilter value={sortBy} onChange={setSortBy} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Saved Filters</h3>
              <SavedFilters
                currentFilters={{
                  search: searchTerm,
                  category: selectedCategory,
                  sortBy,
                  price: priceRange,
                  rating: minRating,
                  tags: selectedTags,
                }}
                onApplyFilters={applySavedFilters}
              />
            </div>
          </div>
        )}
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
            const automation = automations[virtualRow.index];
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
                <AutomationCard automation={automation} onPurchase={handlePurchase} />
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
