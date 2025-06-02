import { useEffect } from 'react';
import { realtimeService, automationService } from '@/services/supabase';

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
    const { data: { subscription } } = realtimeService.subscribeToAuth(callback);
    
    return () => {
      subscription.unsubscribe();
    };
  }, [callback]);
};

export const useRealtimeAutomations = (callback: (payload: any) => void) => {
  const channel = automationService.subscribeToAutomations(callback);
  return () => {
    channel.unsubscribe();
  };
};
