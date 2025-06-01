import { PostgrestError } from '@supabase/supabase-js';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleSupabaseError = (error: PostgrestError) => {
  switch (error.code) {
    case '23505': // unique_violation
      throw new AppError('This record already exists', error.code, 409);
    case '23503': // foreign_key_violation
      throw new AppError('Related record not found', error.code, 404);
    case '42P01': // undefined_table
      throw new AppError('Table not found', error.code, 404);
    default:
      throw new AppError(error.message, error.code, 500);
  }
};

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
}; 