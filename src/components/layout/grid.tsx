
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GridProps {
  children: ReactNode;
  columns?: number;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const getGapClass = (gap?: string) => {
  switch (gap) {
    case 'none': return 'gap-0';
    case 'sm': return 'gap-2';
    case 'md': return 'gap-4';
    case 'lg': return 'gap-6';
    case 'xl': return 'gap-8';
    default: return 'gap-4';
  }
};

const getColumnsClass = (columns?: number) => {
  switch (columns) {
    case 1: return 'grid-cols-1';
    case 2: return 'grid-cols-2';
    case 3: return 'grid-cols-3';
    case 4: return 'grid-cols-4';
    case 5: return 'grid-cols-5';
    case 6: return 'grid-cols-6';
    case 12: return 'grid-cols-12';
    default: return 'grid-cols-1';
  }
};

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 1,
  gap = 'md',
  className = '',
}) => {
  const classes = cn(
    'grid',
    getColumnsClass(columns),
    getGapClass(gap),
    className
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

// Grid item props
interface GridItemProps {
  children: ReactNode;
  span?: number;
  start?: number;
  end?: number;
  className?: string;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  span,
  start,
  end,
  className = '',
}) => {
  const spanClass = span ? `col-span-${span}` : '';
  const startClass = start ? `col-start-${start}` : '';
  const endClass = end ? `col-end-${end}` : '';

  const classes = cn(spanClass, startClass, endClass, className);

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

// Responsive grid props
interface ResponsiveGridProps extends GridProps {
  xs?: Partial<GridProps>;
  sm?: Partial<GridProps>;
  md?: Partial<GridProps>;
  lg?: Partial<GridProps>;
  xl?: Partial<GridProps>;
  '2xl'?: Partial<GridProps>;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  ...baseProps
}) => {
  return (
    <Grid {...baseProps} className={className}>
      {children}
    </Grid>
  );
};

// Auto grid props
interface AutoGridProps extends GridProps {
  minWidth?: string;
  maxColumns?: number;
}

export const AutoGrid: React.FC<AutoGridProps> = ({
  children,
  minWidth = '250px',
  maxColumns = 4,
  gap = 'md',
  className = '',
}) => {
  const classes = cn(
    'grid',
    'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
    getGapClass(gap),
    className
  );

  return (
    <div className={classes} style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))` }}>
      {children}
    </div>
  );
};

// Masonry grid props
interface MasonryGridProps {
  children: ReactNode;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md',
  className = '',
}) => {
  const classes = cn(
    'grid',
    getColumnsClass(columns.xs || 1),
    `sm:${getColumnsClass(columns.sm || columns.xs || 1)}`,
    `md:${getColumnsClass(columns.md || columns.sm || columns.xs || 1)}`,
    `lg:${getColumnsClass(columns.lg || columns.md || columns.sm || columns.xs || 1)}`,
    `xl:${getColumnsClass(columns.xl || columns.lg || columns.md || columns.sm || columns.xs || 1)}`,
    getGapClass(gap),
    className
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

// Grid container props
interface GridContainerProps extends ResponsiveGridProps {
  maxWidth?: string;
  padding?: string;
}

export const GridContainer: React.FC<GridContainerProps> = ({
  children,
  maxWidth = '1200px',
  padding = '1rem',
  className = '',
  ...props
}) => {
  const classes = cn('mx-auto', className);

  return (
    <ResponsiveGrid 
      {...props} 
      className={classes}
      style={{ maxWidth, padding }}
    >
      {children}
    </ResponsiveGrid>
  );
};
