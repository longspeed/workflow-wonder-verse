
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { automationService, profileService } from '@/services/supabase';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

export const useAccountData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [automations, setAutomations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch user profile
      const profileData = await profileService.getProfile(user.id);
      setProfile(profileData?.data || null);

      // Fetch user's automations
      const { data: automationsData } = await automationService.getAutomations();
      setAutomations(automationsData || []);
    } catch (err) {
      console.error('Error fetching account data:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchData();
  };

  const batchUpdateAutomationStatus = async (items: Product[]): Promise<void[]> => {
    const promises = items.map(async (automation) => {
      // Update automation status logic here
      return Promise.resolve();
    });
    return Promise.all(promises);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return {
    profile,
    automations,
    loading,
    error,
    refresh,
    batchUpdateAutomationStatus,
  };
};
