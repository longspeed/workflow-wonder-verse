
import React from 'react';
import { Container } from '@/components/layout/container';

export default function DashboardPage() {
  return (
    <Container>
      <div className="py-8 md:py-12 lg:py-24">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your automations.
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Dashboard content will be implemented here
          </div>
        </div>
      </div>
    </Container>
  );
}
