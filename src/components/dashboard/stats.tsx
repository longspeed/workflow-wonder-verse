import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Award, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  {
    title: 'Courses Enrolled',
    value: '8',
    icon: BookOpen,
    description: 'Active courses',
  },
  {
    title: 'Completed',
    value: '3',
    icon: Award,
    description: 'Finished courses',
  },
  {
    title: 'Total Hours',
    value: '47.5h',
    icon: Clock,
    description: 'Learning time',
  },
  {
    title: 'Weekly Goal',
    value: '3/5h',
    icon: Target,
    description: 'Hours this week',
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
            {stat.title === 'Weekly Goal' && (
              <Progress
                value={60}
                className="h-2 mt-2"
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 