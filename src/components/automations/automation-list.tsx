
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Trash2, Edit, Play, Pause } from 'lucide-react';
import { toast } from 'sonner';

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  isActive: boolean;
}

interface AutomationListProps {
  automations: Automation[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onToggle: (id: string, isActive: boolean) => void;
}

export function AutomationList({
  automations,
  onDelete,
  onEdit,
  onToggle,
}: AutomationListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await onDelete(id);
      toast('Automation deleted successfully');
    } catch (error) {
      toast('Failed to delete automation');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid gap-4">
      {automations.map((automation) => (
        <Card key={automation.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg font-bold">
                {automation.name}
              </CardTitle>
              <CardDescription>{automation.description}</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={automation.isActive}
                onCheckedChange={(checked) => onToggle(automation.id, checked)}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(automation.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(automation.id)}
                disabled={deletingId === automation.id}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Trigger:</span>
                <span className="text-sm text-muted-foreground">
                  {automation.trigger}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Action:</span>
                <span className="text-sm text-muted-foreground">
                  {automation.action}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
