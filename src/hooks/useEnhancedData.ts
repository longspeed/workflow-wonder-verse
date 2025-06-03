
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useRealTimeManager } from './useRealTimeManager';
import React from 'react';

export interface UseEnhancedDataOptions<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
  realTimeChannel?: string;
  onRealtimeUpdate?: (data: T) => void;
}

export function useEnhancedData<T>({
  queryKey,
  queryFn,
  options = {},
  realTimeChannel,
  onRealtimeUpdate,
}: UseEnhancedDataOptions<T>) {
  const query = useQuery({
    queryKey,
    queryFn,
    ...options
  });

  const { status: connectionStatus } = useRealTimeManager({
    channel: realTimeChannel || '',
    onUpdate: (payload) => {
      if (payload && onRealtimeUpdate) {
        onRealtimeUpdate(payload.new as T);
      }
    },
    autoReconnect: true
  });

  return {
    ...query,
    connectionStatus,
    isConnected: connectionStatus === 'connected'
  };
}
