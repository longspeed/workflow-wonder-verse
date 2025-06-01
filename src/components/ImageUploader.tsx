import React, { useState, useCallback } from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { createPresetFilter, createDefaultAdjustments } from '@/lib/image-utils';
import type { ImageFilter, ImageEffect, ImageAdjustment, ImageOptimizationOptions } from '@/lib/image-utils';

interface ImageUploaderProps {
  bucket: string;
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
}

const PRESET_FILTERS = [
  { label: 'Original', value: 'original' },
  { label: 'Vintage', value: 'vintage' },
  { label: 'Black & White', value: 'blackAndWhite' },
  { label: 'Warm', value: 'warm' },
  { label: 'Cool', value: 'cool' }
] as const;

const ADJUSTMENT_RANGES = {
  brightness: { min: -100, max: 100, step: 1 },
  contrast: { min: -100, max: 100, step: 1 },
  saturate: { min: -100, max: 100, step: 1 },
  hue: { min: -180, max: 180, step: 1 },
  gamma: { min: -100, max: 100, step: 1 },
  sharpen: { min: 0, max: 100, step: 1 },
  vignette: { min: 0, max: 100, step: 1 }
} as const;

export const ImageUploader = ({
  bucket,
  onUploadComplete,
  maxFiles = 5
}: ImageUploaderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('original');
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState<1 | 2 | 0>(0);
  const [adjustments, setAdjustments] = useState<ImageAdjustment[]>(createDefaultAdjustments());
  const [showAdjustments, setShowAdjustments] = useState(false);
  
  const {
    uploadBatch,
    isUploading,
    batchProgress,
    error
  } = useFileUpload();

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > maxFiles) {
      toast.error(`You can only upload up to ${maxFiles} files`);
      return;
    }
    setSelectedFiles(files);
  }, [maxFiles]);

  const handleAdjustmentChange = (type: ImageAdjustment['type'], value: number) => {
    setAdjustments(prev => 
      prev.map(adj => 
        adj.type === type ? { ...adj, value } : adj
      )
    );
  };

  const resetAdjustments = () => {
    setAdjustments(createDefaultAdjustments());
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      const filters: ImageFilter[] = selectedFilter === 'original' 
        ? [] 
        : createPresetFilter(selectedFilter as any);

      const effects: ImageEffect[] = [];
      if (rotation !== 0) {
        effects.push({ type: 'rotate', value: rotation });
      }
      if (flip !== 0) {
        effects.push({ type: 'flip', value: flip });
      }

      const imageOptions: ImageOptimizationOptions = {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.8,
        format: 'webp',
        filters,
        effects,
        adjustments
      };

      const results = await uploadBatch(selectedFiles, {
        bucket,
        optimizeImage: true,
        imageOptions
      });

      const successfulUploads = results.filter(r => r.success);
      const failedUploads = results.filter(r => !r.success);

      if (successfulUploads.length > 0) {
        const urls = successfulUploads.map(r => r.publicUrl!);
        onUploadComplete?.(urls);
        toast.success(`Successfully uploaded ${successfulUploads.length} images`);
      }

      if (failedUploads.length > 0) {
        toast.error(`Failed to upload ${failedUploads.length} images`);
      }

      setSelectedFiles([]);
      setSelectedFilter('original');
      setRotation(0);
      setFlip(0);
      resetAdjustments();
    } catch (err) {
      toast.error('Upload failed');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button
            variant="outline"
            className="cursor-pointer"
            disabled={isUploading}
          >
            Select Images
          </Button>
        </label>
        <Button
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Filter</label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              >
                {PRESET_FILTERS.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Rotation</label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRotation(prev => (prev - 90) % 360)}
                >
                  ↶
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRotation(prev => (prev + 90) % 360)}
                >
                  ↷
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Flip</label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFlip(prev => prev === 1 ? 0 : 1)}
                  className={flip === 1 ? 'bg-gray-100' : ''}
                >
                  ↔
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFlip(prev => prev === 2 ? 0 : 2)}
                  className={flip === 2 ? 'bg-gray-100' : ''}
                >
                  ↕
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdjustments(prev => !prev)}
            >
              {showAdjustments ? 'Hide Adjustments' : 'Show Adjustments'}
            </Button>
          </div>

          {showAdjustments && (
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Adjustments</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetAdjustments}
                >
                  Reset
                </Button>
              </div>
              
              {adjustments.map((adjustment) => (
                <div key={adjustment.type} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <label className="capitalize">{adjustment.type}</label>
                    <span>{adjustment.value}</span>
                  </div>
                  <Slider
                    value={[adjustment.value]}
                    min={ADJUSTMENT_RANGES[adjustment.type].min}
                    max={ADJUSTMENT_RANGES[adjustment.type].max}
                    step={ADJUSTMENT_RANGES[adjustment.type].step}
                    onValueChange={([value]) => handleAdjustmentChange(adjustment.type, value)}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              {selectedFiles.length} file(s) selected
            </p>
            {selectedFiles.map((file, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{file.name}</span>
                  <span>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                {isUploading && (
                  <Progress
                    value={batchProgress[`${Date.now()}_${index}`] || 0}
                    className="h-2"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}; 