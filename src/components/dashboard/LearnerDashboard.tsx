
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award, Play, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const LearnerDashboard = () => {
  const { user } = useAuth();

  const enrolledCourses = [
    { 
      title: 'Complete AI Automation Masterclass', 
      progress: 65,
      nextLesson: 'Building Your First Chatbot',
      instructor: 'Dr. Sarah Chen',
      timeLeft: '2h 30m remaining'
    },
    { 
      title: 'Advanced Workflow Automation', 
      progress: 40,
      nextLesson: 'Zapier Integration Strategies',
      instructor: 'Mike Rodriguez',
      timeLeft: '4h 15m remaining'
    },
    { 
      title: 'No-Code AI Tools Fundamentals', 
      progress: 85,
      nextLesson: 'Final Project Review',
      instructor: 'Emma Thompson',
      timeLeft: '45m remaining'
    },
  ];

  const upcomingActivities = [
    { type: 'Live Session', title: 'Q&A with Dr. Sarah Chen', date: 'Today, 3:00 PM' },
    { type: 'Assignment Due', title: 'Chatbot Project Submission', date: 'Tomorrow, 11:59 PM' },
    { type: 'New Module', title: 'Advanced Automation Patterns', date: 'Monday, Jan 22' },
  ];

  const recommendedCourses = [
    { title: 'Machine Learning for Beginners', rating: 4.8, students: '2.1k', price: '$79' },
    { title: 'Advanced Python Automation', rating: 4.9, students: '1.8k', price: '$99' },
    { title: 'Data Science Essentials', rating: 4.7, students: '3.2k', price: '$89' },
  ];

  const achievements = [
    { title: 'First Course Completed', icon: '🎓', earned: 'Dec 2023' },
    { title: 'Week Streak', icon: '🔥', earned: 'Jan 2024' },
    { title: 'Quiz Master', icon: '🏆', earned: 'Jan 2024' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yellow-900 mb-2">
          My Learning Dashboard
        </h1>
        <p className="text-yellow-700">Welcome back, {user?.user_metadata?.full_name || 'Learner'}! Continue your learning journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Learning Progress */}
        <Card className="lg:col-span-2 bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900 flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              My Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enrolledCourses.map((course, index) => (
                <div key={index} className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-yellow-900">{course.title}</h4>
                      <p className="text-sm text-yellow-700">by {course.instructor}</p>
                    </div>
                    <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900">
                      <Play className="h-4 w-4 mr-1" />
                      Continue
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-yellow-700">Progress</span>
                      <span className="font-medium text-yellow-900">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-yellow-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-yellow-700">
                      <span>Next: {course.nextLesson}</span>
                      <span>{course.timeLeft}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900">Learning Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-yellow-700">Courses Enrolled</span>
                <span className="font-semibold text-yellow-900">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-700">Completed</span>
                <span className="font-semibold text-yellow-900">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-700">Total Hours</span>
                <span className="font-semibold text-yellow-900">47.5h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-700">Certificates</span>
                <span className="font-semibold text-yellow-900">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-700">Current Streak</span>
                <span className="font-semibold text-yellow-900">🔥 7 days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Activities */}
        <Card className="lg:col-span-1 bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900 flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingActivities.map((activity, index) => (
                <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-900">{activity.type}</p>
                      <p className="text-xs text-yellow-700">{activity.title}</p>
                      <p className="text-xs text-yellow-600 mt-1">{activity.date}</p>
                    </div>
                    <Clock className="h-4 w-4 text-yellow-600 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="lg:col-span-1 bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900 flex items-center">
              <Award className="mr-2 h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-yellow-900">{achievement.title}</p>
                      <p className="text-xs text-yellow-600">{achievement.earned}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Courses */}
        <Card className="lg:col-span-3 bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedCourses.map((course, index) => (
                <div key={index} className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">{course.title}</h4>
                  <div className="flex items-center justify-between text-sm text-yellow-700 mb-3">
                    <span>⭐ {course.rating}</span>
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-yellow-900">{course.price}</span>
                    <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900">
                      Enroll
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearnerDashboard;
