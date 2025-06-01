export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  filters?: ImageFilter[];
  effects?: ImageEffect[];
  adjustments?: ImageAdjustment[];
}

export interface ImageFilter {
  type: 'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast' | 'saturate';
  value: number;
}

export interface ImageEffect {
  type: 'rotate' | 'flip' | 'crop';
  value: number | { x: number; y: number; width: number; height: number };
}

export interface ImageAdjustment {
  type: 'brightness' | 'contrast' | 'saturate' | 'hue' | 'gamma' | 'sharpen' | 'vignette';
  value: number;
}

const applyFilter = (ctx: CanvasRenderingContext2D, filter: ImageFilter) => {
  switch (filter.type) {
    case 'grayscale':
      ctx.filter = `grayscale(${filter.value}%)`;
      break;
    case 'sepia':
      ctx.filter = `sepia(${filter.value}%)`;
      break;
    case 'blur':
      ctx.filter = `blur(${filter.value}px)`;
      break;
    case 'brightness':
      ctx.filter = `brightness(${filter.value}%)`;
      break;
    case 'contrast':
      ctx.filter = `contrast(${filter.value}%)`;
      break;
    case 'saturate':
      ctx.filter = `saturate(${filter.value}%)`;
      break;
  }
};

const applyEffect = (
  ctx: CanvasRenderingContext2D,
  effect: ImageEffect,
  width: number,
  height: number
) => {
  switch (effect.type) {
    case 'rotate':
      ctx.translate(width / 2, height / 2);
      ctx.rotate((effect.value as number) * Math.PI / 180);
      ctx.translate(-width / 2, -height / 2);
      break;
    case 'flip':
      if (effect.value === 1) {
        ctx.scale(-1, 1);
        ctx.translate(-width, 0);
      } else if (effect.value === 2) {
        ctx.scale(1, -1);
        ctx.translate(0, -height);
      }
      break;
    case 'crop':
      const crop = effect.value as { x: number; y: number; width: number; height: number };
      ctx.drawImage(
        ctx.canvas,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        width,
        height
      );
      break;
  }
};

const applyAdjustment = (ctx: CanvasRenderingContext2D, adjustment: ImageAdjustment) => {
  const { type, value } = adjustment;
  
  switch (type) {
    case 'brightness':
      ctx.filter = `brightness(${100 + value}%)`;
      break;
    case 'contrast':
      ctx.filter = `contrast(${100 + value}%)`;
      break;
    case 'saturate':
      ctx.filter = `saturate(${100 + value}%)`;
      break;
    case 'hue':
      ctx.filter = `hue-rotate(${value}deg)`;
      break;
    case 'gamma':
      // Apply gamma correction using a lookup table
      const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      const data = imageData.data;
      const gamma = 1 + (value / 100);
      
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.pow(data[i] / 255, gamma) * 255;
        data[i + 1] = Math.pow(data[i + 1] / 255, gamma) * 255;
        data[i + 2] = Math.pow(data[i + 2] / 255, gamma) * 255;
      }
      
      ctx.putImageData(imageData, 0, 0);
      break;
    case 'sharpen':
      // Apply sharpening using convolution
      const sharpenMatrix = [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
      ];
      applyConvolution(ctx, sharpenMatrix, value / 100);
      break;
    case 'vignette':
      // Apply vignette effect
      const gradient = ctx.createRadialGradient(
        ctx.canvas.width / 2,
        ctx.canvas.height / 2,
        0,
        ctx.canvas.width / 2,
        ctx.canvas.height / 2,
        Math.max(ctx.canvas.width, ctx.canvas.height) / 2
      );
      
      const intensity = value / 100;
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, `rgba(0, 0, 0, ${intensity})`);
      
      ctx.fillStyle = gradient;
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'source-over';
      break;
  }
};

const applyConvolution = (
  ctx: CanvasRenderingContext2D,
  matrix: number[],
  factor: number
) => {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;
  const tempData = new Uint8ClampedArray(data);
  
  for (let y = 1; y < ctx.canvas.height - 1; y++) {
    for (let x = 1; x < ctx.canvas.width - 1; x++) {
      const idx = (y * ctx.canvas.width + x) * 4;
      
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const kidx = ((y + ky) * ctx.canvas.width + (x + kx)) * 4;
            sum += tempData[kidx + c] * matrix[(ky + 1) * 3 + (kx + 1)];
          }
        }
        data[idx + c] = Math.min(255, Math.max(0, sum * factor));
      }
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
};

export const optimizeImage = async (
  file: File,
  options: ImageOptimizationOptions = {}
): Promise<File> => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
    format = 'jpeg',
    filters = [],
    effects = [],
    adjustments = []
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Draw the image
      ctx.drawImage(img, 0, 0, width, height);

      // Apply filters
      if (filters.length > 0) {
        ctx.filter = filters.map(f => {
          switch (f.type) {
            case 'grayscale': return `grayscale(${f.value}%)`;
            case 'sepia': return `sepia(${f.value}%)`;
            case 'blur': return `blur(${f.value}px)`;
            case 'brightness': return `brightness(${f.value}%)`;
            case 'contrast': return `contrast(${f.value}%)`;
            case 'saturate': return `saturate(${f.value}%)`;
            default: return '';
          }
        }).join(' ');
      }

      // Apply effects
      effects.forEach(effect => applyEffect(ctx, effect, width, height));

      // Apply adjustments
      adjustments.forEach(adjustment => applyAdjustment(ctx, adjustment));

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Could not create blob'));
            return;
          }
          const optimizedFile = new File([blob], file.name, {
            type: `image/${format}`,
          });
          resolve(optimizedFile);
        },
        `image/${format}`,
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Could not load image'));
    };
  });
};

export const validateImage = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      resolve(false);
      return;
    }

    if (file.size > maxSize) {
      resolve(false);
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(true);
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      resolve(false);
    };
  });
};

// Helper function to create preset filters
export const createPresetFilter = (preset: 'vintage' | 'blackAndWhite' | 'warm' | 'cool'): ImageFilter[] => {
  switch (preset) {
    case 'vintage':
      return [
        { type: 'sepia', value: 50 },
        { type: 'contrast', value: 120 },
        { type: 'saturate', value: 80 }
      ];
    case 'blackAndWhite':
      return [
        { type: 'grayscale', value: 100 },
        { type: 'contrast', value: 110 }
      ];
    case 'warm':
      return [
        { type: 'saturate', value: 120 },
        { type: 'brightness', value: 105 }
      ];
    case 'cool':
      return [
        { type: 'saturate', value: 80 },
        { type: 'brightness', value: 95 }
      ];
    default:
      return [];
  }
};

// Helper function to create default adjustments
export const createDefaultAdjustments = (): ImageAdjustment[] => [
  { type: 'brightness', value: 0 },
  { type: 'contrast', value: 0 },
  { type: 'saturate', value: 0 },
  { type: 'hue', value: 0 },
  { type: 'gamma', value: 0 },
  { type: 'sharpen', value: 0 },
  { type: 'vignette', value: 0 }
]; 