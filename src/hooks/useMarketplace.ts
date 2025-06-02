import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useInView } from 'react-intersection-observer';
import { automationService } from '@/services/supabase';
import type { Automation } from '@/types/automation';

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
  automation_id: string;
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

  // Fetch categories with caching
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await automationService.getCategories();
      if (error) throw error;
      return data;
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
    queryKey: ['automations'],
    queryFn: async ({ pageParam = 0 }) => {
      const { data, error } = await automationService.getAutomations({
        page: pageParam,
        limit: ITEMS_PER_PAGE,
      });
      if (error) throw error;
      return data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < ITEMS_PER_PAGE) return undefined;
      return pages.length;
    },
    staleTime: 60 * 1000, // Cache for 1 minute
  });

  // Load more when reaching the end
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Prefetch next page
  useEffect(() => {
    if (hasNextPage) {
      const nextPage = automationsPages?.pages.length || 0;
      queryClient.prefetchInfiniteQuery({
        queryKey: ['automations'],
        queryFn: async () => {
          const { data, error } = await automationService.getAutomations({
            page: nextPage,
            limit: ITEMS_PER_PAGE,
          });
          if (error) throw error;
          return data;
        },
      });
    }
  }, [hasNextPage, automationsPages?.pages.length, queryClient]);

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
          automation:automations(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as any[];
    },
    enabled: !!supabase.auth.getUser(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
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
        .from('automations')
        .select('*')
        .eq('id', automationId)
        .single();

      if (automationError) throw automationError;
      if (!automation) throw new Error('Automation not found');

      const { data, error } = await supabase
        .from('user_purchases')
        .insert({
          user_id: user.id,
          automation_id: automationId,
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
          user_id: (await supabase.auth.getUser()).data.user?.id,
          automation_id: automationId,
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
    automations: automationsPages?.pages.flat() || [],
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
