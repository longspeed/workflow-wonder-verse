'use client';

import { CreateAutomation } from '@/components/CreateAutomation';

export default function CreatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Automation</h1>
      <CreateAutomation />
    </div>
  );
} 