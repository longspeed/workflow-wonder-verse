import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const courses = [
  {
    id: 1,
    title: 'Complete AI Automation Masterclass',
    progress: 65,
    nextLesson: 'Building Your First Chatbot',
    instructor: 'Dr. Sarah Chen',
    timeLeft: '2h 30m remaining',
    category: 'AI & Automation',
    lastAccessed: '2 hours ago',
  },
  {
    id: 2,
    title: 'Advanced Workflow Automation',
    progress: 40,
    nextLesson: 'Zapier Integration Strategies',
    instructor: 'Mike Rodriguez',
    timeLeft: '4h 15m remaining',
    category: 'Workflow',
    lastAccessed: '1 day ago',
  },
  {
    id: 3,
    title: 'No-Code AI Tools Fundamentals',
    progress: 85,
    nextLesson: 'Final Project Review',
    instructor: 'Emma Thompson',
    timeLeft: '45m remaining',
    category: 'No-Code',
    lastAccessed: '3 hours ago',
  },
];

export function DashboardCourses() {
  return (
    <div className="grid gap-4">
      {courses.map((course) => (
        <Card key={course.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  by {course.instructor}
                </p>
              </div>
              <Badge variant="secondary">{course.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Next: {course.nextLesson}
                  </span>
                </div>
                <span className="text-muted-foreground">{course.timeLeft}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Last accessed: {course.lastAccessed}
                </p>
                <Button size="sm">
                  <Play className="mr-2 h-4 w-4" />
                  Continue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 