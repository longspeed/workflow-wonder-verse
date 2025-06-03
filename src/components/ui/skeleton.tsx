
import React from 'react';
import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-shimmer bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 bg-[length:200%_100%] rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-4 space-y-3', className)}>
    <Skeleton className="h-4 w-3/5" />
    <Skeleton className="h-4 w-4/5" />
    <Skeleton className="h-4 w-2/5" />
  </div>
);

export const SkeletonList: React.FC<{ count?: number; className?: string }> = ({ 
  count = 3, 
  className 
}) => (
  <div className={cn('space-y-4', className)}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);
