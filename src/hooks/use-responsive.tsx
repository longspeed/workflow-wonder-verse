
import { useState, useEffect } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useResponsive() {
  const [screenSize, setScreenSize] = useState<Breakpoint>('sm');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      
      if (width >= breakpoints['2xl']) {
        setScreenSize('2xl');
      } else if (width >= breakpoints.xl) {
        setScreenSize('xl');
      } else if (width >= breakpoints.lg) {
        setScreenSize('lg');
      } else if (width >= breakpoints.md) {
        setScreenSize('md');
      } else {
        setScreenSize('sm');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const isMobile = screenSize === 'sm';
  const isTablet = screenSize === 'md';
  const isDesktop = ['lg', 'xl', '2xl'].includes(screenSize);

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    breakpoint: (size: Breakpoint) => screenSize === size,
    above: (size: Breakpoint) => {
      const currentIndex = Object.keys(breakpoints).indexOf(screenSize);
      const targetIndex = Object.keys(breakpoints).indexOf(size);
      return currentIndex >= targetIndex;
    },
    below: (size: Breakpoint) => {
      const currentIndex = Object.keys(breakpoints).indexOf(screenSize);
      const targetIndex = Object.keys(breakpoints).indexOf(size);
      return currentIndex < targetIndex;
    },
  };
}
