import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface DashboardTabsProps {
  tabs: Tab[];
  className?: string;
}

export function DashboardTabs({ tabs, className }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className={cn('w-full', className)}
    >
      <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
} 