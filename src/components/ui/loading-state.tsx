import React from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  subMessage,
  className = '',
}) => {
  return (
    <div 
      className={`flex flex-col items-center justify-center h-64 ${className}`}
      role="status"
      aria-live="polite"
    >
      <RefreshCw 
        className="h-8 w-8 animate-spin text-yellow-600 mb-4" 
        aria-hidden="true"
      />
      <p className="text-yellow-700">{message}</p>
      {subMessage && (
        <p className="text-sm text-yellow-600 mt-2">{subMessage}</p>
      )}
    </div>
  );
}; 