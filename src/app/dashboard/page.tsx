import { Metadata } from 'next';
import { DashboardShell } from '@/components/dashboard/shell';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardTabs } from '@/components/dashboard/tabs';
import { DashboardStats } from '@/components/dashboard/stats';
import { DashboardActivity } from '@/components/dashboard/activity';
import { DashboardCourses } from '@/components/dashboard/courses';
import { DashboardAchievements } from '@/components/dashboard/achievements';
import { DashboardRecommendations } from '@/components/dashboard/recommendations';
import { YouTubeSearch } from '@/components/youtube-search';

export const metadata: Metadata = {
  title: 'Dashboard | Workflow Wonder',
  description: 'Your personalized learning dashboard',
};

export default async function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Welcome back! Here's an overview of your learning progress."
      />
      <div className="grid gap-8">
        <DashboardStats />
        <DashboardTabs
          tabs={[
            {
              id: 'courses',
              label: 'My Courses',
              content: <DashboardCourses />,
            },
            {
              id: 'activity',
              label: 'Activity',
              content: <DashboardActivity />,
            },
            {
              id: 'achievements',
              label: 'Achievements',
              content: <DashboardAchievements />,
            },
            {
              id: 'videos',
              label: 'Learning Videos',
              content: <YouTubeSearch />,
            },
          ]}
        />
        <DashboardRecommendations />
      </div>
    </DashboardShell>
  );
} 