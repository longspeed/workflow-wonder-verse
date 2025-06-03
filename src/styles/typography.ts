import { css } from '@emotion/react';

export const fontFamily = {
  sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

export const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

export const fontSize = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
};

export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

export const typography = {
  h1: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSize['5xl']};
    font-weight: ${fontWeight.bold};
    line-height: ${lineHeight.tight};
    letter-spacing: ${letterSpacing.tight};
  `,
  h2: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSize['4xl']};
    font-weight: ${fontWeight.bold};
    line-height: ${lineHeight.tight};
    letter-spacing: ${letterSpacing.tight};
  `,
  h3: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSize['3xl']};
    font-weight: ${fontWeight.semibold};
    line-height: ${lineHeight.snug};
    letter-spacing: ${letterSpacing.normal};
  `,
  h4: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSize['2xl']};
    font-weight: ${fontWeight.semibold};
    line-height: ${lineHeight.snug};
    letter-spacing: ${letterSpacing.normal};
  `,
  h5: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSize.xl};
    font-weight: ${fontWeight.semibold};
    line-height: ${lineHeight.normal};
    letter-spacing: ${letterSpacing.normal};
  `,
  h6: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSize.lg};
    font-weight: ${fontWeight.semibold};
    line-height: ${lineHeight.normal};
    letter-spacing: ${letterSpacing.normal};
  `,
  body1: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSize.base};
    font-weight: ${fontWeight.normal};
    line-height: ${lineHeight.relaxed};
    letter-spacing: ${letterSpacing.normal};
  `,
  body2: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSize.sm};
    font-weight: ${fontWeight.normal};
    line-height: ${lineHeight.relaxed};
    letter-spacing: ${letterSpacing.normal};
  `,
  caption: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSize.xs};
    font-weight: ${fontWeight.normal};
    line-height: ${lineHeight.normal};
    letter-spacing: ${letterSpacing.wide};
  `,
  button: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSize.sm};
    font-weight: ${fontWeight.medium};
    line-height: ${lineHeight.normal};
    letter-spacing: ${letterSpacing.wide};
    text-transform: uppercase;
  `,
  code: css`
    font-family: ${fontFamily.mono};
    font-size: ${fontSize.sm};
    font-weight: ${fontWeight.normal};
    line-height: ${lineHeight.normal};
    letter-spacing: ${letterSpacing.normal};
  `,
}; 