
import React, { Suspense, lazy, memo } from 'react';
import { useInView } from 'react-intersection-observer';

// Lazy loading wrapper
export const LazyLoad = ({ children, threshold = 0.1 }) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView ? children : <div className="h-32 animate-pulse bg-gray-100 rounded-lg" />}
    </div>
  );
};

// Image optimization component
interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const OptimizedImage = memo(({ src, alt, ...props }: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
});

// Virtualized list component
export const VirtualizedList = ({ items, renderItem, itemHeight = 50 }) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  const containerRef = React.useRef(null);

  const visibleItems = React.useMemo(() => {
    if (!containerRef.current) return [];
    const containerHeight = containerRef.current.clientHeight;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);
    return items.slice(startIndex, endIndex);
  }, [items, scrollTop, itemHeight]);

  return (
    <div
      ref={containerRef}
      className="overflow-auto"
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height: '100%' }}
    >
      <div style={{ height: items.length * itemHeight }}>
        {visibleItems.map((item, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: (index + Math.floor(scrollTop / itemHeight)) * itemHeight,
              width: '100%',
            }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

// Code splitting wrapper
export const CodeSplit = ({ importFn, fallback = null }) => {
  const Component = React.useMemo(() => lazy(importFn), [importFn]);
  
  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
};
