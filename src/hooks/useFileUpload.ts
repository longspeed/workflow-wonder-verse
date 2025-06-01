import { useState, useCallback } from 'react';
import { storageService } from '@/services/supabase';
import { optimizeImage, validateImage } from '@/lib/image-utils';

interface UploadOptions {
  bucket: string;
  path?: string;
  cacheControl?: string;
  upsert?: boolean;
  optimizeImage?: boolean;
  imageOptions?: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    format?: 'jpeg' | 'png' | 'webp';
  };
}

interface BatchUploadResult {
  success: boolean;
  file: File;
  data?: any;
  publicUrl?: string;
  error?: Error;
}

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [batchProgress, setBatchProgress] = useState<Record<string, number>>({});

  const uploadFile = async (file: File, options: UploadOptions) => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Validate image if it's an image file
      if (file.type.startsWith('image/')) {
        const isValid = await validateImage(file);
        if (!isValid) {
          throw new Error('Invalid image file');
        }

        // Optimize image if requested
        if (options.optimizeImage) {
          file = await optimizeImage(file, options.imageOptions);
        }
      }

      const path = options.path || `${Date.now()}_${file.name}`;
      const data = await storageService.uploadFile(
        options.bucket,
        path,
        file,
        {
          cacheControl: options.cacheControl,
          upsert: options.upsert
        }
      );

      const publicUrl = await storageService.getPublicUrl(options.bucket, path);
      setUploadProgress(100);
      return { data, publicUrl };
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Upload failed'));
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadBatch = async (files: File[], options: UploadOptions) => {
    setIsUploading(true);
    setError(null);
    setBatchProgress({});

    const results: BatchUploadResult[] = [];
    const totalFiles = files.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileId = `${Date.now()}_${i}`;
      
      try {
        setBatchProgress(prev => ({
          ...prev,
          [fileId]: 0
        }));

        // Validate and optimize image if needed
        if (file.type.startsWith('image/')) {
          const isValid = await validateImage(file);
          if (!isValid) {
            results.push({
              success: false,
              file,
              error: new Error('Invalid image file')
            });
            continue;
          }

          if (options.optimizeImage) {
            file = await optimizeImage(file, options.imageOptions);
          }
        }

        const path = options.path || `${Date.now()}_${file.name}`;
        const data = await storageService.uploadFile(
          options.bucket,
          path,
          file,
          {
            cacheControl: options.cacheControl,
            upsert: options.upsert
          }
        );

        const publicUrl = await storageService.getPublicUrl(options.bucket, path);
        
        setBatchProgress(prev => ({
          ...prev,
          [fileId]: 100
        }));

        results.push({
          success: true,
          file,
          data,
          publicUrl
        });
      } catch (err) {
        results.push({
          success: false,
          file,
          error: err instanceof Error ? err : new Error('Upload failed')
        });
      }
    }

    setIsUploading(false);
    return results;
  };

  const deleteFile = async (bucket: string, path: string) => {
    try {
      await storageService.deleteFile(bucket, path);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Delete failed'));
      throw err;
    }
  };

  const deleteBatch = async (files: { bucket: string; path: string }[]) => {
    const results = await Promise.allSettled(
      files.map(file => deleteFile(file.bucket, file.path))
    );
    return results;
  };

  return {
    uploadFile,
    uploadBatch,
    deleteFile,
    deleteBatch,
    isUploading,
    error,
    uploadProgress,
    batchProgress
  };
}; 