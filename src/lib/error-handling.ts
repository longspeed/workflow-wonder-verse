import { PostgrestError } from '@supabase/supabase-js';

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

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number,
    public details?: ErrorDetails
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, code?: string, details?: ErrorDetails) {
    super(message, code, 500, details);
    this.name = 'DatabaseError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Not authorized') {
    super(message, 'FORBIDDEN', 403);
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