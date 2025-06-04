import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import { breakpoints } from '../../styles/breakpoints';

interface ResponsiveTextProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small';
  as?: keyof JSX.IntrinsicElements;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
}

const getFontSize = (variant: string) => {
  switch (variant) {
    case 'h1':
      return {
        xs: '2rem',
        sm: '2.5rem',
        md: '3rem',
        lg: '3.5rem',
        xl: '4rem'
      };
    case 'h2':
      return {
        xs: '1.75rem',
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
        xl: '3.5rem'
      };
    case 'h3':
      return {
        xs: '1.5rem',
        sm: '1.75rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem'
      };
    case 'h4':
      return {
        xs: '1.25rem',
        sm: '1.5rem',
        md: '1.75rem',
        lg: '2rem',
        xl: '2.5rem'
      };
    case 'h5':
      return {
        xs: '1.125rem',
        sm: '1.25rem',
        md: '1.5rem',
        lg: '1.75rem',
        xl: '2rem'
      };
    case 'h6':
      return {
        xs: '1rem',
        sm: '1.125rem',
        md: '1.25rem',
        lg: '1.5rem',
        xl: '1.75rem'
      };
    case 'body':
      return {
        xs: '1rem',
        sm: '1.125rem',
        md: '1.25rem',
        lg: '1.375rem',
        xl: '1.5rem'
      };
    case 'small':
      return {
        xs: '0.875rem',
        sm: '0.9375rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem'
      };
    default:
      return {
        xs: '1rem',
        sm: '1.125rem',
        md: '1.25rem',
        lg: '1.375rem',
        xl: '1.5rem'
      };
  }
};

const getFontWeight = (weight?: string) => {
  switch (weight) {
    case 'normal':
      return '400';
    case 'medium':
      return '500';
    case 'semibold':
      return '600';
    case 'bold':
      return '700';
    default:
      return '400';
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
  const fontSize = getFontSize(variant);
  const styles = css`
    font-size: ${fontSize.xs};
    font-weight: ${getFontWeight(weight)};
    text-align: ${align};
    ${color && `color: ${color};`}

    @media (min-width: ${breakpoints.sm}) {
      font-size: ${fontSize.sm};
    }

    @media (min-width: ${breakpoints.md}) {
      font-size: ${fontSize.md};
    }

    @media (min-width: ${breakpoints.lg}) {
      font-size: ${fontSize.lg};
    }

    @media (min-width: ${breakpoints.xl}) {
      font-size: ${fontSize.xl};
    }
  `;

  const Component = as || (variant.startsWith('h') ? variant : 'p');

  return (
    <Component className={className} css={styles}>
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
  ...props
}) => {
  const styles = css`
    max-width: ${maxWidth};
  `;

  return <Body {...props} css={styles} />;
};

// Text gradient component
interface TextGradientProps extends Omit<ResponsiveTextProps, 'variant'> {
  gradient: string;
}

export const TextGradient: React.FC<TextGradientProps> = ({
  gradient,
  ...props
}) => {
  const styles = css`
    background: ${gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `;

  return <ResponsiveText {...props} css={styles} />;
};

// Text truncate component
interface TextTruncateProps extends Omit<ResponsiveTextProps, 'variant'> {
  lines?: number;
}

export const TextTruncate: React.FC<TextTruncateProps> = ({
  lines = 1,
  ...props
}) => {
  const styles = css`
    display: -webkit-box;
    -webkit-line-clamp: ${lines};
    -webkit-box-orient: vertical;
    overflow: hidden;
  `;

  return <ResponsiveText {...props} css={styles} />;
}; 