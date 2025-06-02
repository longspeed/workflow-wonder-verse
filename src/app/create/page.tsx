import { Metadata } from 'next';
import { CourseForm } from '@/components/courses/course-form';

export const metadata: Metadata = {
  title: 'Create Course | Workflow Wonder',
  description: 'Create a new course to share your knowledge',
};

export default function CreatePage() {
  return (
    <div className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Create Course</h1>
          <p className="text-muted-foreground">
            Share your knowledge and help others learn workflow automation
          </p>
        </div>
        <div className="mt-8">
          <CourseForm />
        </div>
      </div>
    </div>
  );
} 