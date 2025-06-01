import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { useEnhancedData } from './useEnhancedData';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { withRetry } from '@/lib/retry';
import { handleError, ErrorType } from '@/lib/error-handler';
import { BatchProcessor } from '@/lib/batch';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  status: 'purchased' | 'wishlist';
  rating?: number;
  last_used?: string;
  usage_count?: number;
}

interface Profile {
  id: string;
  full_name: string;
  email: string;
  subscription_tier: string;
  created_at: string;
}

interface AccountData {
  profile: Profile | null;
  products: Product[];
}

// Create a batch processor for product updates
const productUpdateBatch = new BatchProcessor<Product, void>({
  maxSize: 10,
  maxDelay: 1000,
  processFn: async (products) => {
    const updates = products.map(product => 
      supabase
        .from('products')
        .update(product)
        .eq('id', product.id)
    );
    await Promise.all(updates);
  },
  onError: (error, items) => {
    handleError(error, {
      showToast: true,
      logToConsole: true,
    });
  }
});

export function useAccountData() {
  const { user } = useAuth();

  const fetchAccountData = useCallback(async (): Promise<AccountData> => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    return withRetry(async () => {
      try {
        // Fetch profile and products in parallel
        const [profileResult, productsResult] = await Promise.all([
          supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single(),
          supabase
            .from('products')
            .select('*')
            .in('status', ['purchased', 'wishlist'])
            .eq('user_id', user.id)
        ]);

        if (profileResult.error) throw profileResult.error;
        if (productsResult.error) throw productsResult.error;

        return {
          profile: profileResult.data,
          products: productsResult.data || [],
        };
      } catch (error) {
        const errorDetails = handleError(error, {
          showToast: false,
          logToConsole: true,
        });

        // Retry on network or server errors
        if (errorDetails.type === ErrorType.NETWORK || 
            errorDetails.type === ErrorType.SERVER) {
          throw error;
        }

        // Don't retry other errors
        return {
          profile: null,
          products: [],
        };
      }
    }, {
      maxAttempts: 3,
      shouldRetry: (error) => {
        const errorDetails = handleError(error, {
          showToast: false,
          logToConsole: false,
        });
        return errorDetails.type === ErrorType.NETWORK || 
               errorDetails.type === ErrorType.SERVER;
      }
    });
  }, [user]);

  const {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    invalidate,
  } = useEnhancedData<AccountData>({
    key: `account_data_${user?.id}`,
    fetchFn: fetchAccountData,
    ttl: 5 * 60 * 1000, // 5 minutes
    realtime: true,
    channel: `account_updates_${user?.id}`,
    onError: (error) => {
      handleError(error, {
        showToast: true,
        logToConsole: true,
      });
    },
  });

  const updateProductStatus = useCallback(async (
    productId: string,
    status: 'purchased' | 'wishlist'
  ) => {
    try {
      const product = data?.products.find(p => p.id === productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // Update product in batch
      await productUpdateBatch.add({
        ...product,
        status,
      });

      // Invalidate cache and refresh data
      invalidate();

      toast({
        title: 'Status updated',
        description: `Product status has been updated to ${status}`,
      });
    } catch (error) {
      handleError(error, {
        showToast: true,
        logToConsole: true,
      });
    }
  }, [data?.products, invalidate]);

  const updateProductRating = useCallback(async (
    productId: string,
    rating: number
  ) => {
    try {
      const product = data?.products.find(p => p.id === productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // Update product in batch
      await productUpdateBatch.add({
        ...product,
        rating,
      });

      // Invalidate cache and refresh data
      invalidate();

      toast({
        title: 'Rating updated',
        description: 'Product rating has been updated successfully.',
      });
    } catch (error) {
      handleError(error, {
        showToast: true,
        logToConsole: true,
      });
    }
  }, [data?.products, invalidate]);

  return {
    profile: data?.profile || null,
    products: data?.products || [],
    loading,
    error,
    lastUpdated,
    refresh,
    updateProductStatus,
    updateProductRating,
  };
} 