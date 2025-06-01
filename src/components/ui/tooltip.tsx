import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delay?: number;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  delay = 200,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  let timeout: NodeJS.Timeout;

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;

    let top = 0;
    let left = 0;

    switch (side) {
      case 'top':
        top = trigger.top - tooltip.height - 8 + scrollTop;
        break;
      case 'bottom':
        top = trigger.bottom + 8 + scrollTop;
        break;
      case 'left':
        top = trigger.top + (trigger.height - tooltip.height) / 2 + scrollTop;
        left = trigger.left - tooltip.width - 8 + scrollLeft;
        break;
      case 'right':
        top = trigger.top + (trigger.height - tooltip.height) / 2 + scrollTop;
        left = trigger.right + 8 + scrollLeft;
        break;
    }

    switch (align) {
      case 'start':
        left = trigger.left + scrollLeft;
        break;
      case 'center':
        left = trigger.left + (trigger.width - tooltip.width) / 2 + scrollLeft;
        break;
      case 'end':
        left = trigger.right - tooltip.width + scrollLeft;
        break;
    }

    setPosition({ top, left });
  };

  const showTooltip = () => {
    timeout = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeout);
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible]);

  return (
    <div
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      className="inline-block"
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={cn(
            'fixed z-50 px-2 py-1 text-sm text-white bg-yellow-900 rounded shadow-lg',
            'animate-in fade-in-0 zoom-in-95',
            className
          )}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};
