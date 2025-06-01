import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
  showSpinner?: boolean;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  subMessage,
  showSpinner = true,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      {showSpinner && (
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      )}
      <p className="text-lg font-medium text-gray-900">{message}</p>
      {subMessage && (
        <p className="text-sm text-gray-500 mt-2">{subMessage}</p>
      )}
    </div>
  );
};

export const RealTimeUpdateIndicator: React.FC<{
  isUpdating: boolean;
  lastUpdated?: Date;
}> = ({ isUpdating, lastUpdated }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      {isUpdating && (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Updating...</span>
        </>
      )}
      {lastUpdated && !isUpdating && (
        <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
      )}
    </div>
  );
}; 