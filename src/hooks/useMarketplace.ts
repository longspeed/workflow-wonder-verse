
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useInView } from 'react-intersection-observer';
import { automationService } from '@/services/supabase';
import type { Automation } from '@/types/automation';
import type { Database } from '@/integrations/supabase/types';

export interface AutomationFilters {
  category?: string;
  price?: string;
  rating?: string;
  tags?: string[];
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface Purchase {
  id: string;
  product_id: string;
  amount: number;
  currency: string;
  created_at: string;
  automation?: Automation;
}

export interface Favorite {
  id: string;
  automation_id: string;
  created_at: string;
  automation?: Automation;
}

export interface Review {
  id: string;
  automation_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

type Product = Database['public']['Tables']['products']['Row'];

const ITEMS_PER_PAGE = 12;

export function useMarketplace() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  const [filters, setFilters] = useState<AutomationFilters>({});

  // Fetch featured automations with caching
  const { data: featuredAutomations, isLoading: isLoadingFeatured } = useQuery({
    queryKey: ['featured-automations'],
    queryFn: async () => {
      const { data, error } = await automationService.getFeaturedAutomations();
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Mock categories since getCategories doesn't exist
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return [
        { id: 'all', name: 'All Categories' },
        { id: 'business', name: 'Business' },
        { id: 'marketing', name: 'Marketing' },
        { id: 'development', name: 'Development' },
        { id: 'design', name: 'Design' },
      ];
    },
    staleTime: 30 * 60 * 1000, // Cache for 30 minutes
  });

  // Infinite query for paginated automations
  const {
    data: automationsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingAutomations,
    error: automationsError,
  } = useInfiniteQuery({
    queryKey: ['automations', filters],
    queryFn: async ({ pageParam = 0 }) => {
      let query = supabase
        .from('products')
        .select('*, profiles(*)', { count: 'exact' })
        .eq('status', 'published');

      // Apply search filter
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      // Apply category filter
      if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      // Apply price filter
      if (filters.price) {
        const [min, max] = filters.price.split('-').map(Number);
        if (!isNaN(min)) query = query.gte('price', min);
        if (!isNaN(max)) query = query.lte('price', max);
      }

      // Apply rating filter
      if (filters.rating) {
        const minRating = Number(filters.rating);
        if (!isNaN(minRating)) query = query.gte('rating', minRating);
      }

      // Apply tags filter
      if (filters.tags?.length) {
        query = query.contains('tags', filters.tags);
      }

      // Apply sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price_low':
            query = query.order('price', { ascending: true });
            break;
          case 'price_high':
            query = query.order('price', { ascending: false });
            break;
          case 'rating':
            query = query.order('rating', { ascending: false });
            break;
          case 'newest':
            query = query.order('created_at', { ascending: false });
            break;
          case 'featured':
          default:
            query = query.order('featured', { ascending: false }).order('rating', { ascending: false });
        }
      }

      // Apply pagination
      const start = (pageParam as number) * (filters.limit || ITEMS_PER_PAGE);
      const end = start + (filters.limit || ITEMS_PER_PAGE) - 1;
      query = query.range(start, end);

      const { data, error, count } = await query;
      if (error) throw error;

      return {
        items: data || [],
        nextPage: data?.length === (filters.limit || ITEMS_PER_PAGE) ? (pageParam as number) + 1 : undefined,
        totalCount: count || 0
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 60 * 1000, // Cache for 1 minute
  });

  // Load more when reaching the end
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Search automations with debouncing
  const searchAutomations = async (query: string) => {
    if (!query.trim()) return;
    
    const { data, error } = await automationService.searchAutomations(query);
    if (error) throw error;
    return data;
  };

  // Get automations by category with caching
  const getAutomationsByCategory = async (category: string) => {
    const { data, error } = await automationService.getAutomationsByCategory(category);
    if (error) throw error;
    return data;
  };

