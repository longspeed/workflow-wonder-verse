
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type JustifyContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
type Direction = 'row' | 'column';
type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type Gap = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface FlexProps {
  children: ReactNode;
  direction?: Direction;
  justify?: JustifyContent;
  align?: AlignItems;
  wrap?: Wrap;
  gap?: Gap;
  className?: string;
}

interface ResponsiveFlexProps extends FlexProps {
  xs?: Partial<FlexProps>;
  sm?: Partial<FlexProps>;
  md?: Partial<FlexProps>;
  lg?: Partial<FlexProps>;
  xl?: Partial<FlexProps>;
}

const getFlexClasses = (props: Partial<FlexProps>) => {
  const classes = [];
  
  if (props.direction === 'column') classes.push('flex-col');
  else classes.push('flex-row');
  
  if (props.justify) {
    switch (props.justify) {
      case 'start': classes.push('justify-start'); break;
      case 'end': classes.push('justify-end'); break;
      case 'center': classes.push('justify-center'); break;
      case 'between': classes.push('justify-between'); break;
      case 'around': classes.push('justify-around'); break;
      case 'evenly': classes.push('justify-evenly'); break;
    }
  }
  
  if (props.align) {
    switch (props.align) {
      case 'start': classes.push('items-start'); break;
      case 'end': classes.push('items-end'); break;
      case 'center': classes.push('items-center'); break;
      case 'baseline': classes.push('items-baseline'); break;
      case 'stretch': classes.push('items-stretch'); break;
    }
  }
  
  if (props.wrap) {
    switch (props.wrap) {
      case 'nowrap': classes.push('flex-nowrap'); break;
      case 'wrap': classes.push('flex-wrap'); break;
      case 'wrap-reverse': classes.push('flex-wrap-reverse'); break;
    }
  }
  
  if (props.gap) {
    switch (props.gap) {
      case 'none': classes.push('gap-0'); break;
      case 'sm': classes.push('gap-2'); break;
      case 'md': classes.push('gap-4'); break;
      case 'lg': classes.push('gap-6'); break;
      case 'xl': classes.push('gap-8'); break;
    }
  }
  
  return classes;
};

export const Flex: React.FC<FlexProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  const classes = getFlexClasses(props);
  
  return (
    <div className={cn('flex', ...classes, className)}>
      {children}
    </div>
  );
};

export const ResponsiveFlex: React.FC<ResponsiveFlexProps> = ({ 
  children, 
  className,
  xs,
  sm,
  md,
  lg,
  xl,
  ...baseProps 
}) => {
  const baseClasses = getFlexClasses(baseProps);
  const xsClasses = xs ? getFlexClasses(xs).map(c => `xs:${c}`) : [];
  const smClasses = sm ? getFlexClasses(sm).map(c => `sm:${c}`) : [];
  const mdClasses = md ? getFlexClasses(md).map(c => `md:${c}`) : [];
  const lgClasses = lg ? getFlexClasses(lg).map(c => `lg:${c}`) : [];
  const xlClasses = xl ? getFlexClasses(xl).map(c => `xl:${c}`) : [];
  
  return (
    <div className={cn(
      'flex',
      'max-w-7xl mx-auto px-4',
      ...baseClasses,
      ...xsClasses,
      ...smClasses,
      ...mdClasses,
      ...lgClasses,
      ...xlClasses,
      className
    )}>
      {children}
    </div>
  );
};

export const FlexItem: React.FC<{
  children: ReactNode;
  flex?: 'none' | 'auto' | '1' | 'initial';
  order?: number;
  className?: string;
}> = ({ children, flex, order, className }) => {
  const classes = [];
  
  if (flex) {
    switch (flex) {
      case 'none': classes.push('flex-none'); break;
      case 'auto': classes.push('flex-auto'); break;
      case '1': classes.push('flex-1'); break;
      case 'initial': classes.push('flex-initial'); break;
    }
  }
  
  if (order !== undefined) {
    classes.push(`order-${order}`);
  }
  
  return (
    <div className={cn(...classes, className)}>
      {children}
    </div>
  );
};
