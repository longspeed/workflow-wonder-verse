import React from 'react';
import { css } from '@emotion/react';
import { gridColumns, gridGutters } from '../../styles/breakpoints';

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: string;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 12,
  gap = '24px',
  className,
}) => {
  const gridStyles = css`
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    gap: ${gap};
  `;

  return (
    <div css={gridStyles} className={className}>
      {children}
    </div>
  );
};

// Grid item props
interface GridItemProps {
  children: React.ReactNode;
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
  className,
}) => {
  const itemStyles = css`
    ${span ? `grid-column: span ${span};` : ''}
    ${start ? `grid-column-start: ${start};` : ''}
    ${end ? `grid-column-end: ${end};` : ''}
  `;

  return (
    <div css={itemStyles} className={className}>
      {children}
    </div>
  );
};

// Responsive grid props
interface ResponsiveGridProps extends GridProps {
  breakpoints?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  breakpoints = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
    '2xl': 6,
  },
  gap = '24px',
  className,
}) => {
  const responsiveStyles = css`
    display: grid;
    gap: ${gap};

    /* Base grid */
    grid-template-columns: repeat(${breakpoints.xs}, 1fr);

    /* Responsive breakpoints */
    @media (min-width: 640px) {
      grid-template-columns: repeat(${breakpoints.sm}, 1fr);
    }

    @media (min-width: 768px) {
      grid-template-columns: repeat(${breakpoints.md}, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(${breakpoints.lg}, 1fr);
    }

    @media (min-width: 1280px) {
      grid-template-columns: repeat(${breakpoints.xl}, 1fr);
    }

    @media (min-width: 1536px) {
      grid-template-columns: repeat(${breakpoints['2xl']}, 1fr);
    }
  `;

  return (
    <div css={responsiveStyles} className={className}>
      {children}
    </div>
  );
};

// Auto grid props
interface AutoGridProps extends Omit<GridProps, 'columns'> {
  minWidth?: string;
  maxWidth?: string;
}

export const AutoGrid: React.FC<AutoGridProps> = ({
  children,
  minWidth = '250px',
  maxWidth = '1fr',
  gap = '24px',
  className,
}) => {
  const autoStyles = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${minWidth}, ${maxWidth}));
    gap: ${gap};
  `;

  return (
    <div css={autoStyles} className={className}>
      {children}
    </div>
  );
};

// Masonry grid props
interface MasonryGridProps extends Omit<GridProps, 'columns'> {
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  columns = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
    '2xl': 6,
  },
  gap = '24px',
  className,
}) => {
  const masonryStyles = css`
    display: grid;
    gap: ${gap};
    grid-auto-rows: 0;
    grid-template-rows: masonry;

    /* Base grid */
    grid-template-columns: repeat(${columns.xs}, 1fr);

    /* Responsive breakpoints */
    @media (min-width: 640px) {
      grid-template-columns: repeat(${columns.sm}, 1fr);
    }

    @media (min-width: 768px) {
      grid-template-columns: repeat(${columns.md}, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(${columns.lg}, 1fr);
    }

    @media (min-width: 1280px) {
      grid-template-columns: repeat(${columns.xl}, 1fr);
    }

    @media (min-width: 1536px) {
      grid-template-columns: repeat(${columns['2xl']}, 1fr);
    }
  `;

  return (
    <div css={masonryStyles} className={className}>
      {children}
    </div>
  );
};

// Grid container props
interface GridContainerProps extends ResponsiveGridProps {
  maxWidth?: string;
  padding?: boolean;
}

export const GridContainer: React.FC<GridContainerProps> = ({
  children,
  maxWidth = '1200px',
  padding = true,
  ...props
}) => {
  const containerStyles = css`
    width: 100%;
    max-width: ${maxWidth};
    margin-left: auto;
    margin-right: auto;
    padding-left: ${padding ? '24px' : 0};
    padding-right: ${padding ? '24px' : 0};

    @media (min-width: 640px) {
      padding-left: ${padding ? '32px' : 0};
      padding-right: ${padding ? '32px' : 0};
    }

    @media (min-width: 768px) {
      padding-left: ${padding ? '48px' : 0};
      padding-right: ${padding ? '48px' : 0};
    }
  `;

  return (
    <div css={containerStyles}>
      <ResponsiveGrid {...props}>{children}</ResponsiveGrid>
    </div>
  );
}; 