
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveTextProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small';
  as?: keyof JSX.IntrinsicElements;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
}

const getVariantClasses = (variant: string) => {
  switch (variant) {
    case 'h1':
      return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold';
    case 'h2':
      return 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold';
    case 'h3':
      return 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold';
    case 'h4':
      return 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold';
    case 'h5':
      return 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold';
    case 'h6':
      return 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold';
    case 'body':
      return 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl';
    case 'small':
      return 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl';
    default:
      return 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl';
  }
};

const getWeightClass = (weight?: string) => {
  switch (weight) {
    case 'normal': return 'font-normal';
    case 'medium': return 'font-medium';
    case 'semibold': return 'font-semibold';
    case 'bold': return 'font-bold';
    default: return 'font-normal';
  }
};

const getAlignClass = (align?: string) => {
  switch (align) {
    case 'left': return 'text-left';
    case 'center': return 'text-center';
    case 'right': return 'text-right';
    case 'justify': return 'text-justify';
    default: return 'text-left';
  }
};

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant = 'body',
  as,
  color,
  align = 'left',
  weight,
  className = '',
}) => {
  const Component = as || (variant.startsWith('h') ? variant : 'p') as keyof JSX.IntrinsicElements;

  const classes = cn(
    getVariantClasses(variant),
    getWeightClass(weight),
    getAlignClass(align),
    className
  );

  const style = color ? { color } : undefined;

  return (
    <Component className={classes} style={style}>
      {children}
    </Component>
  );
};

// Heading components
export const H1: React.FC<Omit<ResponsiveTextProps, 'variant'>> = (props) => (
  <ResponsiveText variant="h1" {...props} />
);

export const H2: React.FC<Omit<ResponsiveTextProps, 'variant'>> = (props) => (
  <ResponsiveText variant="h2" {...props} />
);

export const H3: React.FC<Omit<ResponsiveTextProps, 'variant'>> = (props) => (
  <ResponsiveText variant="h3" {...props} />
);

export const H4: React.FC<Omit<ResponsiveTextProps, 'variant'>> = (props) => (
  <ResponsiveText variant="h4" {...props} />
);

export const H5: React.FC<Omit<ResponsiveTextProps, 'variant'>> = (props) => (
  <ResponsiveText variant="h5" {...props} />
);

export const H6: React.FC<Omit<ResponsiveTextProps, 'variant'>> = (props) => (
  <ResponsiveText variant="h6" {...props} />
);

// Body text components
export const Body: React.FC<Omit<ResponsiveTextProps, 'variant'>> = (props) => (
  <ResponsiveText variant="body" {...props} />
);

export const Small: React.FC<Omit<ResponsiveTextProps, 'variant'>> = (props) => (
  <ResponsiveText variant="small" {...props} />
);

// Text block component
interface TextBlockProps extends Omit<ResponsiveTextProps, 'variant'> {
  maxWidth?: string;
}

export const TextBlock: React.FC<TextBlockProps> = ({
  maxWidth = '65ch',
  className,
  ...props
}) => {
  return (
    <Body 
      {...props} 
      className={cn('max-w-prose', className)}
      style={{ maxWidth }}
    />
  );
};

// Text gradient component
interface TextGradientProps extends Omit<ResponsiveTextProps, 'variant'> {
  gradient: string;
}

export const TextGradient: React.FC<TextGradientProps> = ({
  gradient,
  className,
  ...props
}) => {
  return (
    <ResponsiveText 
      {...props} 
      className={cn('bg-gradient-to-r bg-clip-text text-transparent', className)}
      style={{ backgroundImage: gradient }}
    />
  );
};

// Text truncate component
interface TextTruncateProps extends Omit<ResponsiveTextProps, 'variant'> {
  lines?: number;
}

export const TextTruncate: React.FC<TextTruncateProps> = ({
  lines = 1,
  className,
  ...props
}) => {
  const truncateClass = lines === 1 
    ? 'truncate' 
    : `line-clamp-${lines}`;

  return (
    <ResponsiveText 
      {...props} 
      className={cn(truncateClass, className)}
    />
  );
};
