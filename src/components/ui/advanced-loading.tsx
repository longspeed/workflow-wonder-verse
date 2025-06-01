import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingDotsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({
  className,
  size = 'md',
  color = 'yellow',
}) => {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full bg-current',
            sizeClasses[size],
            'animate-pulse',
            `delay-${i * 100}`
          )}
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
};

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  variant?: 'default' | 'dots' | 'pulse';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = 'md',
  color = 'yellow',
  variant = 'default',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  if (variant === 'dots') {
    return <LoadingDots className={className} size={size} color={color} />;
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
    />
  );
};

interface LoadingCardProps {
  className?: string;
  lines?: number;
  variant?: 'default' | 'pulse' | 'shimmer';
}

export const LoadingCard: React.FC<LoadingCardProps> = ({
  className,
  lines = 3,
  variant = 'default',
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'pulse':
        return 'animate-pulse';
      case 'shimmer':
        return 'animate-shimmer bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 bg-[length:200%_100%]';
      default:
        return '';
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className={cn('h-4 bg-yellow-100 rounded', getVariantClass())} />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-3 bg-yellow-100 rounded',
            getVariantClass(),
            i === lines - 1 && 'w-2/3'
          )}
        />
      ))}
    </div>
  );
};

interface LoadingGridProps {
  className?: string;
  rows?: number;
  cols?: number;
  variant?: 'default' | 'pulse' | 'shimmer';
}

export const LoadingGrid: React.FC<LoadingGridProps> = ({
  className,
  rows = 3,
  cols = 3,
  variant = 'default',
}) => {
  return (
    <div
      className={cn(
        'grid gap-4',
        `grid-cols-${cols}`,
        className
      )}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <LoadingCard
          key={i}
          variant={variant}
          lines={Math.floor(Math.random() * 3) + 1}
        />
      ))}
    </div>
  );
};

interface LoadingSkeletonProps {
  className?: string;
  type?: 'text' | 'circle' | 'rectangle';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'pulse' | 'shimmer';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  type = 'text',
  size = 'md',
  variant = 'default',
}) => {
  const sizeClasses = {
    sm: {
      text: 'h-3',
      circle: 'w-6 h-6',
      rectangle: 'h-12',
    },
    md: {
      text: 'h-4',
      circle: 'w-8 h-8',
      rectangle: 'h-16',
    },
    lg: {
      text: 'h-5',
      circle: 'w-10 h-10',
      rectangle: 'h-20',
    },
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'pulse':
        return 'animate-pulse';
      case 'shimmer':
        return 'animate-shimmer bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 bg-[length:200%_100%]';
      default:
        return '';
    }
  };

  return (
    <div
      className={cn(
        'bg-yellow-100 rounded',
        type === 'circle' && 'rounded-full',
        sizeClasses[size][type],
        getVariantClass(),
        className
      )}
    />
  );
}; 