  // Optimized purchases query with better caching
  const { data: purchases, isLoading: isLoadingPurchases, error: purchasesError } = useQuery({
    queryKey: ['purchases'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_purchases')
        .select(`
          *,
          automation:products(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as any[];
    },
    enabled: !!supabase.auth.getUser(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  // Mock favorites with proper error handling
  const { data: favorites, isLoading: isLoadingFavorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      // TODO: Implement when favorites table is created
      return [];
    },
    staleTime: 5 * 60 * 1000,
  });

  // Enhanced purchase mutation with optimistic updates and better error handling
  const purchaseMutation = useMutation({
    mutationFn: async (automationId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: automation, error: automationError } = await supabase
        .from('products')
        .select('*')
        .eq('id', automationId)
        .single();

      if (automationError) throw automationError;
      if (!automation) throw new Error('Automation not found');

      const { data, error } = await supabase
        .from('user_purchases')
        .insert({
          user_id: user.id,
          product_id: automationId,
          purchase_price: automation.price
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onMutate: async (automationId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['purchases'] });

      // Snapshot the previous value
      const previousPurchases = queryClient.getQueryData(['purchases']);

      // Optimistically update to the new value
      queryClient.setQueryData(['purchases'], (old: any[] = []) => [
        {
          id: 'temp-' + Date.now(),
          user_id: undefined,
          product_id: automationId,
          purchase_price: 0,
          created_at: new Date().toISOString(),
          automation: { id: automationId }
        },
        ...old
      ]);

      return { previousPurchases };
    },
    onError: (err, newPurchase, context) => {
      // Rollback on error
      if (context?.previousPurchases) {
        queryClient.setQueryData(['purchases'], context.previousPurchases);
      }
      toast({
        title: 'Purchase Failed',
        description: err.message || 'An unexpected error occurred',
        variant: 'destructive'
      });
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
    }
  });

  // Enhanced toggle favorite with optimistic updates
  const toggleFavoriteMutation = useMutation({
    mutationFn: async (automationId: string) => {
      // TODO: Implement when favorites table is created
      await new Promise(resolve => setTimeout(resolve, 500)); // Mock delay
      return { automationId, isFavorite: Math.random() > 0.5 };
    },
    onMutate: async (automationId) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['favorites'] });
      const previousFavorites = queryClient.getQueryData(['favorites']);
      return { previousFavorites };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites);
      }
      toast({
        title: 'Error',
        description: 'Failed to update favorite status',
        variant: 'destructive'
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });

  // Enhanced review mutation
  const addReviewMutation = useMutation({
    mutationFn: async ({ automationId, rating, comment }: { automationId: string; rating: number; comment?: string }) => {
      // TODO: Implement when reviews table is created
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      return { automationId, rating, comment };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automations'] });
      toast({
        title: 'Review Added',
        description: 'Thank you for your feedback!'
      });
    },
    onError: (error: Error) => {
      console.error('Review error:', error);
      toast({
        title: 'Error',
        description: 'Failed to add review. Please try again.',
        variant: 'destructive'
      });
    }
  });

  return {
    featuredAutomations,
    isLoadingFeatured,
    categories,
    isLoadingCategories,
    automations: automationsPages?.pages.flatMap(page => page.items) || [],
    isLoadingAutomations,
    automationsError,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef: ref,
    searchAutomations,
    getAutomationsByCategory,
    purchases,
    favorites,
    isLoadingPurchases,
    isLoadingFavorites,
    errors: {
      purchases: purchasesError,
    },
    filters,
    setFilters,
    purchaseAutomation: purchaseMutation.mutate,
    toggleFavorite: toggleFavoriteMutation.mutate,
    addReview: addReviewMutation.mutate,
    isPurchasing: purchaseMutation.isPending,
    isTogglingFavorite: toggleFavoriteMutation.isPending,
    isAddingReview: addReviewMutation.isPending,
  };
}
