import { useEffect } from 'react';
import { realtimeService } from '@/services/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export const useRealtimeProducts = (callback: (payload: any) => void) => {
  useEffect(() => {
    const channel = realtimeService.subscribeToProducts(callback);
    
    return () => {
      channel.unsubscribe();
    };
  }, [callback]);
};

export const useRealtimeProfile = (userId: string, callback: (payload: any) => void) => {
  useEffect(() => {
    const channel = realtimeService.subscribeToProfile(userId, callback);
    
    return () => {
      channel.unsubscribe();
    };
  }, [userId, callback]);
};

export const useRealtimeAuth = (callback: (payload: any) => void) => {
  useEffect(() => {
    const channel = realtimeService.subscribeToAuth(callback);
    
    return () => {
      channel.unsubscribe();
    };
  }, [callback]);
}; 