import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { useStore } from '@/store';

// Initialize Sentry
export const initErrorTracking = () => {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
      environment: import.meta.env.MODE,
      beforeSend(event) {
        // Don't send events in development
        if (import.meta.env.DEV) {
          return null;
        }
        return event;
      },
    });
  }
};

// Set user context for error tracking
export const setErrorTrackingUser = (user: { id: string; email?: string }) => {
  if (import.meta.env.PROD) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
    });
  }
};

// Clear user context
export const clearErrorTrackingUser = () => {
  if (import.meta.env.PROD) {
    Sentry.setUser(null);
  }
};

// Custom error boundary component
export const ErrorBoundary = Sentry.ErrorBoundary;

// Error tracking hook
export const useErrorTracking = () => {
  const { user } = useStore();

  const trackError = (error: Error, context?: Record<string, any>) => {
    if (import.meta.env.PROD) {
      Sentry.withScope((scope) => {
        if (user) {
          scope.setUser({
            id: user.id,
            email: user.email,
          });
        }

        if (context) {
          scope.setExtras(context);
        }

        Sentry.captureException(error);
      });
    } else {
      console.error('Error:', error);
      console.log('Context:', context);
    }
  };

  const trackMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
    if (import.meta.env.PROD) {
      Sentry.captureMessage(message, level);
    } else {
      console.log(`[${level.toUpperCase()}] ${message}`);
    }
  };

  return {
    trackError,
    trackMessage,
  };
};

// Performance monitoring
export const startTransaction = (name: string, op?: string) => {
  if (import.meta.env.PROD) {
    return Sentry.startTransaction({
      name,
      op: op || 'task',
    });
  }
  return null;
};

// Add breadcrumb
export const addBreadcrumb = (message: string, category?: string, level?: Sentry.SeverityLevel) => {
  if (import.meta.env.PROD) {
    Sentry.addBreadcrumb({
      message,
      category,
      level,
    });
  }
}; 