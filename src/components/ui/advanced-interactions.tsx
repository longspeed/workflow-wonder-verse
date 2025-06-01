import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AdvancedInteractionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotate?: number;
  clickScale?: number;
  ripple?: boolean;
  glow?: boolean;
  tilt?: boolean;
  float?: boolean;
  bounce?: boolean;
  shake?: boolean;
  pulse?: boolean;
}

export const AdvancedInteraction: React.FC<AdvancedInteractionProps> = ({
  children,
  className,
  hoverScale = 1.02,
  hoverRotate = 0,
  clickScale = 0.98,
  ripple = true,
  glow = false,
  tilt = false,
  float = false,
  bounce = false,
  shake = false,
  pulse = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [rippleStyle, setRippleStyle] = useState({});
  const [tiltStyle, setTiltStyle] = useState({});
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({});
  };
  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setIsClicked(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

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
        float && 'animate-float',
        bounce && 'hover:animate-bounce',
        shake && 'hover:animate-shake',
        pulse && 'animate-pulse',
        className
      )}
      style={tiltStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
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

interface ParallaxCardProps extends AdvancedInteractionProps {
  depth?: number;
  perspective?: number;
}

export const ParallaxCard: React.FC<ParallaxCardProps> = ({
  children,
  depth = 20,
  perspective = 1000,
  className,
  ...props
}) => {
  const [transform, setTransform] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / depth;
    const rotateY = (centerX - x) / depth;

    setTransform(
      `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    );
  };

  const handleMouseLeave = () => {
    setTransform(`perspective(${perspective}px) rotateX(0) rotateY(0)`);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'transition-transform duration-200 ease-out',
        'transform-gpu',
        className
      )}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

interface MagneticButtonProps extends AdvancedInteractionProps {
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.5,
  className,
  ...props
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setPosition({
      x: x * strength,
      y: y * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={buttonRef}
      className={cn(
        'transition-transform duration-200 ease-out',
        'transform-gpu',
        className
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}; 