import { useState, useEffect, useCallback } from 'react';
import { cache } from '@/lib/cache';
import { subscriptionManager } from '@/lib/subscription';

interface UseEnhancedDataOptions<T> {
  key: string;
  fetchFn: () => Promise<T>;
  ttl?: number;
  realtime?: boolean;
  channel?: string;
  onError?: (error: Error) => void;
}

export function useEnhancedData<T>({
  key,
  fetchFn,
  ttl = 5 * 60 * 1000, // 5 minutes
  realtime = false,
  channel,
  onError,
}: UseEnhancedDataOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async (force = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first if not forcing refresh
      if (!force) {
        const cachedData = cache.get<T>(key);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }
      }

      // Fetch fresh data
      const freshData = await fetchFn();
      setData(freshData);
      setLastUpdated(new Date());

      // Update cache
      cache.set(key, freshData, ttl);

      // Publish to realtime channel if enabled
      if (realtime && channel) {
        subscriptionManager.publish(channel, freshData);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [key, fetchFn, ttl, realtime, channel, onError]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set up realtime subscription if enabled
  useEffect(() => {
    if (!realtime || !channel) return;

    const subscriptionId = subscriptionManager.subscribe<T>(channel, (newData) => {
      setData(newData);
      setLastUpdated(new Date());
    });

    return () => {
      subscriptionManager.unsubscribe(channel, subscriptionId);
    };
  }, [realtime, channel]);

  // Auto-refresh when cache expires
  useEffect(() => {
    if (!ttl) return;

    const interval = setInterval(() => {
      const cachedData = cache.get<T>(key);
      if (!cachedData) {
        fetchData();
      }
    }, ttl);

    return () => clearInterval(interval);
  }, [key, ttl, fetchData]);

  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  const invalidate = useCallback(() => {
    cache.delete(key);
    fetchData(true);
  }, [key, fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    invalidate,
  };
} 