import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Clock } from 'lucide-react';

// Temporary mock data
const courses = [
  {
    id: '1',
    title: 'Introduction to Workflow Automation',
    description: 'Learn the fundamentals of workflow automation and how to implement it in your business.',
    category: 'Beginner',
    rating: 4.8,
    students: 1234,
    duration: '4 hours',
    price: 49.99,
  },
  {
    id: '2',
    title: 'Advanced Automation Techniques',
    description: 'Master advanced automation techniques and optimize your workflows for maximum efficiency.',
    category: 'Advanced',
    rating: 4.9,
    students: 856,
    duration: '6 hours',
    price: 79.99,
  },
  {
    id: '3',
    title: 'Automation for Small Businesses',
    description: 'Discover how to implement automation in your small business to save time and resources.',
    category: 'Intermediate',
    rating: 4.7,
    students: 567,
    duration: '5 hours',
    price: 59.99,
  },
];

export function CourseGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{course.category}</Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
            </div>
            <CardTitle className="mt-2 line-clamp-2">{course.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {course.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course.students} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-2xl font-bold">${course.price}</div>
            <Button>Enroll Now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 