
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

  // Fetch automations with filters - using 'products' table since that's what exists
  const { data: automations, isLoading: isLoadingAutomations } = useQuery({
    queryKey: ['automations', filters],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
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

      const { data, error } = await query;

      if (error) throw error;
      return data?.map(product => ({
        ...product,
        name: product.title
      })) as Automation[];
    }
  });

  // Fetch user's purchases - using existing user_purchases table
  const { data: purchases, isLoading: isLoadingPurchases } = useQuery({
    queryKey: ['purchases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_purchases')
        .select(`
          *,
          automation:products(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as any[];
    }
  });

  // Mock favorites for now since table doesn't exist
  const { data: favorites, isLoading: isLoadingFavorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      return [];
    }
  });

  // Purchase automation
  const purchaseMutation = useMutation({
    mutationFn: async (automationId: string) => {
      const { data: automation, error: automationError } = await supabase
        .from('products')
        .select('*')
        .eq('id', automationId)
        .single();

      if (automationError) throw automationError;

      const { data, error } = await supabase
        .from('user_purchases')
        .insert({
          product_id: automationId,
          purchase_price: automation.price
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      toast({
        title: 'Purchase Successful',
        description: 'You can now access your purchased automation.'
      });
    },
    onError: (error) => {
      toast({
        title: 'Purchase Failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  // Mock toggle favorite
  const toggleFavoriteMutation = useMutation({
    mutationFn: async (automationId: string) => {
      // Mock implementation
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  // Mock add review
  const addReviewMutation = useMutation({
    mutationFn: async ({ automationId, rating, comment }: { automationId: string; rating: number; comment?: string }) => {
      // Mock implementation
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automations'] });
      toast({
        title: 'Review Added',
        description: 'Thank you for your feedback!'
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  return {
    automations,
    purchases,
    favorites,
    isLoadingAutomations,
    isLoadingPurchases,
    isLoadingFavorites,
    filters,
    setFilters,
    purchaseAutomation: purchaseMutation.mutate,
    toggleFavorite: toggleFavoriteMutation.mutate,
    addReview: addReviewMutation.mutate
  };
}
