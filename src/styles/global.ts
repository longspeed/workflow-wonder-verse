import { css } from '@emotion/react';
import { colors, semanticColors } from './colors';
import { spacing, layout, common, responsive, zIndex, borderRadius, borderWidth, shadows } from './spacing';
import { typography } from './typography';

// Global styles
export const globalStyles = css`
  /* Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Root */
  :root {
    /* Colors */
    --color-primary: ${colors.primary[600]};
    --color-secondary: ${colors.secondary[600]};
    --color-success: ${colors.success[600]};
    --color-warning: ${colors.warning[600]};
    --color-error: ${colors.error[600]};
    --color-info: ${colors.info[600]};

    /* Typography */
    --font-family-sans: ${typography.fontFamily.sans};
    --font-family-mono: ${typography.fontFamily.mono};
    --font-size-base: ${typography.fontSize.base};
    --line-height-base: ${typography.lineHeight.base};

    /* Spacing */
    --spacing-base: ${spacing.md};
    --spacing-sm: ${spacing.sm};
    --spacing-lg: ${spacing.lg};

    /* Border */
    --border-radius: ${borderRadius.base};
    --border-width: ${borderWidth.base};
    --border-color: ${colors.neutral[200]};

    /* Shadow */
    --shadow-base: ${shadows.base};
    --shadow-lg: ${shadows.lg};

    /* Z-index */
    --z-index-base: ${zIndex.base};
    --z-index-dropdown: ${zIndex.dropdown};
    --z-index-modal: ${zIndex.modal};
  }

  /* Light theme */
  [data-theme='light'] {
    --color-background: ${semanticColors.light.background.primary};
    --color-text: ${semanticColors.light.text.primary};
    --color-text-secondary: ${semanticColors.light.text.secondary};
    --color-border: ${semanticColors.light.border.base};
  }

  /* Dark theme */
  [data-theme='dark'] {
    --color-background: ${semanticColors.dark.background.primary};
    --color-text: ${semanticColors.dark.text.primary};
    --color-text-secondary: ${semanticColors.dark.text.secondary};
    --color-border: ${semanticColors.dark.border.base};
  }

  /* Base styles */
  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-family-sans);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    color: var(--color-text);
    background-color: var(--color-background);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${typography.fontWeight.bold};
    line-height: ${typography.lineHeight.tight};
    margin-bottom: ${spacing.md};
  }

  h1 {
    font-size: ${typography.fontSize['4xl']};
  }

  h2 {
    font-size: ${typography.fontSize['3xl']};
  }

  h3 {
    font-size: ${typography.fontSize['2xl']};
  }

  h4 {
    font-size: ${typography.fontSize.xl};
  }

  h5 {
    font-size: ${typography.fontSize.lg};
  }

  h6 {
    font-size: ${typography.fontSize.base};
  }

  p {
    margin-bottom: ${spacing.md};
  }

  /* Links */
  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${colors.primary[700]};
    }
  }

  /* Lists */
  ul, ol {
    margin-bottom: ${spacing.md};
    padding-left: ${spacing.xl};
  }

  /* Code */
  code {
    font-family: var(--font-family-mono);
    font-size: ${typography.fontSize.sm};
    background-color: ${colors.neutral[100]};
    padding: ${spacing.xs} ${spacing.sm};
    border-radius: ${borderRadius.sm};
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Forms */
  input,
  textarea,
  select {
    font-family: var(--font-family-sans);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    padding: ${spacing.sm};
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--border-radius);
    background-color: var(--color-background);
    color: var(--color-text);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px ${colors.primary[100]};
    }
  }

  /* Buttons */
  button {
    font-family: var(--font-family-sans);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    padding: ${spacing.sm} ${spacing.md};
    border: var(--border-width) solid transparent;
    border-radius: var(--border-radius);
    background-color: var(--color-primary);
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;

    &:hover {
      background-color: ${colors.primary[700]};
    }

    &:active {
      transform: translateY(1px);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${spacing.md};
  }

  th, td {
    padding: ${spacing.sm};
    border: var(--border-width) solid var(--color-border);
    text-align: left;
  }

  th {
    background-color: ${colors.neutral[100]};
    font-weight: ${typography.fontWeight.bold};
  }

  /* Blockquotes */
  blockquote {
    margin: ${spacing.md} 0;
    padding: ${spacing.md};
    border-left: 4px solid var(--color-primary);
    background-color: ${colors.neutral[100]};
  }

  /* Horizontal rule */
  hr {
    margin: ${spacing.xl} 0;
    border: 0;
    border-top: var(--border-width) solid var(--color-border);
  }

  /* Selection */
  ::selection {
    background-color: ${colors.primary[200]};
    color: ${colors.primary[900]};
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${colors.neutral[100]};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${colors.neutral[300]};
    border-radius: ${borderRadius.full};

    &:hover {
      background-color: ${colors.neutral[400]};
    }
  }

  /* Focus outline */
  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Print styles */
  @media print {
    body {
      background-color: white;
      color: black;
    }

    a {
      color: black;
      text-decoration: underline;
    }

    button {
      display: none;
    }
  }
`; 