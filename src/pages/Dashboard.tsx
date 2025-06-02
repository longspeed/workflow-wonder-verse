import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { DollarSign, Zap, Star, Menu, Loader2 } from 'lucide-react';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { toast } from 'sonner';

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
      <div className="min-h-screen bg-background font-homepage flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r p-8 flex flex-col gap-8">
          <div className="text-2xl font-extrabold text-primary mb-8 tracking-tight">GoldDash</div>
          <nav className="flex flex-col gap-4">
            {sidebarLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={idx}
                  href={link.path}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-foreground hover:bg-accent font-semibold transition-all"
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </a>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-card border-b px-8 py-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-foreground font-medium">Welcome, {userName}</span>
              <img
                src={userAvatar}
                alt="User avatar"
                className="w-10 h-10 rounded-full border-2 border-primary"
              />
            </div>
          </header>

          {/* Stat Cards */}
          <main className="flex-1 p-8 bg-background">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl shadow-lg bg-gradient-to-br ${stat.color} text-foreground p-6 flex items-center gap-6`}
                  >
                    <div className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-foreground" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-lg text-foreground/80 font-medium">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Role-specific content */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border">
              <h2 className="text-xl font-semibold mb-4">Role: {userRole}</h2>
              {userRole === 'seller' && (
                <div className="space-y-4">
                  <p>Welcome to your seller dashboard! Here you can manage your listings and track your sales.</p>
                  {/* Add seller-specific components here */}
                </div>
              )}
              {userRole === 'buyer' && (
                <div className="space-y-4">
                  <p>Welcome to your buyer dashboard! Browse and purchase products here.</p>
                  {/* Add buyer-specific components here */}
                </div>
              )}
              {userRole === 'teacher' && (
                <div className="space-y-4">
                  <p>Welcome to your teacher dashboard! Manage your courses and students here.</p>
                  {/* Add teacher-specific components here */}
                </div>
              )}
              {userRole === 'learner' && (
                <div className="space-y-4">
                  <p>Welcome to your learner dashboard! Access your courses and track your progress here.</p>
                  {/* Add learner-specific components here */}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
