import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const ratingOptions = [
  { value: '4', label: '4+ Stars', stars: 4 },
  { value: '3', label: '3+ Stars', stars: 3 },
  { value: '2', label: '2+ Stars', stars: 2 },
  { value: '1', label: '1+ Stars', stars: 1 },
];

export function RatingFilter({ value, onChange }: RatingFilterProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <Label>Minimum Rating</Label>
        <div className="space-y-2">
          {ratingOptions.map((option) => (
            <div
              key={option.value}
              className={cn(
                'flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-accent transition-colors',
                value === option.value && 'bg-accent'
              )}
              onClick={() => onChange(option.value)}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: option.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      value === option.value ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm">{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
} 