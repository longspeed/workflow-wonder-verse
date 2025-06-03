import React from 'react';
import { css } from '@emotion/react';

interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
  className?: string;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  wrap = 'nowrap',
  gap = '0',
  className,
}) => {
  const getJustifyContent = (justify: string) => {
    switch (justify) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      case 'center':
        return 'center';
      case 'between':
        return 'space-between';
      case 'around':
        return 'space-around';
      case 'evenly':
        return 'space-evenly';
      default:
        return 'flex-start';
    }
  };

  const getAlignItems = (align: string) => {
    switch (align) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      case 'center':
        return 'center';
      case 'stretch':
        return 'stretch';
      case 'baseline':
        return 'baseline';
      default:
        return 'stretch';
    }
  };

  const flexStyles = css`
    display: flex;
    flex-direction: ${direction};
    justify-content: ${getJustifyContent(justify)};
    align-items: ${getAlignItems(align)};
    flex-wrap: ${wrap};
    gap: ${gap};
  `;

  return (
    <div css={flexStyles} className={className}>
      {children}
    </div>
  );
};

// Responsive flex props
interface ResponsiveFlexProps extends FlexProps {
  breakpoints?: {
    xs?: Partial<Omit<FlexProps, 'children' | 'className'>>;
    sm?: Partial<Omit<FlexProps, 'children' | 'className'>>;
    md?: Partial<Omit<FlexProps, 'children' | 'className'>>;
    lg?: Partial<Omit<FlexProps, 'children' | 'className'>>;
    xl?: Partial<Omit<FlexProps, 'children' | 'className'>>;
    '2xl'?: Partial<Omit<FlexProps, 'children' | 'className'>>;
  };
}

export const ResponsiveFlex: React.FC<ResponsiveFlexProps> = ({
  children,
  breakpoints = {},
  ...props
}) => {
  const responsiveStyles = css`
    display: flex;
    flex-direction: ${props.direction || 'row'};
    justify-content: ${props.justify ? getJustifyContent(props.justify) : 'flex-start'};
    align-items: ${props.align ? getAlignItems(props.align) : 'stretch'};
    flex-wrap: ${props.wrap || 'nowrap'};
    gap: ${props.gap || '0'};

    /* Responsive breakpoints */
    ${breakpoints.xs && css`
      @media (min-width: 640px) {
        flex-direction: ${breakpoints.xs.direction || props.direction || 'row'};
        justify-content: ${breakpoints.xs.justify ? getJustifyContent(breakpoints.xs.justify) : props.justify ? getJustifyContent(props.justify) : 'flex-start'};
        align-items: ${breakpoints.xs.align ? getAlignItems(breakpoints.xs.align) : props.align ? getAlignItems(props.align) : 'stretch'};
        flex-wrap: ${breakpoints.xs.wrap || props.wrap || 'nowrap'};
        gap: ${breakpoints.xs.gap || props.gap || '0'};
      }
    `}

    ${breakpoints.sm && css`
      @media (min-width: 768px) {
        flex-direction: ${breakpoints.sm.direction || props.direction || 'row'};
        justify-content: ${breakpoints.sm.justify ? getJustifyContent(breakpoints.sm.justify) : props.justify ? getJustifyContent(props.justify) : 'flex-start'};
        align-items: ${breakpoints.sm.align ? getAlignItems(breakpoints.sm.align) : props.align ? getAlignItems(props.align) : 'stretch'};
        flex-wrap: ${breakpoints.sm.wrap || props.wrap || 'nowrap'};
        gap: ${breakpoints.sm.gap || props.gap || '0'};
      }
    `}

    ${breakpoints.md && css`
      @media (min-width: 1024px) {
        flex-direction: ${breakpoints.md.direction || props.direction || 'row'};
        justify-content: ${breakpoints.md.justify ? getJustifyContent(breakpoints.md.justify) : props.justify ? getJustifyContent(props.justify) : 'flex-start'};
        align-items: ${breakpoints.md.align ? getAlignItems(breakpoints.md.align) : props.align ? getAlignItems(props.align) : 'stretch'};
        flex-wrap: ${breakpoints.md.wrap || props.wrap || 'nowrap'};
        gap: ${breakpoints.md.gap || props.gap || '0'};
      }
    `}

    ${breakpoints.lg && css`
      @media (min-width: 1280px) {
        flex-direction: ${breakpoints.lg.direction || props.direction || 'row'};
        justify-content: ${breakpoints.lg.justify ? getJustifyContent(breakpoints.lg.justify) : props.justify ? getJustifyContent(props.justify) : 'flex-start'};
        align-items: ${breakpoints.lg.align ? getAlignItems(breakpoints.lg.align) : props.align ? getAlignItems(props.align) : 'stretch'};
        flex-wrap: ${breakpoints.lg.wrap || props.wrap || 'nowrap'};
        gap: ${breakpoints.lg.gap || props.gap || '0'};
      }
    `}

    ${breakpoints.xl && css`
      @media (min-width: 1536px) {
        flex-direction: ${breakpoints.xl.direction || props.direction || 'row'};
        justify-content: ${breakpoints.xl.justify ? getJustifyContent(breakpoints.xl.justify) : props.justify ? getJustifyContent(props.justify) : 'flex-start'};
        align-items: ${breakpoints.xl.align ? getAlignItems(breakpoints.xl.align) : props.align ? getAlignItems(props.align) : 'stretch'};
        flex-wrap: ${breakpoints.xl.wrap || props.wrap || 'nowrap'};
        gap: ${breakpoints.xl.gap || props.gap || '0'};
      }
    `}

    ${breakpoints['2xl'] && css`
      @media (min-width: 1536px) {
        flex-direction: ${breakpoints['2xl'].direction || props.direction || 'row'};
        justify-content: ${breakpoints['2xl'].justify ? getJustifyContent(breakpoints['2xl'].justify) : props.justify ? getJustifyContent(props.justify) : 'flex-start'};
        align-items: ${breakpoints['2xl'].align ? getAlignItems(breakpoints['2xl'].align) : props.align ? getAlignItems(props.align) : 'stretch'};
        flex-wrap: ${breakpoints['2xl'].wrap || props.wrap || 'nowrap'};
        gap: ${breakpoints['2xl'].gap || props.gap || '0'};
      }
    `}
  `;

  return (
    <div css={responsiveStyles} className={props.className}>
      {children}
    </div>
  );
};

// Flex item props
interface FlexItemProps {
  children: React.ReactNode;
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
  className,
}) => {
  const getAlignSelf = (align: string) => {
    switch (align) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      case 'center':
        return 'center';
      case 'stretch':
        return 'stretch';
      case 'baseline':
        return 'baseline';
      default:
        return 'auto';
    }
  };

  const itemStyles = css`
    flex-grow: ${grow};
    flex-shrink: ${shrink};
    flex-basis: ${basis};
    order: ${order};
    align-self: ${getAlignSelf(align)};
  `;

  return (
    <div css={itemStyles} className={className}>
      {children}
    </div>
  );
};

// Flex container props
interface FlexContainerProps extends ResponsiveFlexProps {
  maxWidth?: string;
  padding?: boolean;
}

export const FlexContainer: React.FC<FlexContainerProps> = ({
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
      <ResponsiveFlex {...props}>{children}</ResponsiveFlex>
    </div>
  );
}; 