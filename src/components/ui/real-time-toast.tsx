
import { useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useRealTimeManager } from '@/hooks/useRealTimeManager';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

interface RealTimeToastProps {
  userId?: string;
  channel?: string;
}

export function RealTimeToast({ 
  userId, 
  channel = 'toast-messages'
}: RealTimeToastProps) {
  const showToast = useCallback((toastData: ToastMessage) => {
    const toastOptions = {
      duration: toastData.duration || 4000,
    };

    switch (toastData.type) {
      case 'success':
        toast(toastData.message, toastOptions);
        break;
      case 'error':
        toast(toastData.message, toastOptions);
        break;
      case 'info':
        toast(toastData.message, toastOptions);
        break;
      case 'warning':
        toast(toastData.message, toastOptions);
        break;
      default:
        toast(toastData.message, toastOptions);
    }
  }, []);

  // Subscribe to real-time toast messages
  useRealTimeManager({
    channel,
    onUpdate: (payload) => {
      if (payload.new && payload.new.type && payload.new.message) {
        showToast(payload.new as ToastMessage);
      }
    },
    onInsert: (payload) => {
      if (payload.new && payload.new.type && payload.new.message) {
        showToast(payload.new as ToastMessage);
      }
    },
  });

  return null; // This component doesn't render anything
}

// Utility functions for triggering toasts
export const triggerSuccessToast = (message: string, title?: string) => {
  toast(message);
};

export const triggerErrorToast = (message: string, title?: string) => {
  toast(message);
};

export const triggerInfoToast = (message: string, title?: string) => {
  toast(message);
};

export const triggerWarningToast = (message: string, title?: string) => {
  toast(message);
};
