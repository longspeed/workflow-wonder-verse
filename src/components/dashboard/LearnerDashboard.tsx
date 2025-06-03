import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award, Play, Calendar, TrendingUp, ChevronRight, BarChart2, Target, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const LearnerDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const enrolledCourses = useMemo(() => [
    { 
      id: 1,
      title: 'Complete AI Automation Masterclass', 
      progress: 65,
      nextLesson: 'Building Your First Chatbot',
      instructor: 'Dr. Sarah Chen',
      timeLeft: '2h 30m remaining',
      category: 'AI & Automation',
      lastAccessed: '2 hours ago'
    },
    { 
      id: 2,
      title: 'Advanced Workflow Automation', 
      progress: 40,
      nextLesson: 'Zapier Integration Strategies',
      instructor: 'Mike Rodriguez',
      timeLeft: '4h 15m remaining',
      category: 'Workflow',
      lastAccessed: '1 day ago'
    },
    { 
      id: 3,
      title: 'No-Code AI Tools Fundamentals', 
      progress: 85,
      nextLesson: 'Final Project Review',
      instructor: 'Emma Thompson',
      timeLeft: '45m remaining',
      category: 'No-Code',
      lastAccessed: '3 hours ago'
    },
  ], []);

  const upcomingActivities = useMemo(() => [
    { 
      id: 1,
      type: 'Live Session', 
      title: 'Q&A with Dr. Sarah Chen', 
      date: 'Today, 3:00 PM',
      duration: '1 hour',
      participants: 45
    },
    { 
      id: 2,
      type: 'Assignment Due', 
      title: 'Chatbot Project Submission', 
      date: 'Tomorrow, 11:59 PM',
      status: 'In Progress',
      progress: 75
    },
    { 
      id: 3,
      type: 'New Module', 
      title: 'Advanced Automation Patterns', 
      date: 'Monday, Jan 22',
      preview: 'Learn advanced patterns for workflow automation'
    },
  ], []);

  const recommendedCourses = useMemo(() => [
    { 
      id: 1,
      title: 'Machine Learning for Beginners', 
      rating: 4.8, 
      students: '2.1k', 
      price: '$79',
      category: 'AI & ML',
      duration: '8 weeks'
    },
    { 
      id: 2,
      title: 'Advanced Python Automation', 
      rating: 4.9, 
      students: '1.8k', 
      price: '$99',
      category: 'Programming',
      duration: '10 weeks'
    },
    { 
      id: 3,
      title: 'Data Science Essentials', 
      rating: 4.7, 
      students: '3.2k', 
      price: '$89',
      category: 'Data Science',
      duration: '6 weeks'
    },
  ], []);

  const achievements = useMemo(() => [
    { 
      id: 1,
      title: 'First Course Completed', 
      icon: '🎓', 
      earned: 'Dec 2023',
      description: 'Completed your first course successfully'
    },
    { 
      id: 2,
      title: 'Week Streak', 
      icon: '🔥', 
      earned: 'Jan 2024',
      description: 'Maintained a 7-day learning streak'
    },
    { 
      id: 3,
      title: 'Quiz Master', 
      icon: '🏆', 
      earned: 'Jan 2024',
      description: 'Achieved 90% or higher in all quizzes'
    },
  ], []);

  const stats = useMemo(() => ({
    coursesEnrolled: 8,
    completed: 3,
    totalHours: 47.5,
    certificates: 2,
    currentStreak: 7,
    weeklyGoal: 5,
    weeklyProgress: 3,
  }), []);

  return (
    <div className={cn(
      "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'
    )}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-yellow-900 dark:text-yellow-400 mb-2">
          My Learning Dashboard
        </h1>
        <p className="text-yellow-700 dark:text-yellow-300">
          Welcome back, {user?.user_metadata?.full_name || 'Learner'}! Continue your learning journey.
        </p>
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Learning Progress */}
            <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="text-yellow-900 dark:text-yellow-400 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  My Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {enrolledCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-yellow-900 dark:text-yellow-400">
                            {course.title}
                          </h4>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            by {course.instructor}
                          </p>
                          <Badge variant="secondary" className="mt-1">
                            {course.category}
                          </Badge>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-white"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Continue
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-yellow-700 dark:text-yellow-300">Progress</span>
                          <span className="font-medium text-yellow-900 dark:text-yellow-400">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex justify-between text-sm text-yellow-700 dark:text-yellow-300">
                          <span>Next: {course.nextLesson}</span>
                          <span>{course.timeLeft}</span>
                        </div>
                        <p className="text-xs text-yellow-600 dark:text-yellow-400">
                          Last accessed: {course.lastAccessed}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white dark:bg-gray-800 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="text-yellow-900 dark:text-yellow-400 flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5" />
                  Learning Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Courses Enrolled</p>
                      <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-400">
                        {stats.coursesEnrolled}
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Completed</p>
                      <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-400">
                        {stats.completed}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Weekly Goal</p>
                      <p className="text-sm font-medium text-yellow-900 dark:text-yellow-400">
                        {stats.weeklyProgress}/{stats.weeklyGoal} hours
                      </p>
                    </div>
                    <Progress 
                      value={(stats.weeklyProgress / stats.weeklyGoal) * 100} 
                      className="h-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Total Hours</p>
                      <p className="text-xl font-bold text-yellow-900 dark:text-yellow-400">
                        {stats.totalHours}h
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Certificates</p>
                      <p className="text-xl font-bold text-yellow-900 dark:text-yellow-400">
                        {stats.certificates}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Current Streak</p>
                      <div className="flex items-center">
                        <span className="text-xl mr-1">🔥</span>
                        <span className="font-bold text-yellow-900 dark:text-yellow-400">
                          {stats.currentStreak} days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Activities */}
            <Card className="lg:col-span-1 bg-white dark:bg-gray-800 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="text-yellow-900 dark:text-yellow-400 flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Upcoming Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <AnimatePresence>
                    {upcomingActivities.map((activity) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge 
                              variant={activity.type === 'Live Session' ? 'default' : 'secondary'}
                              className="mb-2"
                            >
                              {activity.type}
                            </Badge>
                            <p className="text-sm font-medium text-yellow-900 dark:text-yellow-400">
                              {activity.title}
                            </p>
                            <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
                              {activity.date}
                            </p>
                            {activity.duration && (
                              <p className="text-xs text-yellow-600 dark:text-yellow-300">
                                Duration: {activity.duration}
                              </p>
                            )}
                            {activity.participants && (
                              <p className="text-xs text-yellow-600 dark:text-yellow-300">
                                {activity.participants} participants
                              </p>
                            )}
                            {activity.progress && (
                              <div className="mt-2">
                                <Progress value={activity.progress} className="h-1" />
                              </div>
                            )}
                          </div>
                          <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-1" />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="lg:col-span-1 bg-white dark:bg-gray-800 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="text-yellow-900 dark:text-yellow-400 flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <AnimatePresence>
                    {achievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{achievement.icon}</span>
                          <div>
                            <p className="text-sm font-medium text-yellow-900 dark:text-yellow-400">
                              {achievement.title}
                            </p>
                            <p className="text-xs text-yellow-600 dark:text-yellow-300">
                              {achievement.earned}
                            </p>
                            <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Courses */}
            <Card className="lg:col-span-3 bg-white dark:bg-gray-800 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="text-yellow-900 dark:text-yellow-400 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      className="p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg"
                    >
                      <Badge variant="secondary" className="mb-2">
                        {course.category}
                      </Badge>
                      <h4 className="font-medium text-yellow-900 dark:text-yellow-400 mb-2">
                        {course.title}
                      </h4>
                      <div className="flex items-center justify-between text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                        <span>⭐ {course.rating}</span>
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-yellow-900 dark:text-yellow-400">
                            {course.price}
                          </span>
                          <span className="text-xs text-yellow-600 dark:text-yellow-300 ml-2">
                            {course.duration}
                          </span>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-white"
                        >
                          Enroll
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          {/* Courses tab content */}
        </TabsContent>

        <TabsContent value="activities">
          {/* Activities tab content */}
        </TabsContent>

        <TabsContent value="achievements">
          {/* Achievements tab content */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearnerDashboard;
