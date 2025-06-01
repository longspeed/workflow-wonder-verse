import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveLoadingProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  fadeIn?: boolean;
  slideIn?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ProgressiveLoading: React.FC<ProgressiveLoadingProps> = ({
  children,
  className,
  staggerDelay = 100,
  fadeIn = true,
  slideIn = true,
  direction = 'up',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), staggerDelay);
    return () => clearTimeout(timer);
  }, [staggerDelay]);

  const getSlideClass = () => {
    if (!slideIn) return '';
    switch (direction) {
      case 'up':
        return 'translate-y-4';
      case 'down':
        return '-translate-y-4';
      case 'left':
        return 'translate-x-4';
      case 'right':
        return '-translate-x-4';
      default:
        return '';
    }
  };

  return (
    <div
      className={cn(
        'transition-all duration-500',
        fadeIn && 'opacity-0',
        slideIn && getSlideClass(),
        isVisible && 'opacity-100 translate-y-0 translate-x-0',
        className
      )}
    >
      {children}
    </div>
  );
};

interface ProgressiveListProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  fadeIn?: boolean;
  slideIn?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ProgressiveList: React.FC<ProgressiveListProps> = ({
  children,
  className,
  staggerDelay = 100,
  fadeIn = true,
  slideIn = true,
  direction = 'up',
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {React.Children.map(children, (child, index) => (
        <ProgressiveLoading
          key={index}
          staggerDelay={index * staggerDelay}
          fadeIn={fadeIn}
          slideIn={slideIn}
          direction={direction}
        >
          {child}
        </ProgressiveLoading>
      ))}
    </div>
  );
}; 