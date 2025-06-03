
import { automationService } from '@/services/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

export const useAutomations = () => {
  const queryClient = useQueryClient();

  const automations = useQuery({
    queryKey: ['automations'],
    queryFn: automationService.getAutomations,
  });

  const createAutomation = useMutation({
    mutationFn: automationService.createAutomation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automations'] });
    },
  });

  const updateAutomation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) =>
      automationService.updateAutomation(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automations'] });
    },
  });

  const deleteAutomation = useMutation({
    mutationFn: automationService.deleteAutomation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automations'] });
    },
  });

  return {
    automations,
    createAutomation,
    updateAutomation,
    deleteAutomation,
  };
}; 
