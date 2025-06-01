import React from 'react';
import { toast } from '@/components/ui/use-toast';
import { Zap, AlertCircle, CheckCircle2 } from 'lucide-react';

interface RealTimeToastProps {
  type: 'success' | 'error' | 'info';
  title: string;
  description: string;
}

export const showRealTimeToast = ({ type, title, description }: RealTimeToastProps) => {
  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    error: <AlertCircle className="h-4 w-4 text-red-500" />,
    info: <Zap className="h-4 w-4 text-blue-500" />
  };

  toast({
    title: (
      <div className="flex items-center gap-2">
        {icons[type]}
        <span>{title}</span>
      </div>
    ),
    description,
    duration: type === 'error' ? 5000 : 3000,
    variant: type === 'error' ? 'destructive' : 'default'
  });
};

export const RealTimeUpdateToast = {
  connectionLost: () => showRealTimeToast({
    type: 'error',
    title: 'Connection Lost',
    description: 'Lost connection to real-time updates. Trying to reconnect...'
  }),
  connectionRestored: () => showRealTimeToast({
    type: 'success',
    title: 'Connection Restored',
    description: 'Real-time updates are now working again.'
  }),
  newAutomation: (title: string) => showRealTimeToast({
    type: 'info',
    title: 'New Automation',
    description: `A new automation "${title}" has been published.`
  }),
  updateReceived: () => showRealTimeToast({
    type: 'info',
    title: 'Update Received',
    description: 'New data has been received and the view has been updated.'
  })
}; 