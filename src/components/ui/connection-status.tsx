import React from 'react';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ConnectionStatus = 'connected' | 'disconnected' | 'error';

interface ConnectionStatusProps {
  status: ConnectionStatus;
  className?: string;
  showLabel?: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  status,
  className,
  showLabel = true
}) => {
  const statusConfig = {
    connected: {
      icon: Wifi,
      color: 'text-green-500',
      label: 'Connected'
    },
    disconnected: {
      icon: WifiOff,
      color: 'text-gray-400',
      label: 'Disconnected'
    },
    error: {
      icon: AlertCircle,
      color: 'text-red-500',
      label: 'Connection Error'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Icon className={cn('h-4 w-4', config.color)} />
      {showLabel && (
        <span className={cn('text-sm', config.color)}>
          {config.label}
        </span>
      )}
    </div>
  );
};

export const ConnectionStatusBadge: React.FC<ConnectionStatusProps> = ({
  status,
  className
}) => {
  const statusConfig = {
    connected: {
      color: 'bg-green-100 text-green-800',
      label: 'Live'
    },
    disconnected: {
      color: 'bg-gray-100 text-gray-800',
      label: 'Offline'
    },
    error: {
      color: 'bg-red-100 text-red-800',
      label: 'Error'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      config.color,
      className
    )}>
      {config.label}
    </span>
  );
}; 