
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealTimeUpdateToast } from '@/components/ui/real-time-toast';

type ConnectionStatus = 'connected' | 'disconnected' | 'error';

interface UseRealTimeManagerOptions {
  channel: string;
  onUpdate?: (payload: any) => void;
  showToasts?: boolean;
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

export function useRealTimeManager({
  channel,
  onUpdate,
  showToasts = true,
  autoReconnect = true,
  reconnectInterval = 5000
}: UseRealTimeManagerOptions) {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [subscription, setSubscription] = useState<any>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    if (subscription) {
      supabase.removeChannel(subscription);
    }

    const newSubscription = supabase
      .channel(channel)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public'
        },
        (payload) => {
          console.log(`Real-time update received for ${channel}:`, payload);
          onUpdate?.(payload);
          if (showToasts) {
            RealTimeUpdateToast.updateReceived();
          }
        }
      )
      .subscribe((status) => {
        console.log(`Subscription status for ${channel}:`, status);
        if (status === 'SUBSCRIBED') {
          setStatus('connected');
          setReconnectAttempts(0);
          if (showToasts) {
            RealTimeUpdateToast.connectionRestored();
          }
        } else if (status === 'CLOSED') {
          setStatus('disconnected');
        } else if (status === 'CHANNEL_ERROR') {
          setStatus('error');
          if (showToasts) {
            RealTimeUpdateToast.connectionLost();
          }
        }
      });

    setSubscription(newSubscription);
  }, [channel, onUpdate, showToasts]);

  const disconnect = useCallback(() => {
    if (subscription) {
      supabase.removeChannel(subscription);
      setSubscription(null);
      setStatus('disconnected');
    }
  }, [subscription]);

  // Auto-reconnect logic
  useEffect(() => {
    if (!autoReconnect || status === 'connected') return;

    const timeout = setTimeout(() => {
      if (reconnectAttempts < maxReconnectAttempts) {
        console.log(`Attempting to reconnect (${reconnectAttempts + 1}/${maxReconnectAttempts})...`);
        setReconnectAttempts(prev => prev + 1);
        connect();
      } else {
        console.error('Max reconnection attempts reached');
        if (showToasts) {
          RealTimeUpdateToast.connectionLost();
        }
      }
    }, reconnectInterval);

    return () => clearTimeout(timeout);
  }, [status, reconnectAttempts, autoReconnect, reconnectInterval, connect, showToasts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    status,
    connect,
    disconnect,
    reconnectAttempts,
    isConnected: status === 'connected',
    isError: status === 'error'
  };
}
