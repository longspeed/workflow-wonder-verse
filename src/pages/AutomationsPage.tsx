
import React from 'react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AutomationsPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Automations</h1>
            <p className="text-muted-foreground">
              Manage your workflow automations
            </p>
          </div>
          <Link to="/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Automation
            </Button>
          </Link>
        </div>

        <div className="text-sm text-muted-foreground">
          Automation list will be implemented here
        </div>
      </div>
    </Container>
  );
}
