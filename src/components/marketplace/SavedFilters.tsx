import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Save, Trash2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterSet {
  id: string;
  name: string;
  filters: {
    search?: string;
    category?: string;
    sortBy?: string;
    price?: string;
    rating?: string;
    tags?: string[];
  };
  isFavorite?: boolean;
}

interface SavedFiltersProps {
  currentFilters: FilterSet['filters'];
  onApplyFilters: (filters: FilterSet['filters']) => void;
}

export function SavedFilters({ currentFilters, onApplyFilters }: SavedFiltersProps) {
  const [savedFilters, setSavedFilters] = useState<FilterSet[]>(() => {
    const saved = localStorage.getItem('savedFilters');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFilterName, setNewFilterName] = useState('');

  const saveCurrentFilters = () => {
    if (!newFilterName.trim()) return;

    const newFilter: FilterSet = {
      id: Date.now().toString(),
      name: newFilterName.trim(),
      filters: { ...currentFilters },
    };

    const updatedFilters = [...savedFilters, newFilter];
    setSavedFilters(updatedFilters);
    localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
    setNewFilterName('');
    setIsDialogOpen(false);
  };

  const deleteFilter = (id: string) => {
    const updatedFilters = savedFilters.filter((f) => f.id !== id);
    setSavedFilters(updatedFilters);
    localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
  };

  const toggleFavorite = (id: string) => {
    const updatedFilters = savedFilters.map((f) =>
      f.id === id ? { ...f, isFavorite: !f.isFavorite } : f
    );
    setSavedFilters(updatedFilters);
    localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
  };

  const sortedFilters = [...savedFilters].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Saved Filters</Label>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Current
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Filter Combination</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input
                  placeholder="Enter a name for this filter"
                  value={newFilterName}
                  onChange={(e) => setNewFilterName(e.target.value)}
                />
                <Button onClick={saveCurrentFilters} className="w-full">
                  Save Filter
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {sortedFilters.map((filter) => (
              <div
                key={filter.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(filter.id)}
                    className={cn(
                      'p-1 rounded-full hover:bg-accent-foreground/10',
                      filter.isFavorite && 'text-yellow-400'
                    )}
                  >
                    <Star
                      className={cn(
                        'w-4 h-4',
                        filter.isFavorite ? 'fill-yellow-400' : 'fill-none'
                      )}
                    />
                  </button>
                  <button
                    onClick={() => onApplyFilters(filter.filters)}
                    className="text-sm hover:underline"
                  >
                    {filter.name}
                  </button>
                </div>
                <button
                  onClick={() => deleteFilter(filter.id)}
                  className="p-1 rounded-full hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {savedFilters.length === 0 && (
              <div className="text-sm text-muted-foreground text-center py-4">
                No saved filters yet
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
} 