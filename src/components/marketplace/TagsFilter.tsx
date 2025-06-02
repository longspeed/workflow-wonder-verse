import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface TagsFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const popularTags = [
  { value: 'ai', label: 'AI & ML' },
  { value: 'automation', label: 'Automation' },
  { value: 'integration', label: 'Integration' },
  { value: 'api', label: 'API' },
  { value: 'workflow', label: 'Workflow' },
  { value: 'scheduling', label: 'Scheduling' },
  { value: 'notification', label: 'Notifications' },
  { value: 'data-analysis', label: 'Data Analysis' },
  { value: 'reporting', label: 'Reporting' },
  { value: 'security', label: 'Security' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'web', label: 'Web' },
  { value: 'desktop', label: 'Desktop' },
];

export function TagsFilter({ value, onChange }: TagsFilterProps) {
  const toggleTag = (tag: string) => {
    if (value.includes(tag)) {
      onChange(value.filter((t) => t !== tag));
    } else {
      onChange([...value, tag]);
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Tags</Label>
          {value.length > 0 && (
            <button
              onClick={() => onChange([])}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </div>

        {value.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {value.map((tag) => {
              const tagInfo = popularTags.find((t) => t.value === tag);
              return (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-1"
                >
                  {tagInfo?.label}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              );
            })}
          </div>
        )}

        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {popularTags.map((tag) => (
              <div
                key={tag.value}
                className={cn(
                  'flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-accent transition-colors',
                  value.includes(tag.value) && 'bg-accent'
                )}
                onClick={() => toggleTag(tag.value)}
              >
                <span className="text-sm">{tag.label}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
} 