
import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { withRetry } from '@/lib/retry';
import { handleError, ErrorType } from '@/lib/error-handler';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'] & {
  sales_count?: number;
};

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  website: string | null;
  seller_verified: boolean | null;
}

interface SellerData {
  profile: Profile | null;
  products: Product[];
}

export function useSellerData() {
  const { user } = useAuth();

  const fetchSellerData = useCallback(async (): Promise<SellerData> => {
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
            .eq('seller_id', user.id)
            .order('created_at', { ascending: false })
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
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [`seller_data_${user?.id}`],
    queryFn: fetchSellerData,
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    profile: data?.profile || null,
    products: data?.products || [],
    loading: isLoading,
    error,
    refresh: refetch,
    invalidate: refetch,
  };
}
