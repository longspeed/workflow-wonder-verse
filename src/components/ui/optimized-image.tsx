import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  className?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality = 75,
  priority = false,
  className,
  placeholder = 'blur',
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoading(false);
    }
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  // Generate blur placeholder if not provided
  const generateBlurPlaceholder = async (imageUrl: string) => {
    if (blurDataURL) return blurDataURL;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const bitmap = await createImageBitmap(blob);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Create a tiny version of the image
      canvas.width = 20;
      canvas.height = 20;
      ctx?.drawImage(bitmap, 0, 0, 20, 20);
      
      return canvas.toDataURL('image/jpeg', 0.1);
    } catch (error) {
      console.error('Failed to generate blur placeholder:', error);
      return '';
    }
  };

  // Optimize image URL
  const getOptimizedUrl = (url: string) => {
    if (!url) return '';
    
    // If it's a data URL or external URL, return as is
    if (url.startsWith('data:') || url.startsWith('http')) {
      return url;
    }

    // Add width and quality parameters if provided
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (quality) params.append('q', quality.toString());

    return `${url}?${params.toString()}`;
  };

  const optimizedSrc = getOptimizedUrl(src);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <Skeleton className="absolute inset-0" />
      )}
      
      {error ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-100">
          <span className="text-gray-400">Failed to load image</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          {...props}
        />
      )}
    </div>
  );
} 