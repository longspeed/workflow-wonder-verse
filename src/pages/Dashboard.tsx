
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { DollarSign, Zap, Star, Menu, Loader2, ArrowRight, Search, Settings, Users, BarChart3, Plus } from 'lucide-react';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

const sidebarItems = [
  { label: 'Dashboard', icon: BarChart3, active: true },
  { label: 'Search', icon: Search },
  { label: 'Updates', icon: Zap, badge: '6' },
  { label: 'Goals', icon: Star },
];

const templates = [
  {
    title: 'Sales Automation',
    description: 'TheyDo',
    color: 'bg-pink-100',
    textColor: 'text-pink-700'
  },
  {
    title: 'Customer Journey',
    description: 'TheyDo',
    color: 'bg-pink-100',
    textColor: 'text-pink-700'
  },
  {
    title: 'Marketing Flow',
    description: 'TheyDo',
    color: 'bg-pink-100',
    textColor: 'text-pink-700'
  },
  {
    title: 'Data Analytics',
    description: 'TheyDo',
    color: 'bg-green-100',
    textColor: 'text-green-700'
  },
  {
    title: 'Service Blueprint',
    description: 'TheyDo',
    color: 'bg-purple-100',
    textColor: 'text-purple-700'
  },
];

const quickActions = [
  {
    title: 'Start a journey',
    description: 'Use a template or start from scratch',
    icon: ArrowRight,
    color: 'text-purple-600'
  },
  {
    title: 'Create insights',
    description: 'Import from CSV or create yourself',
    icon: BarChart3,
    color: 'text-blue-600'
  },
  {
    title: 'Create personas',
    description: 'Add your customers, link to a journey',
    icon: Users,
    color: 'text-orange-600'
  },
];

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserRole = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          const userMetadata = user.user_metadata;
          const role = userMetadata?.role || ['buyer', 'seller', 'teacher', 'learner'][Math.floor(Math.random() * 4)];
          setUserRole(role);
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole('buyer');
        } finally {
          setRoleLoading(false);
        }
      };
      fetchUserRole();
    } else if (!loading) {
      setRoleLoading(false);
    }
  }, [user, loading]);

  if (loading || (user && roleLoading)) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className="w-64 bg-white border-r border-gray-200 p-6">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1 p-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (userRole === 'seller') {
    return <Navigate to="/seller-dashboard" replace />;
  } else if (userRole === 'buyer') {
    return <Navigate to="/buyer-dashboard" replace />;
  }

  const userMetadata = user.user_metadata;
  const userName = userMetadata?.full_name || user.email || 'User';

  const handleError = (error: Error) => {
    console.error('Dashboard error:', error);
    toast('An error occurred in the dashboard');
  };

  return (
    <ErrorBoundary onError={handleError}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-white border-r border-gray-200 flex flex-col"
        >
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">AutomateAI</h2>
                <p className="text-sm text-gray-500">Design Team</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {sidebarItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      item.active 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Journey Frameworks */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">Journey frameworks</h3>
                <Plus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="space-y-2">
                <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm">[AI] Sample Journey</span>
                </div>
                <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <span className="text-sm ml-5">Lifecycle Framework</span>
                </div>
              </div>
            </div>

            {/* Building blocks */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Building blocks</h3>
              <div className="space-y-2">
                {['Journeys', 'Personas', 'Metrics', 'Insights', 'Opportunities', 'Solutions'].map((item) => (
                  <div key={item} className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </nav>

          {/* Bottom section */}
          <div className="p-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">Full access activated</span>
              </div>
              <p className="text-xs text-gray-600">11 days remaining</p>
            </div>
            <div className="space-y-2">
              <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer text-sm">
                Invite collaborators
              </div>
              <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer text-sm">
                Help & support
              </div>
              <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer text-sm">
                Settings
              </div>
              <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer text-sm">
                Logout
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white border-b border-gray-200 px-8 py-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Welcome, {userName.split(' ')[0] || 'Sam'}!</h1>
              </div>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                Invite
              </Button>
            </div>
          </motion.div>

          {/* Main Dashboard Content */}
          <div className="p-8">
            {/* Quick Actions */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg bg-gray-100`}>
                          <Icon className={`w-6 h-6 ${action.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </motion.div>

            {/* Templates Section */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Start with a template</h2>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  See more
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {templates.map((template, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className={`${template.color} rounded-lg p-6 mb-3 h-32 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <div className="w-full h-full bg-white/50 rounded border-2 border-dashed border-white/70"></div>
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm">{template.title}</h3>
                    <p className="text-xs text-gray-500">{template.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Projects */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Jump back in</h2>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  View all
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">ER</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Enhancing Retail Experience</h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">L3 - Task Journey</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">[AI]</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">[AI] Sample Journey</h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="outline" className="border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Journey
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
