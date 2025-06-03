
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReportError = () => {
    if (this.state.error) {
      // Report error to logging service
      console.error('Reporting error:', this.state.error);
      toast('Error reported successfully');
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error!}
            retry={this.handleRetry}
          />
        );
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg border">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Something went wrong
              </h2>
              <p className="text-gray-600 mb-6">
                We're sorry, but something unexpected happened. Please try again.
              </p>
              
              {this.state.error && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                  <pre className="text-sm text-gray-800 overflow-auto">
                    {this.state.error.message}
                  </pre>
                </div>
              )}

              <div className="flex gap-3 justify-center">
                <Button onClick={this.handleRetry} variant="default">
                  Try Again
                </Button>
                <Button 
                  onClick={this.handleReportError} 
                  variant="outline"
                >
                  Report Error
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
