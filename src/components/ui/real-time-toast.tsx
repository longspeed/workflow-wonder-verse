
import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

interface RealTimeToastProps {
  channel?: string;
  table?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE';
  onNotification?: (payload: any) => void;
}

export function RealTimeToast({ 
  channel = 'real-time-updates',
  table = 'products',
  event = 'INSERT',
  onNotification
}: RealTimeToastProps) {
  useEffect(() => {
    const subscription = supabase
      .channel(channel)
      .on(
        'postgres_changes' as any,
        {
          event,
          schema: 'public',
          table
        },
        (payload) => {
          let message = '';
          let icon = <Info className="w-4 h-4" />;
          
          switch (event) {
            case 'INSERT':
              message = `New ${table.slice(0, -1)} added`;
              icon = <CheckCircle className="w-4 h-4 text-green-500" />;
              break;
            case 'UPDATE':
              message = `${table.slice(0, -1)} updated`;
              icon = <AlertCircle className="w-4 h-4 text-yellow-500" />;
              break;
            case 'DELETE':
              message = `${table.slice(0, -1)} deleted`;
              icon = <XCircle className="w-4 h-4 text-red-500" />;
              break;
          }

          toast(message, {
            description: payload.new?.title || payload.new?.name || payload.old?.title || payload.old?.name || 'Real-time update received',
            icon: icon,
          });

          if (onNotification) {
            onNotification(payload);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [channel, table, event, onNotification]);

  return null;
}

// Static utility methods for toast notifications
export const RealTimeUpdateToast = {
  updateReceived: () => {
    toast.success('Update received', {
      description: 'Data has been refreshed with latest changes'
    });
  },
  connectionRestored: () => {
    toast.success('Connection restored', {
      description: 'Real-time updates are now active'
    });
  },
  connectionLost: () => {
    toast.error('Connection lost', {
      description: 'Real-time updates are currently unavailable'
    });
  }
};
