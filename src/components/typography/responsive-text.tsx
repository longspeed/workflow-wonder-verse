
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'small';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TextAlign = 'left' | 'center' | 'right' | 'justify';

interface ResponsiveTextProps {
  children: ReactNode;
  variant: TextVariant;
  weight?: TextWeight;
  align?: TextAlign;
  color?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const getTextClasses = (variant: TextVariant, weight?: TextWeight, align?: TextAlign) => {
  const classes = [];
  
  // Base variant styles
  switch (variant) {
    case 'h1':
      classes.push('text-4xl md:text-5xl lg:text-6xl font-bold');
      break;
    case 'h2':
      classes.push('text-3xl md:text-4xl lg:text-5xl font-bold');
      break;
    case 'h3':
      classes.push('text-2xl md:text-3xl lg:text-4xl font-semibold');
      break;
    case 'h4':
      classes.push('text-xl md:text-2xl lg:text-3xl font-semibold');
      break;
    case 'h5':
      classes.push('text-lg md:text-xl lg:text-2xl font-medium');
      break;
    case 'h6':
      classes.push('text-base md:text-lg lg:text-xl font-medium');
      break;
    case 'body':
      classes.push('text-sm md:text-base lg:text-lg');
      break;
    case 'caption':
      classes.push('text-xs md:text-sm');
      break;
    case 'small':
      classes.push('text-xs');
      break;
  }
  
  // Weight
  if (weight) {
    switch (weight) {
      case 'normal': classes.push('font-normal'); break;
      case 'medium': classes.push('font-medium'); break;
      case 'semibold': classes.push('font-semibold'); break;
      case 'bold': classes.push('font-bold'); break;
    }
  }
  
  // Alignment
  if (align) {
    switch (align) {
      case 'left': classes.push('text-left'); break;
      case 'center': classes.push('text-center'); break;
      case 'right': classes.push('text-right'); break;
      case 'justify': classes.push('text-justify'); break;
    }
  }
  
  return classes;
};

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant,
  weight,
  align,
  color,
  className,
  as = 'div'
}) => {
  const classes = getTextClasses(variant, weight, align);
  const Component = as;
  
  return (
    <Component 
      className={cn(
        'max-w-4xl',
        ...classes,
        color && `text-${color}`,
        className
      )}
    >
      {children}
    </Component>
  );
};

// Convenience components
export const Heading: React.FC<Omit<ResponsiveTextProps, 'variant'> & { level: 1 | 2 | 3 | 4 | 5 | 6 }> = ({
  level,
  ...props
}) => {
  return (
    <ResponsiveText 
      variant={`h${level}` as TextVariant}
      as={`h${level}` as keyof JSX.IntrinsicElements}
      {...props}
    />
  );
};

export const Body: React.FC<Omit<ResponsiveTextProps, 'variant'>> = (props) => {
  return <ResponsiveText variant="body" as="p" {...props} />;
};

export const Caption: React.FC<Omit<ResponsiveTextProps, 'variant'>> = (props) => {
  return <ResponsiveText variant="caption" as="span" {...props} />;
};
