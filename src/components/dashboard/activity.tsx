import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    type: 'Live Session',
    title: 'Q&A with Dr. Sarah Chen',
    date: 'Today, 3:00 PM',
    duration: '1 hour',
    participants: 45,
  },
  {
    id: 2,
    type: 'Assignment Due',
    title: 'Chatbot Project Submission',
    date: 'Tomorrow, 11:59 PM',
    status: 'In Progress',
    progress: 75,
  },
  {
    id: 3,
    type: 'New Module',
    title: 'Advanced Automation Patterns',
    date: 'Monday, Jan 22',
    preview: 'Learn advanced patterns for workflow automation',
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'Live Session':
      return <Users className="h-4 w-4" />;
    case 'Assignment Due':
      return <BookOpen className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

export function DashboardActivity() {
  return (
    <div className="grid gap-4">
      {activities.map((activity) => (
        <Card key={activity.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getActivityIcon(activity.type)}
                <CardTitle className="text-base">{activity.title}</CardTitle>
              </div>
              <Badge
                variant={activity.type === 'Live Session' ? 'default' : 'secondary'}
              >
                {activity.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{activity.date}</p>
              {activity.duration && (
                <p className="text-sm text-muted-foreground">
                  Duration: {activity.duration}
                </p>
              )}
              {activity.participants && (
                <p className="text-sm text-muted-foreground">
                  {activity.participants} participants
                </p>
              )}
              {activity.preview && (
                <p className="text-sm text-muted-foreground">{activity.preview}</p>
              )}
              {activity.progress && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{activity.progress}%</span>
                  </div>
                  <Progress value={activity.progress} className="h-2" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 