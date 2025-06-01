import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MicroInteractionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotate?: number;
  clickScale?: number;
  ripple?: boolean;
  glow?: boolean;
}

export const MicroInteraction: React.FC<MicroInteractionProps> = ({
  children,
  className,
  hoverScale = 1.02,
  hoverRotate = 0,
  clickScale = 0.98,
  ripple = true,
  glow = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [rippleStyle, setRippleStyle] = useState({});
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setIsClicked(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ripple || !elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRippleStyle({
      left: `${x}px`,
      top: `${y}px`,
    });
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        'relative transition-all duration-200 ease-out',
        'transform-gpu',
        isHovered && `scale-[${hoverScale}] rotate-[${hoverRotate}deg]`,
        isClicked && `scale-[${clickScale}]`,
        glow && 'hover:shadow-lg hover:shadow-yellow-200/50',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      {...props}
    >
      {children}
      {ripple && (
        <div
          className={cn(
            'absolute w-0 h-0 rounded-full bg-yellow-200/30',
            'animate-ripple pointer-events-none',
            'transform -translate-x-1/2 -translate-y-1/2'
          )}
          style={rippleStyle}
        />
      )}
    </div>
  );
};

interface HoverCardProps extends MicroInteractionProps {
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  content,
  side = 'top',
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPositionClass = () => {
    switch (side) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MicroInteraction className={className} {...props}>
        {children}
      </MicroInteraction>
      {isHovered && (
        <div
          className={cn(
            'absolute z-50',
            'bg-white border border-yellow-200 rounded-lg shadow-lg p-2',
            'transition-all duration-200',
            'opacity-0 scale-95',
            isHovered && 'opacity-100 scale-100',
            getPositionClass()
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}; 