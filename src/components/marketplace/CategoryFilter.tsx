import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  { value: 'all', label: 'All Categories', icon: '🌐' },
  { value: 'productivity', label: 'Productivity', icon: '⚡' },
  { value: 'marketing', label: 'Marketing', icon: '📢' },
  { value: 'data', label: 'Data Processing', icon: '📊' },
  { value: 'social', label: 'Social Media', icon: '📱' },
  { value: 'ecommerce', label: 'E-commerce', icon: '🛍️' },
  { value: 'finance', label: 'Finance', icon: '💰' },
  { value: 'hr', label: 'HR & Recruitment', icon: '👥' },
  { value: 'customer-service', label: 'Customer Service', icon: '🎯' },
  { value: 'sales', label: 'Sales', icon: '📈' },
  { value: 'operations', label: 'Operations', icon: '⚙️' },
  { value: 'development', label: 'Development', icon: '💻' },
];

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <Card className="p-4">
      <ScrollArea className="h-[200px] pr-4">
        <div className="space-y-2">
          {categories.map((category) => (
            <Badge
              key={category.value}
              variant={value === category.value ? 'default' : 'outline'}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-primary/10 transition-colors',
                value === category.value && 'bg-primary text-primary-foreground'
              )}
              onClick={() => onChange(category.value)}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
} 