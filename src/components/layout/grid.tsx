
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Gap = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface GridProps {
  children: ReactNode;
  cols?: Columns;
  gap?: Gap;
  className?: string;
}

interface ResponsiveGridProps extends GridProps {
  xs?: Partial<GridProps>;
  sm?: Partial<GridProps>;
  md?: Partial<GridProps>;
  lg?: Partial<GridProps>;
  xl?: Partial<GridProps>;
}

const getGridClasses = (props: Partial<GridProps>) => {
  const classes = [];
  
  if (props.cols) {
    classes.push(`grid-cols-${props.cols}`);
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

export const Grid: React.FC<GridProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  const classes = getGridClasses(props);
  
  return (
    <div className={cn('grid', ...classes, className)}>
      {children}
    </div>
  );
};

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ 
  children, 
  className,
  xs,
  sm,
  md,
  lg,
  xl,
  ...baseProps 
}) => {
  const baseClasses = getGridClasses(baseProps);
  const xsClasses = xs ? getGridClasses(xs).map(c => `xs:${c}`) : [];
  const smClasses = sm ? getGridClasses(sm).map(c => `sm:${c}`) : [];
  const mdClasses = md ? getGridClasses(md).map(c => `md:${c}`) : [];
  const lgClasses = lg ? getGridClasses(lg).map(c => `lg:${c}`) : [];
  const xlClasses = xl ? getGridClasses(xl).map(c => `xl:${c}`) : [];
  
  return (
    <div className={cn(
      'grid',
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

export const GridItem: React.FC<{
  children: ReactNode;
  colSpan?: Columns;
  rowSpan?: number;
  className?: string;
}> = ({ children, colSpan, rowSpan, className }) => {
  const classes = [];
  
  if (colSpan) {
    classes.push(`col-span-${colSpan}`);
  }
  
  if (rowSpan) {
    classes.push(`row-span-${rowSpan}`);
  }
  
  return (
    <div className={cn(...classes, className)}>
      {children}
    </div>
  );
};
