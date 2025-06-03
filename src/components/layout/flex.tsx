import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import { breakpoints } from '../../styles/breakpoints';

interface FlexProps {
  children: ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
  className?: string;
}

const getJustifyContent = (justify?: string) => {
  switch (justify) {
    case 'start': return 'flex-start';
    case 'end': return 'flex-end';
    case 'center': return 'center';
    case 'between': return 'space-between';
    case 'around': return 'space-around';
    case 'evenly': return 'space-evenly';
    default: return 'flex-start';
  }
};

const getAlignItems = (align?: string) => {
  switch (align) {
    case 'start': return 'flex-start';
    case 'end': return 'flex-end';
    case 'center': return 'center';
    case 'stretch': return 'stretch';
    case 'baseline': return 'baseline';
    default: return 'stretch';
  }
};

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  wrap = 'nowrap',
  gap = '0',
  className = '',
}) => {
  const styles = css`
    display: flex;
    flex-direction: ${direction};
    justify-content: ${getJustifyContent(justify)};
    align-items: ${getAlignItems(align)};
    flex-wrap: ${wrap};
    gap: ${gap};
  `;

  return (
    <div className={className} css={styles}>
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
      display: flex;
      flex-direction: ${baseProps.direction || 'row'};
      justify-content: ${getJustifyContent(baseProps.justify)};
      align-items: ${getAlignItems(baseProps.align)};
      flex-wrap: ${baseProps.wrap || 'nowrap'};
      gap: ${baseProps.gap || '0'};
    `}

    ${xs && css`
      @media (min-width: ${breakpoints.xs}) {
        flex-direction: ${xs.direction || baseProps.direction || 'row'};
        justify-content: ${getJustifyContent(xs.justify || baseProps.justify)};
        align-items: ${getAlignItems(xs.align || baseProps.align)};
        flex-wrap: ${xs.wrap || baseProps.wrap || 'nowrap'};
        gap: ${xs.gap || baseProps.gap || '0'};
      }
    `}

    ${sm && css`
      @media (min-width: ${breakpoints.sm}) {
        flex-direction: ${sm.direction || xs?.direction || baseProps.direction || 'row'};
        justify-content: ${getJustifyContent(sm.justify || xs?.justify || baseProps.justify)};
        align-items: ${getAlignItems(sm.align || xs?.align || baseProps.align)};
        flex-wrap: ${sm.wrap || xs?.wrap || baseProps.wrap || 'nowrap'};
        gap: ${sm.gap || xs?.gap || baseProps.gap || '0'};
      }
    `}

    ${md && css`
      @media (min-width: ${breakpoints.md}) {
        flex-direction: ${md.direction || sm?.direction || xs?.direction || baseProps.direction || 'row'};
        justify-content: ${getJustifyContent(md.justify || sm?.justify || xs?.justify || baseProps.justify)};
        align-items: ${getAlignItems(md.align || sm?.align || xs?.align || baseProps.align)};
        flex-wrap: ${md.wrap || sm?.wrap || xs?.wrap || baseProps.wrap || 'nowrap'};
        gap: ${md.gap || sm?.gap || xs?.gap || baseProps.gap || '0'};
      }
    `}

    ${lg && css`
      @media (min-width: ${breakpoints.lg}) {
        flex-direction: ${lg.direction || md?.direction || sm?.direction || xs?.direction || baseProps.direction || 'row'};
        justify-content: ${getJustifyContent(lg.justify || md?.justify || sm?.justify || xs?.justify || baseProps.justify)};
        align-items: ${getAlignItems(lg.align || md?.align || sm?.align || xs?.align || baseProps.align)};
        flex-wrap: ${lg.wrap || md?.wrap || sm?.wrap || xs?.wrap || baseProps.wrap || 'nowrap'};
        gap: ${lg.gap || md?.gap || sm?.gap || xs?.gap || baseProps.gap || '0'};
      }
    `}

    ${xl && css`
      @media (min-width: ${breakpoints.xl}) {
        flex-direction: ${xl.direction || lg?.direction || md?.direction || sm?.direction || xs?.direction || baseProps.direction || 'row'};
        justify-content: ${getJustifyContent(xl.justify || lg?.justify || md?.justify || sm?.justify || xs?.justify || baseProps.justify)};
        align-items: ${getAlignItems(xl.align || lg?.align || md?.align || sm?.align || xs?.align || baseProps.align)};
        flex-wrap: ${xl.wrap || lg?.wrap || md?.wrap || sm?.wrap || xs?.wrap || baseProps.wrap || 'nowrap'};
        gap: ${xl.gap || lg?.gap || md?.gap || sm?.gap || xs?.gap || baseProps.gap || '0'};
      }
    `}

    ${twoXl && css`
      @media (min-width: ${breakpoints['2xl']}) {
        flex-direction: ${twoXl.direction || xl?.direction || lg?.direction || md?.direction || sm?.direction || xs?.direction || baseProps.direction || 'row'};
        justify-content: ${getJustifyContent(twoXl.justify || xl?.justify || lg?.justify || md?.justify || sm?.justify || xs?.justify || baseProps.justify)};
        align-items: ${getAlignItems(twoXl.align || xl?.align || lg?.align || md?.align || sm?.align || xs?.align || baseProps.align)};
        flex-wrap: ${twoXl.wrap || xl?.wrap || lg?.wrap || md?.wrap || sm?.wrap || xs?.wrap || baseProps.wrap || 'nowrap'};
        gap: ${twoXl.gap || xl?.gap || lg?.gap || md?.gap || sm?.gap || xs?.gap || baseProps.gap || '0'};
      }
    `}
  `;

  return (
    <div className={baseProps.className} css={styles}>
      {children}
    </div>
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
  const styles = css`
    flex: ${grow} ${shrink} ${basis};
    order: ${order};
    align-self: ${align};
  `;

  return (
    <div className={className} css={styles}>
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
  ...props
}) => {
  const styles = css`
    max-width: ${maxWidth};
    padding: ${padding};
    margin: 0 auto;
  `;

  return (
    <ResponsiveFlex {...props} className={props.className} css={styles}>
      {children}
    </ResponsiveFlex>
  );
}; 