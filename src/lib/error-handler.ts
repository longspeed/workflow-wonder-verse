import { toast } from '@/components/ui/use-toast';

export enum ErrorType {
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export interface ErrorDetails {
  type: ErrorType;
  message: string;
  originalError?: any;
  recoverable?: boolean;
  retryCount?: number;
}

export class AppError extends Error {
  constructor(
    public details: ErrorDetails
  ) {
    super(details.message);
    this.name = 'AppError';
  }
}

export function classifyError(error: any): ErrorDetails {
  if (error instanceof AppError) {
    return error.details;
  }

  // Network errors
  if (error instanceof TypeError && error.message.includes('network')) {
    return {
      type: ErrorType.NETWORK,
      message: 'Network connection error. Please check your internet connection.',
      originalError: error,
      recoverable: true,
    };
  }

  // Authentication errors
  if (error?.status === 401) {
    return {
      type: ErrorType.AUTHENTICATION,
      message: 'Authentication failed. Please log in again.',
      originalError: error,
      recoverable: true,
    };
  }

  // Authorization errors
  if (error?.status === 403) {
    return {
      type: ErrorType.AUTHORIZATION,
      message: 'You do not have permission to perform this action.',
      originalError: error,
      recoverable: false,
    };
  }

  // Validation errors
  if (error?.status === 400) {
    return {
      type: ErrorType.VALIDATION,
      message: 'Invalid input. Please check your data and try again.',
      originalError: error,
      recoverable: true,
    };
  }

  // Not found errors
  if (error?.status === 404) {
    return {
      type: ErrorType.NOT_FOUND,
      message: 'The requested resource was not found.',
      originalError: error,
      recoverable: false,
    };
  }

  // Server errors
  if (error?.status >= 500) {
    return {
      type: ErrorType.SERVER,
      message: 'Server error. Please try again later.',
      originalError: error,
      recoverable: true,
    };
  }

  // Unknown errors
  return {
    type: ErrorType.UNKNOWN,
    message: 'An unexpected error occurred. Please try again.',
    originalError: error,
    recoverable: false,
  };
}

export function handleError(error: any, options: {
  showToast?: boolean;
  logToConsole?: boolean;
  onRecover?: () => void;
} = {}) {
  const {
    showToast = true,
    logToConsole = true,
    onRecover,
  } = options;

  const errorDetails = classifyError(error);

  if (logToConsole) {
    console.error('Error details:', errorDetails);
  }

  if (showToast) {
    toast({
      title: 'Error',
      description: errorDetails.message,
      variant: 'destructive',
    });
  }

  if (errorDetails.recoverable && onRecover) {
    onRecover();
  }

  return errorDetails;
}

export function createErrorHandler(options: {
  showToast?: boolean;
  logToConsole?: boolean;
  onRecover?: () => void;
} = {}) {
  return (error: any) => handleError(error, options);
} 