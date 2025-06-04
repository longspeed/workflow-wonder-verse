import React from 'react';
import { css } from '@emotion/react';
import { responsiveTypography } from '../../styles/breakpoints';

interface ResponsiveTextProps {
  children: React.ReactNode;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small';
  as?: keyof JSX.IntrinsicElements;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant,
  as,
  color,
  align = 'left',
  weight = 'normal',
  className,
}) => {
  const getFontWeight = (weight: string) => {
    switch (weight) {
      case 'medium':
        return 500;
      case 'semibold':
        return 600;
      case 'bold':
        return 700;
      default:
        return 400;
    }
  };

  const textStyles = css`
    margin: 0;
    color: ${color || 'inherit'};
    text-align: ${align};
    font-weight: ${getFontWeight(weight)};

    /* Responsive font sizes */
    font-size: ${responsiveTypography.xs[variant]};

    @media (min-width: 640px) {
      font-size: ${responsiveTypography.sm[variant]};
    }

    @media (min-width: 768px) {
      font-size: ${responsiveTypography.md[variant]};
    }

    @media (min-width: 1024px) {
      font-size: ${responsiveTypography.lg[variant]};
    }

    @media (min-width: 1280px) {
      font-size: ${responsiveTypography.xl[variant]};
    }

    @media (min-width: 1536px) {
      font-size: ${responsiveTypography['2xl'][variant]};
    }
  `;

  const Component = as || variant;

  return (
    <Component css={textStyles} className={className}>
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
  lineHeight?: string;
}

export const TextBlock: React.FC<TextBlockProps> = ({
  maxWidth = '65ch',
  lineHeight = '1.6',
  ...props
}) => {
  const blockStyles = css`
    max-width: ${maxWidth};
    line-height: ${lineHeight};
  `;

  return <Body css={blockStyles} {...props} />;
};

// Text gradient component
interface TextGradientProps extends Omit<ResponsiveTextProps, 'variant'> {
  gradient: string;
}

export const TextGradient: React.FC<TextGradientProps> = ({
  gradient,
  ...props
}) => {
  const gradientStyles = css`
    background: ${gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `;

  return <ResponsiveText css={gradientStyles} {...props} />;
};

// Text truncate component
interface TextTruncateProps extends Omit<ResponsiveTextProps, 'variant'> {
  lines?: number;
}

export const TextTruncate: React.FC<TextTruncateProps> = ({
  lines = 1,
  ...props
}) => {
  const truncateStyles = css`
    display: -webkit-box;
    -webkit-line-clamp: ${lines};
    -webkit-box-orient: vertical;
    overflow: hidden;
  `;

  return <ResponsiveText css={truncateStyles} {...props} />;
}; 