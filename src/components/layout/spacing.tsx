
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SpacingProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'vertical' | 'horizontal' | 'both';
  className?: string;
}

const getSpacingClass = (size: string, direction: string) => {
  const sizeMap = {
    sm: { vertical: 'my-2', horizontal: 'mx-2', both: 'm-2' },
    md: { vertical: 'my-4', horizontal: 'mx-4', both: 'm-4' },
    lg: { vertical: 'my-8', horizontal: 'mx-8', both: 'm-8' },
    xl: { vertical: 'my-16', horizontal: 'mx-16', both: 'm-16' },
  };

  return sizeMap[size as keyof typeof sizeMap][direction as keyof typeof sizeMap.sm] || sizeMap.md.vertical;
};

export const Spacing: React.FC<SpacingProps> = ({
  children,
  size = 'md',
  direction = 'vertical',
  className = '',
}) => {
  const spacingClass = getSpacingClass(size, direction);
  const classes = cn(spacingClass, className);

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export const VerticalSpacing: React.FC<Omit<SpacingProps, 'direction'>> = (props) => (
  <Spacing {...props} direction="vertical" />
);

export const HorizontalSpacing: React.FC<Omit<SpacingProps, 'direction'>> = (props) => (
  <Spacing {...props} direction="horizontal" />
);

interface SectionSpacingProps {
  children: ReactNode;
  top?: boolean;
  bottom?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const SectionSpacing: React.FC<SectionSpacingProps> = ({
  children,
  top = true,
  bottom = true,
  size = 'lg',
  className = '',
}) => {
  const sizeMap = {
    sm: { top: 'mt-4', bottom: 'mb-4' },
    md: { top: 'mt-8', bottom: 'mb-8' },
    lg: { top: 'mt-16', bottom: 'mb-16' },
    xl: { top: 'mt-32', bottom: 'mb-32' },
  };

  const topClass = top ? sizeMap[size].top : '';
  const bottomClass = bottom ? sizeMap[size].bottom : '';
  const classes = cn(topClass, bottomClass, className);

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

interface InlineSpacingProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const InlineSpacing: React.FC<InlineSpacingProps> = ({
  children,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'm-2',
    md: 'm-4',
    lg: 'm-8',
    xl: 'm-16',
  };

  const classes = cn('inline-block', sizeMap[size], className);

  return (
    <div className={classes}>
      {children}
    </div>
  );
};
