
import { useState, useCallback } from 'react';
import { storageService } from '@/services/supabase';

export interface FileUploadResult {
  url: string;
  path: string;
}

export interface FileUploadError {
  message: string;
  code?: string;
}

export interface UseFileUploadReturn {
  upload: (file: File, bucket: string, path?: string) => Promise<FileUploadResult>;
  uploading: boolean;
  error: FileUploadError | null;
  progress: number;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<FileUploadError | null>(null);
  const [progress, setProgress] = useState(0);

  const upload = useCallback(async (
    uploadFile: File,
    bucket: string,
    customPath?: string
  ): Promise<FileUploadResult> => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      // Generate path if not provided
      const path = customPath || `${Date.now()}_${uploadFile.name}`;
      
      // Simulate progress for user feedback
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      // Upload file
      const uploadData = await storageService.uploadFile(bucket, path, uploadFile);
      
      // Get public URL
      const publicUrl = await storageService.getPublicUrl(bucket, path);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      return {
        url: publicUrl,
        path: uploadData.path
      };
    } catch (err) {
      const uploadError: FileUploadError = {
        message: err instanceof Error ? err.message : 'Upload failed',
        code: 'UPLOAD_ERROR'
      };
      setError(uploadError);
      throw uploadError;
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  }, []);

  return {
    upload,
    uploading,
    error,
    progress
  };
};

// Hook for multiple file uploads
export const useMultipleFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<FileUploadError | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});

  const uploadMultiple = useCallback(async (
    files: File[],
    bucket: string,
    pathGenerator?: (file: File, index: number) => string
  ): Promise<FileUploadResult[]> => {
    setUploading(true);
    setError(null);
    setProgress({});

    try {
      const uploadPromises = files.map(async (uploadFile, index) => {
        const path = pathGenerator 
          ? pathGenerator(uploadFile, index)
          : `${Date.now()}_${index}_${uploadFile.name}`;

        // Track individual file progress
        setProgress(prev => ({ ...prev, [path]: 0 }));

        const uploadData = await storageService.uploadFile(bucket, path, uploadFile);
        const publicUrl = await storageService.getPublicUrl(bucket, path);

        setProgress(prev => ({ ...prev, [path]: 100 }));

        return {
          url: publicUrl,
          path: uploadData.path
        };
      });

      const results = await Promise.all(uploadPromises);
      return results;
    } catch (err) {
      const uploadError: FileUploadError = {
        message: err instanceof Error ? err.message : 'Multiple upload failed',
        code: 'MULTIPLE_UPLOAD_ERROR'
      };
      setError(uploadError);
      throw uploadError;
    } finally {
      setUploading(false);
      setTimeout(() => setProgress({}), 1000);
    }
  }, []);

  return {
    uploadMultiple,
    uploading,
    error,
    progress
  };
};
