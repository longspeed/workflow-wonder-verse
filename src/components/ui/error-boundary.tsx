import React, { Component, ReactNode } from 'react'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { AlertCircle, RefreshCw, Copy, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo })
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Report error to monitoring service (if implemented)
    this.reportError(error, errorInfo)
  }

  private reportError(error: Error, errorInfo: React.ErrorInfo) {
    // TODO: Implement error reporting service integration
    // Example: Sentry.captureException(error, { extra: errorInfo })
  }

  private copyErrorToClipboard = () => {
    const errorDetails = {
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack
    }
    
    navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2))
    toast.success('Error details copied to clipboard')
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <CardTitle>Something went wrong</CardTitle>
              <CardDescription>
                An error occurred while rendering this component.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.error && (
                <div className="bg-muted p-3 rounded text-sm text-muted-foreground">
                  <div className="font-medium mb-1">Error Message:</div>
                  <div className="mb-2">{this.state.error.message}</div>
                  {this.state.errorInfo?.componentStack && (
                    <>
                      <div className="font-medium mb-1">Component Stack:</div>
                      <div className="text-xs opacity-75">
                        {this.state.errorInfo.componentStack}
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={() => this.setState({ hasError: false, error: undefined, errorInfo: undefined })}
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  variant="outline"
                  onClick={this.copyErrorToClipboard}
                  className="w-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Error Details
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
