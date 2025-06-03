
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FlexProps {
  children: ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const getJustifyClass = (justify?: string) => {
  switch (justify) {
    case 'start': return 'justify-start';
    case 'end': return 'justify-end';
    case 'center': return 'justify-center';
    case 'between': return 'justify-between';
    case 'around': return 'justify-around';
    case 'evenly': return 'justify-evenly';
    default: return 'justify-start';
  }
};

const getAlignClass = (align?: string) => {
  switch (align) {
    case 'start': return 'items-start';
    case 'end': return 'items-end';
    case 'center': return 'items-center';
    case 'stretch': return 'items-stretch';
    case 'baseline': return 'items-baseline';
    default: return 'items-stretch';
  }
};

const getDirectionClass = (direction?: string) => {
  switch (direction) {
    case 'row': return 'flex-row';
    case 'column': return 'flex-col';
    case 'row-reverse': return 'flex-row-reverse';
    case 'column-reverse': return 'flex-col-reverse';
    default: return 'flex-row';
  }
};

const getWrapClass = (wrap?: string) => {
  switch (wrap) {
    case 'nowrap': return 'flex-nowrap';
    case 'wrap': return 'flex-wrap';
    case 'wrap-reverse': return 'flex-wrap-reverse';
    default: return 'flex-nowrap';
  }
};

const getGapClass = (gap?: string) => {
  switch (gap) {
    case 'none': return 'gap-0';
    case 'sm': return 'gap-2';
    case 'md': return 'gap-4';
    case 'lg': return 'gap-6';
    case 'xl': return 'gap-8';
    default: return 'gap-0';
  }
};

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  wrap = 'nowrap',
  gap = 'none',
  className = '',
}) => {
  const classes = cn(
    'flex',
    getDirectionClass(direction),
    getJustifyClass(justify),
    getAlignClass(align),
    getWrapClass(wrap),
    getGapClass(gap),
    className
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

interface ResponsiveFlexProps extends FlexProps {
  xs?: Partial<FlexProps>;
  sm?: Partial<FlexProps>;
  md?: Partial<FlexProps>;
  lg?: Partial<FlexProps>;
  xl?: Partial<FlexProps>;
  '2xl'?: Partial<FlexProps>;
}

export const ResponsiveFlex: React.FC<ResponsiveFlexProps> = ({
  children,
  className = '',
  ...baseProps
}) => {
  return (
    <Flex {...baseProps} className={className}>
      {children}
    </Flex>
  );
};

interface FlexItemProps {
  children: ReactNode;
  grow?: number;
  shrink?: number;
  basis?: string;
  order?: number;
  align?: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  className?: string;
}

export const FlexItem: React.FC<FlexItemProps> = ({
  children,
  grow = 0,
  shrink = 1,
  basis = 'auto',
  order = 0,
  align = 'auto',
  className = '',
}) => {
  const growClass = grow > 0 ? `flex-grow-${grow}` : '';
  const shrinkClass = shrink > 0 ? `flex-shrink-${shrink}` : 'flex-shrink-0';
  const orderClass = order > 0 ? `order-${order}` : '';
  const alignClass = align !== 'auto' ? `self-${align}` : '';

  const classes = cn(
    growClass,
    shrinkClass,
    orderClass,
    alignClass,
    className
  );

  return (
    <div className={classes} style={{ flexBasis: basis }}>
      {children}
    </div>
  );
};

interface FlexContainerProps extends ResponsiveFlexProps {
  maxWidth?: string;
  padding?: string;
}

export const FlexContainer: React.FC<FlexContainerProps> = ({
  children,
  maxWidth = '1200px',
  padding = '1rem',
  className = '',
  ...props
}) => {
  const classes = cn('mx-auto', className);

  return (
    <ResponsiveFlex 
      {...props} 
      className={classes}
      style={{ maxWidth, padding }}
    >
      {children}
    </ResponsiveFlex>
  );
};
