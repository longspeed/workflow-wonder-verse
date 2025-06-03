import React from 'react';
import { css } from '@emotion/react';
import { responsiveSpacing } from '../../styles/breakpoints';

interface SpacingProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'vertical' | 'horizontal' | 'both';
  className?: string;
}

export const Spacing: React.FC<SpacingProps> = ({
  children,
  size = 'md',
  direction = 'both',
  className,
}) => {
  const getSpacing = (size: string) => {
    switch (size) {
      case 'sm':
        return {
          xs: '16px',
          sm: '24px',
          md: '32px',
          lg: '48px',
          xl: '64px',
        };
      case 'md':
        return {
          xs: '24px',
          sm: '32px',
          md: '48px',
          lg: '64px',
          xl: '96px',
        };
      case 'lg':
        return {
          xs: '32px',
          sm: '48px',
          md: '64px',
          lg: '96px',
          xl: '128px',
        };
      case 'xl':
        return {
          xs: '48px',
          sm: '64px',
          md: '96px',
          lg: '128px',
          xl: '192px',
        };
      default:
        return {
          xs: '24px',
          sm: '32px',
          md: '48px',
          lg: '64px',
          xl: '96px',
        };
    }
  };

  const spacing = getSpacing(size);

  const spacingStyles = css`
    /* Base spacing */
    ${direction === 'vertical' || direction === 'both'
      ? `
        margin-top: ${spacing.xs};
        margin-bottom: ${spacing.xs};
      `
      : ''}
    ${direction === 'horizontal' || direction === 'both'
      ? `
        margin-left: ${spacing.xs};
        margin-right: ${spacing.xs};
      `
      : ''}

    /* Responsive spacing */
    @media (min-width: 640px) {
      ${direction === 'vertical' || direction === 'both'
        ? `
          margin-top: ${spacing.sm};
          margin-bottom: ${spacing.sm};
        `
        : ''}
      ${direction === 'horizontal' || direction === 'both'
        ? `
          margin-left: ${spacing.sm};
          margin-right: ${spacing.sm};
        `
        : ''}
    }

    @media (min-width: 768px) {
      ${direction === 'vertical' || direction === 'both'
        ? `
          margin-top: ${spacing.md};
          margin-bottom: ${spacing.md};
        `
        : ''}
      ${direction === 'horizontal' || direction === 'both'
        ? `
          margin-left: ${spacing.md};
          margin-right: ${spacing.md};
        `
        : ''}
    }

    @media (min-width: 1024px) {
      ${direction === 'vertical' || direction === 'both'
        ? `
          margin-top: ${spacing.lg};
          margin-bottom: ${spacing.lg};
        `
        : ''}
      ${direction === 'horizontal' || direction === 'both'
        ? `
          margin-left: ${spacing.lg};
          margin-right: ${spacing.lg};
        `
        : ''}
    }

    @media (min-width: 1280px) {
      ${direction === 'vertical' || direction === 'both'
        ? `
          margin-top: ${spacing.xl};
          margin-bottom: ${spacing.xl};
        `
        : ''}
      ${direction === 'horizontal' || direction === 'both'
        ? `
          margin-left: ${spacing.xl};
          margin-right: ${spacing.xl};
        `
        : ''}
    }
  `;

  return (
    <div css={spacingStyles} className={className}>
      {children}
    </div>
  );
};

// Vertical spacing component
interface VerticalSpacingProps extends Omit<SpacingProps, 'direction'> {}

export const VerticalSpacing: React.FC<VerticalSpacingProps> = (props) => (
  <Spacing direction="vertical" {...props} />
);

// Horizontal spacing component
interface HorizontalSpacingProps extends Omit<SpacingProps, 'direction'> {}

export const HorizontalSpacing: React.FC<HorizontalSpacingProps> = (props) => (
  <Spacing direction="horizontal" {...props} />
);

// Section spacing component
interface SectionSpacingProps extends Omit<SpacingProps, 'direction' | 'size'> {
  top?: boolean;
  bottom?: boolean;
}

export const SectionSpacing: React.FC<SectionSpacingProps> = ({
  top = true,
  bottom = true,
  ...props
}) => {
  const sectionStyles = css`
    ${top ? 'margin-top: 0;' : ''}
    ${bottom ? 'margin-bottom: 0;' : ''}
  `;

  return (
    <Spacing
      direction="vertical"
      size="lg"
      css={sectionStyles}
      {...props}
    />
  );
};

// Inline spacing component
interface InlineSpacingProps extends Omit<SpacingProps, 'direction' | 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const InlineSpacing: React.FC<InlineSpacingProps> = ({
  size = 'md',
  ...props
}) => {
  const getInlineSpacing = (size: string) => {
    switch (size) {
      case 'xs':
        return '4px';
      case 'sm':
        return '8px';
      case 'md':
        return '16px';
      case 'lg':
        return '24px';
      default:
        return '16px';
    }
  };

  const inlineStyles = css`
    display: inline-block;
    margin-right: ${getInlineSpacing(size)};

    &:last-child {
      margin-right: 0;
    }
  `;

  return <div css={inlineStyles} {...props} />;
}; 