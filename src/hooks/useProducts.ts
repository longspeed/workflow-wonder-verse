import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/supabase';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

export const useProducts = () => {
  const queryClient = useQueryClient();

  const products = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  const createProduct = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) =>
      productService.updateProduct(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}; 