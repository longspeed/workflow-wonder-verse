import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { DollarSign, Zap, Star, Menu, Loader2, ArrowRight } from 'lucide-react';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const stats = [
  {
    label: 'Total Sales',
    value: '2,340',
    icon: DollarSign,
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    label: 'Active Listings',
    value: '18',
    icon: Zap,
    color: 'from-yellow-300 to-yellow-500',
  },
  {
    label: 'Revenue',
    value: '$54,200',
    icon: Star,
    color: 'from-yellow-200 to-yellow-400',
  },
];

const sidebarLinks = [
  { label: 'Dashboard', icon: Star, path: '/dashboard' },
  { label: 'Listings', icon: Zap, path: '/listings' },
  { label: 'Analytics', icon: DollarSign, path: '/analytics' },
  { label: 'Settings', icon: Menu, path: '/settings' },
];

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Section Skeleton */}
          <div className="bg-gradient-primary rounded-2xl p-8">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-6" />
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-50 p-6">
                <div className="flex items-center gap-6">
                  <Skeleton className="h-16 w-16 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Card Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-10 w-40" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Add more robust checks for user_metadata
  const userMetadata = user.user_metadata;
  const userRole = userMetadata?.role || 'seller';
  const userName = userMetadata?.full_name || user.email || 'User'; // Fallback to email if name is missing
  const userAvatar = userMetadata?.avatar_url || '/avatar.svg';

  const handleError = (error: Error) => {
    console.error('Dashboard error:', error);
    toast.error('An error occurred in the dashboard');
  };

  return (
    <ErrorBoundary onError={handleError}>
      <div className="min-h-screen bg-background">
        <AnimatePresence>
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden bg-gradient-primary rounded-2xl p-8 mb-8 mx-4 sm:mx-8 lg:mx-12 mt-8"
          >
            <div className="relative z-10">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-yellow-900 mb-4"
              >
                Welcome to Your Automation Hub
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-yellow-700 text-lg mb-6 max-w-2xl"
              >
                Streamline your workflows with our curated collection of automation solutions. 
                Discover new tools and optimize your productivity.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button className="btn-primary group">
                  Explore Automations
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute right-0 bottom-0"
            >
              <Zap className="w-64 h-64 text-yellow-900" />
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-8 lg:mx-12 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-2xl shadow-soft bg-gradient-to-br ${stat.color} text-foreground p-6 flex items-center gap-6 card-hover`}
                >
                  <motion.div 
                    whileHover={{ rotate: 5 }}
                    className={`bg-white/20 rounded-xl p-4 flex items-center justify-center`}
                  >
                    <Icon className="w-8 h-8 text-foreground" />
                  </motion.div>
                  <div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold"
                    >
                      {stat.value}
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg text-foreground/80 font-medium"
                    >
                      {stat.label}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Role-specific content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.6 }}
            className="mx-4 sm:mx-8 lg:mx-12"
          >
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="h-5 w-5 text-yellow-500" />
                  </motion.div>
                  Your Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-xl font-semibold mb-4"
                  >
                    Role: {userRole}
                  </motion.h2>
                  <AnimatePresence mode="wait">
                    {userRole === 'seller' && (
                      <motion.div
                        key="seller"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        <p>Welcome to your seller dashboard! Here you can manage your listings and track your sales.</p>
                        <Button className="btn-secondary">
                          Manage Listings
                        </Button>
                      </motion.div>
                    )}
                    {userRole === 'buyer' && (
                      <motion.div
                        key="buyer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        <p>Welcome to your buyer dashboard! Browse and purchase products here.</p>
                        <Button className="btn-secondary">
                          Browse Products
                        </Button>
                      </motion.div>
                    )}
                    {userRole === 'teacher' && (
                      <motion.div
                        key="teacher"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        <p>Welcome to your teacher dashboard! Manage your courses and students here.</p>
                        <Button className="btn-secondary">
                          Manage Courses
                        </Button>
                      </motion.div>
                    )}
                    {userRole === 'learner' && (
                      <motion.div
                        key="learner"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        <p>Welcome to your learner dashboard! Access your courses and track your progress here.</p>
                        <Button className="btn-secondary">
                          View Courses
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
