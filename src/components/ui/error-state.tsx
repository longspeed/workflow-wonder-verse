import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Error loading data',
  message,
  error,
  onRetry,
  className = '',
}) => {
  return (
    <div 
      className={`flex flex-col items-center justify-center h-64 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <AlertCircle className="h-8 w-8 text-red-600 mb-4" aria-hidden="true" />
      <p className="text-red-600 mb-2">{title}</p>
      {(message || error?.message) && (
        <p className="text-sm text-red-500 mb-4">{message || error?.message}</p>
      )}
      <div className="flex gap-4">
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        )}
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          className="text-yellow-600 hover:text-yellow-700"
        >
          Reload Page
        </Button>
      </div>
    </div>
  );
}; 