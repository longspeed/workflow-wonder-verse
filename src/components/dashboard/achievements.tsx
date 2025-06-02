import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const achievements = [
  {
    id: 1,
    title: 'First Course Completed',
    icon: '🎓',
    earned: 'Dec 2023',
    description: 'Completed your first course successfully',
  },
  {
    id: 2,
    title: 'Week Streak',
    icon: '🔥',
    earned: 'Jan 2024',
    description: 'Maintained a 7-day learning streak',
  },
  {
    id: 3,
    title: 'Quiz Master',
    icon: '🏆',
    earned: 'Jan 2024',
    description: 'Achieved 90% or higher in all quizzes',
  },
];

export function DashboardAchievements() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => (
        <Card key={achievement.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <span className="text-3xl">{achievement.icon}</span>
              <div>
                <CardTitle className="text-base">{achievement.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Earned {achievement.earned}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {achievement.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 