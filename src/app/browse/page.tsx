import { Metadata } from 'next';
import { CourseGrid } from '@/components/courses/course-grid';
import { CourseFilters } from '@/components/courses/course-filters';
import { CourseSearch } from '@/components/courses/course-search';

export const metadata: Metadata = {
  title: 'Browse Courses | Workflow Wonder',
  description: 'Explore our comprehensive collection of workflow automation courses',
};

export default function BrowsePage() {
  return (
    <div className="container py-8 md:py-12 lg:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Browse Courses</h1>
          <p className="text-muted-foreground">
            Find the perfect course to enhance your workflow automation skills
          </p>
        </div>
        
        <div className="flex flex-col gap-6">
          <CourseSearch />
          <div className="grid gap-6 md:grid-cols-[240px_1fr]">
            <CourseFilters />
            <CourseGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
