
import React from 'react';
import { Container } from '@/components/layout/container';

export default function CreatePage() {
  return (
    <Container>
      <div className="py-8 md:py-12 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Create Automation</h1>
            <p className="text-muted-foreground">
              Share your automation with the community
            </p>
          </div>
          <div className="mt-8 text-sm text-muted-foreground">
            Creation form will be implemented here
          </div>
        </div>
      </div>
    </Container>
  );
}
