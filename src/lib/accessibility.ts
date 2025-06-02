import React from 'react';
import { useId } from 'react';

// Accessibility hook for managing focus
export const useFocusManagement = () => {
  const [focused, setFocused] = React.useState(false);

  const handleFocus = React.useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = React.useCallback(() => {
    setFocused(false);
  }, []);

  return {
    focused,
    handleFocus,
    handleBlur,
  };
};

// Accessibility hook for keyboard navigation
export const useKeyboardNavigation = (
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowUp?: () => void,
  onArrowDown?: () => void
) => {
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          onEnter?.();
          break;
        case 'Escape':
          onEscape?.();
          break;
        case 'ArrowUp':
          onArrowUp?.();
          break;
        case 'ArrowDown':
          onArrowDown?.();
          break;
      }
    },
    [onEnter, onEscape, onArrowUp, onArrowDown]
  );

  return { handleKeyDown };
};

// Accessibility hook for ARIA live regions
export const useLiveRegion = (politeness: 'polite' | 'assertive' = 'polite') => {
  const id = useId();
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return {
    liveRegionProps: {
      'aria-live': politeness,
      'aria-atomic': 'true',
      id,
    },
    announce: setMessage,
    message,
  };
};

// Accessibility hook for managing focus trap
export const useFocusTrap = (enabled = true) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);

  return containerRef;
};

// Accessibility hook for managing focus lock
export const useFocusLock = (enabled = true) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const previousFocus = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!enabled || !containerRef.current) return;

    previousFocus.current = document.activeElement as HTMLElement;
    containerRef.current.focus();

    return () => {
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    };
  }, [enabled]);

  return containerRef;
};

// Accessibility hook for managing focus restore
export const useFocusRestore = (enabled = true) => {
  const previousFocus = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!enabled) return;

    previousFocus.current = document.activeElement as HTMLElement;

    return () => {
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    };
  }, [enabled]);

  return previousFocus;
};

// Accessibility hook for managing focus visible
export const useFocusVisible = () => {
  const [isFocusVisible, setIsFocusVisible] = React.useState(false);

  React.useEffect(() => {
    const handleFocusVisible = (e: KeyboardEvent) => {
      setIsFocusVisible(e.key === 'Tab');
    };

    const handleMouseDown = () => {
      setIsFocusVisible(false);
    };

    document.addEventListener('keydown', handleFocusVisible);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleFocusVisible);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isFocusVisible;
};

// Accessibility hook for managing focus within
export const useFocusWithin = () => {
  const [isFocusWithin, setIsFocusWithin] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const handleFocusIn = () => {
      setIsFocusWithin(true);
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (!container.contains(e.relatedTarget as Node)) {
        setIsFocusWithin(false);
      }
    };

    container.addEventListener('focusin', handleFocusIn);
    container.addEventListener('focusout', handleFocusOut);

    return () => {
      container.removeEventListener('focusin', handleFocusIn);
      container.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return { containerRef, isFocusWithin };
}; 