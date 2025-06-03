import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import { breakpoints } from '../../styles/breakpoints';

interface GridProps {
  children: ReactNode;
  columns?: number;
  gap?: string;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 1,
  gap = '1rem',
  className = '',
}) => {
  const styles = css`
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    gap: ${gap};
  `;

  return (
    <div className={className} css={styles}>
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
  const styles = css`
    ${span && `grid-column: span ${span};`}
    ${start && `grid-column-start: ${start};`}
    ${end && `grid-column-end: ${end};`}
  `;

  return (
    <div className={className} css={styles}>
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
  xs,
  sm,
  md,
  lg,
  xl,
  '2xl': twoXl,
  ...baseProps
}) => {
  const styles = css`
    ${baseProps && css`
      display: grid;
      grid-template-columns: repeat(${baseProps.columns || 1}, 1fr);
      gap: ${baseProps.gap || '1rem'};
    `}

    ${xs && css`
      @media (min-width: ${breakpoints.xs}) {
        grid-template-columns: repeat(${xs.columns || baseProps.columns || 1}, 1fr);
        gap: ${xs.gap || baseProps.gap || '1rem'};
      }
    `}

    ${sm && css`
      @media (min-width: ${breakpoints.sm}) {
        grid-template-columns: repeat(${sm.columns || xs?.columns || baseProps.columns || 1}, 1fr);
        gap: ${sm.gap || xs?.gap || baseProps.gap || '1rem'};
      }
    `}

    ${md && css`
      @media (min-width: ${breakpoints.md}) {
        grid-template-columns: repeat(${md.columns || sm?.columns || xs?.columns || baseProps.columns || 1}, 1fr);
        gap: ${md.gap || sm?.gap || xs?.gap || baseProps.gap || '1rem'};
      }
    `}

    ${lg && css`
      @media (min-width: ${breakpoints.lg}) {
        grid-template-columns: repeat(${lg.columns || md?.columns || sm?.columns || xs?.columns || baseProps.columns || 1}, 1fr);
        gap: ${lg.gap || md?.gap || sm?.gap || xs?.gap || baseProps.gap || '1rem'};
      }
    `}

    ${xl && css`
      @media (min-width: ${breakpoints.xl}) {
        grid-template-columns: repeat(${xl.columns || lg?.columns || md?.columns || sm?.columns || xs?.columns || baseProps.columns || 1}, 1fr);
        gap: ${xl.gap || lg?.gap || md?.gap || sm?.gap || xs?.gap || baseProps.gap || '1rem'};
      }
    `}

    ${twoXl && css`
      @media (min-width: ${breakpoints['2xl']}) {
        grid-template-columns: repeat(${twoXl.columns || xl?.columns || lg?.columns || md?.columns || sm?.columns || xs?.columns || baseProps.columns || 1}, 1fr);
        gap: ${twoXl.gap || xl?.gap || lg?.gap || md?.gap || sm?.gap || xs?.gap || baseProps.gap || '1rem'};
      }
    `}
  `;

  return (
    <div className={baseProps.className} css={styles}>
      {children}
    </div>
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
  gap = '1rem',
  className = '',
}) => {
  const styles = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr));
    grid-template-columns: repeat(auto-fit, minmax(min(${minWidth}, 100%), 1fr));
    gap: ${gap};
    max-width: calc(${minWidth} * ${maxColumns} + ${gap} * (${maxColumns} - 1));
  `;

  return (
    <div className={className} css={styles}>
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
  gap?: string;
  className?: string;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = '1rem',
  className = '',
}) => {
  const styles = css`
    display: grid;
    grid-template-columns: repeat(${columns.xs || 1}, 1fr);
    gap: ${gap};

    @media (min-width: ${breakpoints.sm}) {
      grid-template-columns: repeat(${columns.sm || columns.xs || 1}, 1fr);
    }

    @media (min-width: ${breakpoints.md}) {
      grid-template-columns: repeat(${columns.md || columns.sm || columns.xs || 1}, 1fr);
    }

    @media (min-width: ${breakpoints.lg}) {
      grid-template-columns: repeat(${columns.lg || columns.md || columns.sm || columns.xs || 1}, 1fr);
    }

    @media (min-width: ${breakpoints.xl}) {
      grid-template-columns: repeat(${columns.xl || columns.lg || columns.md || columns.sm || columns.xs || 1}, 1fr);
    }

    @media (min-width: ${breakpoints['2xl']}) {
      grid-template-columns: repeat(${columns['2xl'] || columns.xl || columns.lg || columns.md || columns.sm || columns.xs || 1}, 1fr);
    }
  `;

  return (
    <div className={className} css={styles}>
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
  ...props
}) => {
  const styles = css`
    max-width: ${maxWidth};
    padding: ${padding};
    margin: 0 auto;
  `;

  return (
    <ResponsiveGrid {...props} className={props.className} css={styles}>
      {children}
    </ResponsiveGrid>
  );
}; 