import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface PriceRangeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const priceRanges = [
  { value: '0-10', label: 'Under $10' },
  { value: '10-25', label: '$10 - $25' },
  { value: '25-50', label: '$25 - $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-', label: 'Over $100' },
];

export function PriceRangeFilter({ value, onChange }: PriceRangeFilterProps) {
  const [min, max] = value ? value.split('-').map(Number) : [0, 100];
  const [localMin, setLocalMin] = React.useState(min);
  const [localMax, setLocalMax] = React.useState(max);

  const handleChange = (newMin: number, newMax: number) => {
    setLocalMin(newMin);
    setLocalMax(newMax);
    onChange(`${newMin}-${newMax}`);
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={localMin}
              onChange={(e) => handleChange(Number(e.target.value), localMax)}
              className="w-20"
              min={0}
            />
            <span>-</span>
            <Input
              type="number"
              value={localMax}
              onChange={(e) => handleChange(localMin, Number(e.target.value))}
              className="w-20"
              min={localMin}
            />
          </div>
        </div>
        <Slider
          value={[localMin, localMax]}
          onValueChange={([newMin, newMax]) => handleChange(newMin, newMax)}
          min={0}
          max={1000}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${localMin}</span>
          <span>${localMax}</span>
        </div>
      </div>
    </Card>
  );
} 