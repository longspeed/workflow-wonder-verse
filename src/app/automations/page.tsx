import { Metadata } from 'next';
import { AutomationList } from '@/components/automations/automation-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Automations',
  description: 'Manage your workflow automations',
};

export default function AutomationsPage() {
  // This would typically fetch automations from the API
  const automations = [
    {
      id: '1',
      name: 'Auto-respond to emails',
      description: 'Automatically respond to incoming emails',
      trigger: 'New email received',
      action: 'Send template response',
      isActive: true,
    },
    {
      id: '2',
      name: 'Task reminder',
      description: 'Send reminders for upcoming tasks',
      trigger: 'Task due in 24 hours',
      action: 'Send email notification',
      isActive: false,
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/automations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete automation');
      }

      // Refresh the page or update the state
      window.location.reload();
    } catch (error) {
      console.error('Error deleting automation:', error);
      throw error;
    }
  };

  const handleEdit = (id: string) => {
    // Navigate to edit page
    window.location.href = `/automations/${id}/edit`;
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    // Implement toggle functionality
    console.log(`Toggle automation ${id} to ${isActive}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Automations</h1>
          <p className="text-muted-foreground">
            Manage your workflow automations
          </p>
        </div>
        <Link href="/automations/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Automation
          </Button>
        </Link>
      </div>

      <AutomationList
        automations={automations}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onToggle={handleToggle}
      />
    </div>
  );
} 