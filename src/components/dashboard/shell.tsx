import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardShellProps {
  children: ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div className={cn('flex-1 space-y-8 p-8 pt-6', className)}>
      <div className="flex flex-col space-y-8">
        {children}
      </div>
    </div>
  );
} 