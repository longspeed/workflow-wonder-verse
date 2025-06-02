import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealTimeUpdateToast } from '@/components/ui/real-time-update-toast';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export type ConnectionStatus = 'connected' | 'disconnected' | 'error' | 'connecting' | 'reconnecting';

export interface UseRealTimeManagerOptions {
  channel: string;
  onUpdate?: (payload: any) => void;
  showToasts?: boolean;
  autoReconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  debounceTime?: number;
}

export function useRealTimeManager({
  channel,
  onUpdate,
  showToasts = true,
  autoReconnect = true,
  reconnectInterval = 5000,
  maxReconnectAttempts = 5,
  debounceTime = 1000
}: UseRealTimeManagerOptions) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [subscription, setSubscription] = useState<any>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const lastUpdateTime = useRef<number>(0);
  const updateQueue = useRef<any[]>([]);
  const processingTimeout = useRef<NodeJS.Timeout>();

  const processUpdateQueue = useCallback(() => {
    if (updateQueue.current.length === 0) return;

    const updates = [...updateQueue.current];
    updateQueue.current = [];
    
    // Process updates in batch
    updates.forEach(update => {
      if (onUpdate) {
        onUpdate(update);
      }
    });

    if (showToasts) {
      RealTimeUpdateToast.updateReceived();
    }
  }, [onUpdate, showToasts]);

  const handleUpdate = useCallback((payload: any) => {
    const now = Date.now();
    
    // Add to queue
    updateQueue.current.push(payload);
    
    // Clear existing timeout
    if (processingTimeout.current) {
      clearTimeout(processingTimeout.current);
    }
    
    // Set new timeout for processing
    processingTimeout.current = setTimeout(() => {
      processUpdateQueue();
    }, debounceTime);
    
    lastUpdateTime.current = now;
  }, [debounceTime, processUpdateQueue]);

  const connect = useCallback(() => {
    if (subscription) {
      supabase.removeChannel(subscription);
    }

    setStatus('connecting');

    const newSubscription = supabase
      .channel(channel)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public'
        },
        handleUpdate
      )
      .subscribe((status) => {
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
  }, [channel, handleUpdate, showToasts]);

  const disconnect = useCallback(() => {
    if (subscription) {
      supabase.removeChannel(subscription);
      setSubscription(null);
      setStatus('disconnected');
    }
  }, [subscription]);

  // Auto-reconnect logic with exponential backoff
  useEffect(() => {
    if (!autoReconnect || status === 'connected') return;

    const backoffTime = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
    const timeout = setTimeout(() => {
      if (reconnectAttempts < maxReconnectAttempts) {
        setReconnectAttempts(prev => prev + 1);
        connect();
      } else {
        if (showToasts) {
          RealTimeUpdateToast.connectionLost();
        }
      }
    }, backoffTime);

    return () => clearTimeout(timeout);
  }, [status, reconnectAttempts, autoReconnect, maxReconnectAttempts, connect, showToasts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (processingTimeout.current) {
        clearTimeout(processingTimeout.current);
      }
      disconnect();
    };
  }, [disconnect]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      connect();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setStatus('disconnected');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle Supabase connection status
  useEffect(() => {
    const channel = supabase.channel('system');

    const handleStatusChange = (status: ConnectionStatus) => {
      setStatus(status);
      
      switch (status) {
        case 'connected':
          toast.success('Connected to real-time updates');
          setReconnectAttempts(0);
          break;
        case 'disconnected':
          toast.error('Disconnected from real-time updates');
          break;
        case 'reconnecting':
          toast.warning('Reconnecting to real-time updates...');
          break;
      }
    };

    channel
      .on('system', { event: 'connected' }, () => handleStatusChange('connected'))
      .on('system', { event: 'disconnected' }, () => handleStatusChange('disconnected'))
      .on('system', { event: 'reconnecting' }, () => handleStatusChange('reconnecting'))
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Reconnect with exponential backoff
  const reconnect = useCallback(async () => {
    if (!isOnline) return;

    const maxRetries = 5;
    const backoffDelay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);

    if (reconnectAttempts >= maxRetries) {
      toast.error('Failed to reconnect after multiple attempts');
      return;
    }

    setStatus('reconnecting');
    setReconnectAttempts(prev => prev + 1);

    try {
      await new Promise(resolve => setTimeout(resolve, backoffDelay));
      await supabase.reconnect();
    } catch (error) {
      console.error('Reconnection failed:', error);
      reconnect();
    }
  }, [isOnline, reconnectAttempts]);

  return {
    status,
    connect,
    disconnect,
    reconnectAttempts,
    isConnected: status === 'connected',
    isError: status === 'error',
    isConnecting: status === 'connecting',
    isReconnecting: status === 'reconnecting',
    isOnline,
    lastUpdateTime: lastUpdateTime.current,
    pendingUpdates: updateQueue.current.length,
    reconnect,
  };
}
