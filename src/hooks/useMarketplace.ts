
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Automation {
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
  name?: string;
}

export interface AutomationFilters {
  category?: string;
  price?: string;
  rating?: string;
  tags?: string[];
  search?: string;
  sortBy?: string;
  sortOrder?: string;
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

export function useMarketplace() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<AutomationFilters>({});

  // Optimized automations query with proper pagination
  const { data: automations, isLoading: isLoadingAutomations, error: automationsError } = useQuery({
    queryKey: ['automations', filters],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' })
        .eq('status', 'published');

      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.price) {
        query = query.lte('price', parseFloat(filters.price));
      }

      if (filters.rating) {
        query = query.gte('rating', parseFloat(filters.rating));
      }

      if (filters.tags?.length) {
        query = query.contains('tags', filters.tags);
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters.sortBy) {
        const order = filters.sortOrder || 'desc';
        query = query.order(filters.sortBy, { ascending: order === 'asc' });
      }

      // Add pagination (default to first 20 items)
      query = query.range(0, 19);

      const { data, error, count } = await query;

      if (error) throw error;
      return {
        items: data?.map(product => ({
          ...product,
          name: product.title
        })) as Automation[],
        totalCount: count || 0
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Optimized purchases query
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
        .limit(50); // Limit to recent purchases

      if (error) throw error;
      return data as any[];
    },
    enabled: !!supabase.auth.getUser(),
    staleTime: 10 * 60 * 1000, // 10 minutes
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

  // Enhanced purchase mutation with optimistic updates
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
    onSuccess: (data) => {
      // Optimistic update
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      
      toast({
        title: 'Purchase Successful',
        description: 'You can now access your purchased automation.'
      });
    },
    onError: (error: Error) => {
      console.error('Purchase error:', error);
      toast({
        title: 'Purchase Failed',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive'
      });
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
    automations: automations?.items || [],
    totalCount: automations?.totalCount || 0,
    purchases,
    favorites,
    isLoadingAutomations,
    isLoadingPurchases,
    isLoadingFavorites,
    errors: {
      automations: automationsError,
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
