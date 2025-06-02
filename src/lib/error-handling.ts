import { PostgrestError } from '@supabase/supabase-js';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import React from 'react';

interface PostgrestErrorDetails {
  column?: string;
  table?: string;
  constraint?: string;
  details?: any;
}

interface ErrorDetails {
  column?: string;
  table?: string;
  constraint?: string;
  details?: any;
}

// Initialize Sentry
Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

// Custom error types
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public severity: 'error' | 'warning' | 'info' = 'error',
    public metadata?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string, metadata?: Record<string, any>) {
    super(message, 'NETWORK_ERROR', 'error', metadata);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, metadata?: Record<string, any>) {
    super(message, 'VALIDATION_ERROR', 'warning', metadata);
    this.name = 'ValidationError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, code?: string, details?: ErrorDetails) {
    super(message, code || 'DATABASE_ERROR', 'error', { details });
    this.name = 'DatabaseError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTH_ERROR', 'error');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Not authorized') {
    super(message, 'FORBIDDEN', 'error');
    this.name = 'AuthorizationError';
  }
}

export const handleSupabaseError = (error: PostgrestError & { details?: PostgrestErrorDetails }) => {
  const details: ErrorDetails = {
    column: error.details?.column,
    table: error.details?.table,
    constraint: error.details?.constraint,
    details: error.details
  };

  switch (error.code) {
    case '23505': // unique_violation
      throw new ValidationError('This record already exists', { column: details.column });
    case '23503': // foreign_key_violation
      throw new DatabaseError('Related record not found', error.code, { 
        table: details.table,
        constraint: details.constraint 
      });
    case '42P01': // undefined_table
      throw new DatabaseError('Table not found', error.code);
    case '22P02': // invalid_text_representation
      throw new ValidationError('Invalid data format', { details: details.details });
    case '23502': // not_null_violation
      throw new ValidationError('Required field missing', { 
        column: details.column 
      });
    case '42501': // insufficient_privilege
      throw new AuthorizationError('Insufficient database privileges');
    default:
      throw new DatabaseError(error.message, error.code, { details: details.details });
  }
};

export const handleAuthError = (error: any) => {
  if (error.message?.includes('Invalid login credentials')) {
    throw new AuthenticationError('Invalid email or password');
  }
  if (error.message?.includes('Email not confirmed')) {
    throw new AuthenticationError('Please confirm your email address');
  }
  throw new AuthenticationError(error.message);
};

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

// Error boundary props
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

// Error boundary state
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

// Error reporting service
export const ErrorReporting = {
  captureError(error: Error, context?: Record<string, any>) {
    Sentry.withScope((scope) => {
      if (context) {
        Object.entries(context).forEach(([key, value]) => {
          scope.setExtra(key, value);
        });
      }
      Sentry.captureException(error);
    });
  },

  captureMessage(message: string, level: Sentry.SeverityLevel = 'error') {
    Sentry.captureMessage(message, level);
  },

  setUser(user: { id: string; email?: string; username?: string } | null) {
    Sentry.setUser(user);
  },

  setTag(key: string, value: string) {
    Sentry.setTag(key, value);
  },
};

// Error handling hooks
export const useErrorHandler = () => {
  const handleError = React.useCallback((error: Error, context?: Record<string, any>) => {
    if (error instanceof AppError) {
      ErrorReporting.captureError(error, {
        ...context,
        errorCode: error.code,
        severity: error.severity,
        ...error.metadata,
      });
    } else {
      ErrorReporting.captureError(error, context);
    }
  }, []);

  return { handleError };
};

// Error boundary component
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    ErrorReporting.captureError(error, {
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              We apologize for the inconvenience. An error has occurred.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-600 overflow-auto">
                  {this.state.error?.toString()}
                </pre>
                {this.state.errorInfo && (
                  <pre className="text-sm text-gray-600 mt-2 overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 