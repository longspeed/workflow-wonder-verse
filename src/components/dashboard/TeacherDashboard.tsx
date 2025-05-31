
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, MessageSquare, DollarSign, Plus, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const TeacherDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Students',
      value: '1,284',
      change: '+42 this week',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Course Revenue',
      value: '$8,450',
      change: '+15.2%',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Active Courses',
      value: '12',
      change: '2 in development',
      icon: BookOpen,
      color: 'text-purple-600',
    },
    {
      title: 'Avg. Rating',
      value: '4.9',
      change: '348 reviews',
      icon: Award,
      color: 'text-yellow-600',
    },
  ];

  const courses = [
    { 
      title: 'Complete AI Automation Masterclass', 
      students: 456, 
      completion: 78, 
      revenue: '$3,420',
      rating: 4.9 
    },
    { 
      title: 'Building Chatbots with No-Code', 
      students: 324, 
      completion: 85, 
      revenue: '$2,590',
      rating: 4.8 
    },
    { 
      title: 'Advanced Workflow Automation', 
      students: 201, 
      completion: 72, 
      revenue: '$1,810',
      rating: 4.7 
    },
  ];

  const recentActivity = [
    { type: 'enrollment', message: 'New student enrolled in AI Masterclass', time: '2 hours ago' },
    { type: 'question', message: 'Student question in Chatbot course', time: '4 hours ago' },
    { type: 'completion', message: '12 students completed Module 3', time: '6 hours ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yellow-900 mb-2">
          Instructor Dashboard
        </h1>
        <p className="text-yellow-700">Welcome back, {user?.user_metadata?.full_name || 'Instructor'}! Here's your teaching overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-700">{stat.title}</p>
                    <p className="text-2xl font-bold text-yellow-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color} font-medium`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-yellow-100`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Management */}
        <Card className="bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900">Course Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-yellow-500 hover:bg-yellow-600 text-yellow-900">
              <Plus className="mr-2 h-4 w-4" />
              Create New Course
            </Button>
            <Button variant="outline" className="w-full justify-start border-yellow-300 text-yellow-700 hover:bg-yellow-50">
              <BookOpen className="mr-2 h-4 w-4" />
              Edit Course Content
            </Button>
            <Button variant="outline" className="w-full justify-start border-yellow-300 text-yellow-700 hover:bg-yellow-50">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Course Performance */}
        <Card className="lg:col-span-2 bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900">Course Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div key={index} className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-yellow-900">{course.title}</h4>
                    <span className="text-lg font-semibold text-green-600">{course.revenue}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-yellow-700">
                    <div>
                      <span className="block font-medium">{course.students}</span>
                      <span>Students</span>
                    </div>
                    <div>
                      <span className="block font-medium">{course.completion}%</span>
                      <span>Completion</span>
                    </div>
                    <div>
                      <span className="block font-medium">⭐ {course.rating}</span>
                      <span>Rating</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Interactions */}
        <Card className="lg:col-span-1 bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900 flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Student Interactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-900">5 Pending Q&A</p>
                <p className="text-xs text-yellow-700">Chatbot course discussion</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-900">3 New Messages</p>
                <p className="text-xs text-yellow-700">Direct student messages</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-900">12 Assignments</p>
                <p className="text-xs text-yellow-700">Awaiting review</p>
              </div>
              <Button variant="outline" className="w-full text-sm border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                View All Interactions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-yellow-100">
                  <span className="text-sm text-yellow-700">{activity.message}</span>
                  <span className="text-sm text-yellow-600">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
