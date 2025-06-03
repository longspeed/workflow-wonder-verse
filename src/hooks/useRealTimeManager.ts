
import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UseRealTimeManagerOptions {
  channel: string;
  table?: string;
  filter?: string;
  onUpdate?: (payload: any) => void;
  onInsert?: (payload: any) => void;
  onDelete?: (payload: any) => void;
}

export const useRealTimeManager = (options: UseRealTimeManagerOptions) => {
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (!options.channel) return;

    const subscription = supabase
      .channel(options.channel)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: options.table || 'products',
          filter: options.filter,
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          
          switch (payload.eventType) {
            case 'UPDATE':
              options.onUpdate?.(payload);
              break;
            case 'INSERT':
              options.onInsert?.(payload);
              break;
            case 'DELETE':
              options.onDelete?.(payload);
              break;
          }
        }
      )
      .subscribe();

    subscriptionRef.current = subscription;

    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }
    };
  }, [options.channel, options.table, options.filter]);

  return subscriptionRef.current;
};
