import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { css } from '@emotion/react';

// Animation variants
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
};

const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

const rotateIn = {
  initial: { rotate: -180, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: 180, opacity: 0 },
};

const bounceIn = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
};

// Animation props
interface AnimationProps {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce';
  duration?: number;
  delay?: number;
  className?: string;
}

export const AnimatedElement: React.FC<AnimationProps> = ({
  children,
  type = 'fade',
  duration = 0.3,
  delay = 0,
  className,
}) => {
  const getVariants = (type: string) => {
    switch (type) {
      case 'fade':
        return fadeIn;
      case 'slide':
        return slideIn;
      case 'scale':
        return scaleIn;
      case 'rotate':
        return rotateIn;
      case 'bounce':
        return bounceIn;
      default:
        return fadeIn;
    }
  };

  const variants = getVariants(type);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered animation props
interface StaggeredAnimationProps extends Omit<AnimationProps, 'type'> {
  staggerChildren?: number;
  staggerDirection?: number;
}

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  staggerChildren = 0.1,
  staggerDirection = 1,
  ...props
}) => {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren,
        staggerDirection,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
    >
      <AnimatedElement {...props}>{children}</AnimatedElement>
    </motion.div>
  );
};

// Responsive animation props
interface ResponsiveAnimationProps extends AnimationProps {
  breakpoints?: {
    xs?: Partial<Omit<AnimationProps, 'children' | 'className'>>;
    sm?: Partial<Omit<AnimationProps, 'children' | 'className'>>;
    md?: Partial<Omit<AnimationProps, 'children' | 'className'>>;
    lg?: Partial<Omit<AnimationProps, 'children' | 'className'>>;
    xl?: Partial<Omit<AnimationProps, 'children' | 'className'>>;
    '2xl'?: Partial<Omit<AnimationProps, 'children' | 'className'>>;
  };
}

export const ResponsiveAnimation: React.FC<ResponsiveAnimationProps> = ({
  children,
  breakpoints = {},
  ...props
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState('xs');

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        setCurrentBreakpoint('2xl');
      } else if (width >= 1280) {
        setCurrentBreakpoint('xl');
      } else if (width >= 1024) {
        setCurrentBreakpoint('lg');
      } else if (width >= 768) {
        setCurrentBreakpoint('md');
      } else if (width >= 640) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint('xs');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBreakpointProps = () => {
    const breakpointProps = breakpoints[currentBreakpoint as keyof typeof breakpoints];
    return breakpointProps || {};
  };

  return (
    <AnimatedElement {...props} {...getBreakpointProps()}>
      {children}
    </AnimatedElement>
  );
};

// Animated page transition props
interface PageTransitionProps extends Omit<AnimationProps, 'type'> {
  mode?: 'wait' | 'sync';
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  mode = 'wait',
  ...props
}) => {
  return (
    <AnimatePresence mode={mode}>
      <AnimatedElement type="fade" {...props}>
        {children}
      </AnimatedElement>
    </AnimatePresence>
  );
};

// Animated list props
interface AnimatedListProps extends Omit<AnimationProps, 'type'> {
  items: React.ReactNode[];
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  items,
  ...props
}) => {
  return (
    <StaggeredAnimation {...props}>
      {items.map((item, index) => (
        <AnimatedElement key={index} type="slide" {...props}>
          {item}
        </AnimatedElement>
      ))}
    </StaggeredAnimation>
  );
};

// Animated hover props
interface AnimatedHoverProps extends Omit<AnimationProps, 'type'> {
  scale?: number;
  rotate?: number;
}

export const AnimatedHover: React.FC<AnimatedHoverProps> = ({
  children,
  scale = 1.05,
  rotate = 0,
  ...props
}) => {
  const hoverVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale, rotate },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      variants={hoverVariants}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Animated scroll props
interface AnimatedScrollProps extends Omit<AnimationProps, 'type'> {
  threshold?: number;
}

export const AnimatedScroll: React.FC<AnimatedScrollProps> = ({
  children,
  threshold = 0.1,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    const element = document.getElementById('animated-scroll');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return (
    <motion.div
      id="animated-scroll"
      initial="initial"
      animate={isVisible ? 'animate' : 'initial'}
      variants={fadeIn}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}; 