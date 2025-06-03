// Base spacing unit in pixels
const baseUnit = 4;

// Spacing scale
export const spacing = {
  // Micro spacing
  xxxs: `${baseUnit * 0.25}px`, // 1px
  xxs: `${baseUnit * 0.5}px`, // 2px
  xs: `${baseUnit}px`, // 4px
  sm: `${baseUnit * 2}px`, // 8px
  md: `${baseUnit * 3}px`, // 12px
  lg: `${baseUnit * 4}px`, // 16px
  xl: `${baseUnit * 6}px`, // 24px
  xxl: `${baseUnit * 8}px`, // 32px
  xxxl: `${baseUnit * 12}px`, // 48px
  xxxxl: `${baseUnit * 16}px`, // 64px
  xxxxxl: `${baseUnit * 24}px`, // 96px
};

// Layout spacing
export const layout = {
  // Container padding
  container: {
    sm: spacing.md,
    md: spacing.lg,
    lg: spacing.xl,
  },
  // Section spacing
  section: {
    sm: spacing.xl,
    md: spacing.xxl,
    lg: spacing.xxxl,
  },
  // Component spacing
  component: {
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
  },
  // Grid spacing
  grid: {
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
  },
};

// Common spacing patterns
export const common = {
  // Margin patterns
  margin: {
    none: '0',
    auto: 'auto',
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
  },
  // Padding patterns
  padding: {
    none: '0',
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
  },
  // Gap patterns
  gap: {
    none: '0',
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
  },
};

// Responsive spacing
export const responsive = {
  // Mobile-first spacing
  mobile: {
    container: spacing.md,
    section: spacing.xl,
    component: spacing.sm,
  },
  // Tablet spacing
  tablet: {
    container: spacing.lg,
    section: spacing.xxl,
    component: spacing.md,
  },
  // Desktop spacing
  desktop: {
    container: spacing.xl,
    section: spacing.xxxl,
    component: spacing.lg,
  },
};

// Z-index scale
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
};

// Border radius scale
export const borderRadius = {
  none: '0',
  sm: '2px',
  base: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  xxl: '16px',
  full: '9999px',
};

// Border width scale
export const borderWidth = {
  none: '0',
  thin: '1px',
  base: '2px',
  thick: '4px',
};

// Shadow scale
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
}; 