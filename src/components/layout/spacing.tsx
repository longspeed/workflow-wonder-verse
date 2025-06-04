import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import { breakpoints } from '../../styles/breakpoints';

interface SpacingProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'vertical' | 'horizontal' | 'both';
  className?: string;
}

const getSpacing = (size: string) => {
  switch (size) {
    case 'sm':
      return {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem'
      };
    case 'md':
      return {
        xs: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem'
      };
    case 'lg':
      return {
        xs: '1.5rem',
        sm: '2rem',
        md: '3rem',
        lg: '4rem',
        xl: '5rem'
      };
    case 'xl':
      return {
        xs: '2rem',
        sm: '3rem',
        md: '4rem',
        lg: '5rem',
        xl: '6rem'
      };
    default:
      return {
        xs: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem'
      };
  }
};

export const Spacing: React.FC<SpacingProps> = ({
  children,
  size = 'md',
  direction = 'vertical',
  className = '',
}) => {
  const spacing = getSpacing(size);
  const styles = css`
    ${direction === 'vertical' && css`
      margin-top: ${spacing.xs};
      margin-bottom: ${spacing.xs};

      @media (min-width: ${breakpoints.sm}) {
        margin-top: ${spacing.sm};
        margin-bottom: ${spacing.sm};
      }

      @media (min-width: ${breakpoints.md}) {
        margin-top: ${spacing.md};
        margin-bottom: ${spacing.md};
      }

      @media (min-width: ${breakpoints.lg}) {
        margin-top: ${spacing.lg};
        margin-bottom: ${spacing.lg};
      }

      @media (min-width: ${breakpoints.xl}) {
        margin-top: ${spacing.xl};
        margin-bottom: ${spacing.xl};
      }
    `}

    ${direction === 'horizontal' && css`
      margin-left: ${spacing.xs};
      margin-right: ${spacing.xs};

      @media (min-width: ${breakpoints.sm}) {
        margin-left: ${spacing.sm};
        margin-right: ${spacing.sm};
      }

      @media (min-width: ${breakpoints.md}) {
        margin-left: ${spacing.md};
        margin-right: ${spacing.md};
      }

      @media (min-width: ${breakpoints.lg}) {
        margin-left: ${spacing.lg};
        margin-right: ${spacing.lg};
      }

      @media (min-width: ${breakpoints.xl}) {
        margin-left: ${spacing.xl};
        margin-right: ${spacing.xl};
      }
    `}

    ${direction === 'both' && css`
      margin: ${spacing.xs};

      @media (min-width: ${breakpoints.sm}) {
        margin: ${spacing.sm};
      }

      @media (min-width: ${breakpoints.md}) {
        margin: ${spacing.md};
      }

      @media (min-width: ${breakpoints.lg}) {
        margin: ${spacing.lg};
      }

      @media (min-width: ${breakpoints.xl}) {
        margin: ${spacing.xl};
      }
    `}
  `;

  return (
    <div className={className} css={styles}>
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
  const spacing = getSpacing(size);
  const styles = css`
    ${top && css`
      margin-top: ${spacing.xs};

      @media (min-width: ${breakpoints.sm}) {
        margin-top: ${spacing.sm};
      }

      @media (min-width: ${breakpoints.md}) {
        margin-top: ${spacing.md};
      }

      @media (min-width: ${breakpoints.lg}) {
        margin-top: ${spacing.lg};
      }

      @media (min-width: ${breakpoints.xl}) {
        margin-top: ${spacing.xl};
      }
    `}

    ${bottom && css`
      margin-bottom: ${spacing.xs};

      @media (min-width: ${breakpoints.sm}) {
        margin-bottom: ${spacing.sm};
      }

      @media (min-width: ${breakpoints.md}) {
        margin-bottom: ${spacing.md};
      }

      @media (min-width: ${breakpoints.lg}) {
        margin-bottom: ${spacing.lg};
      }

      @media (min-width: ${breakpoints.xl}) {
        margin-bottom: ${spacing.xl};
      }
    `}
  `;

  return (
    <div className={className} css={styles}>
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
  const spacing = getSpacing(size);
  const styles = css`
    display: inline-block;
    margin: ${spacing.xs};

    @media (min-width: ${breakpoints.sm}) {
      margin: ${spacing.sm};
    }

    @media (min-width: ${breakpoints.md}) {
      margin: ${spacing.md};
    }

    @media (min-width: ${breakpoints.lg}) {
      margin: ${spacing.lg};
    }

    @media (min-width: ${breakpoints.xl}) {
      margin: ${spacing.xl};
    }
  `;

  return (
    <div className={className} css={styles}>
      {children}
    </div>
  );
}; 