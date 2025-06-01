import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Automation, AutomationFilters, Purchase, Favorite, Review } from '@/types/marketplace';

export function useMarketplace() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<AutomationFilters>({});

  // Fetch automations with filters
  const { data: automations, isLoading: isLoadingAutomations } = useQuery({
    queryKey: ['automations', filters],
    queryFn: async () => {
      let query = supabase
        .from('automations')
        .select(`
          *,
          seller:profiles(*)
        `)
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
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters.sortBy) {
        const order = filters.sortOrder || 'desc';
        query = query.order(filters.sortBy, { ascending: order === 'asc' });
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Automation[];
    }
  });

  // Fetch user's purchases
  const { data: purchases, isLoading: isLoadingPurchases } = useQuery({
    queryKey: ['purchases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchases')
        .select(`
          *,
          automation:automations(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Purchase[];
    }
  });

  // Fetch user's favorites
  const { data: favorites, isLoading: isLoadingFavorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          automation:automations(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Favorite[];
    }
  });

  // Purchase automation
  const purchaseMutation = useMutation({
    mutationFn: async (automationId: string) => {
      const { data: automation, error: automationError } = await supabase
        .from('automations')
        .select('*')
        .eq('id', automationId)
        .single();

      if (automationError) throw automationError;

      const { data, error } = await supabase
        .from('purchases')
        .insert({
          automation_id: automationId,
          amount: automation.price,
          currency: automation.currency
        })
        .select()
        .single();

      if (error) throw error;
      return data as Purchase;
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

  // Toggle favorite
  const toggleFavoriteMutation = useMutation({
    mutationFn: async (automationId: string) => {
      const { data: existingFavorite, error: checkError } = await supabase
        .from('favorites')
        .select('id')
        .eq('automation_id', automationId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') throw checkError;

      if (existingFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('id', existingFavorite.id);

        if (error) throw error;
        return null;
      } else {
        const { data, error } = await supabase
          .from('favorites')
          .insert({ automation_id: automationId })
          .select()
          .single();

        if (error) throw error;
        return data as Favorite;
      }
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

  // Add review
  const addReviewMutation = useMutation({
    mutationFn: async ({ automationId, rating, comment }: { automationId: string; rating: number; comment?: string }) => {
      const { data, error } = await supabase
        .from('reviews')
        .upsert({
          automation_id: automationId,
          rating,
          comment
        })
        .select()
        .single();

      if (error) throw error;
      return data as Review;
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