import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const recommendations = [
  {
    id: 1,
    title: 'Machine Learning for Beginners',
    rating: 4.8,
    students: '2.1k',
    price: '$79',
    category: 'AI & ML',
    duration: '8 weeks',
  },
  {
    id: 2,
    title: 'Advanced Python Automation',
    rating: 4.9,
    students: '1.8k',
    price: '$99',
    category: 'Programming',
    duration: '10 weeks',
  },
  {
    id: 3,
    title: 'Data Science Essentials',
    rating: 4.7,
    students: '3.2k',
    price: '$89',
    category: 'Data Science',
    duration: '6 weeks',
  },
];

export function DashboardRecommendations() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <CardTitle>Recommended for You</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <Badge variant="secondary" className="mb-2">
                  {course.category}
                </Badge>
                <CardTitle className="text-base">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      ⭐ {course.rating}
                    </span>
                    <span className="text-muted-foreground">
                      {course.students} students
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">{course.price}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {course.duration}
                      </span>
                    </div>
                    <Button size="sm">Enroll</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 