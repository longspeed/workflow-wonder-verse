
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SellerDashboard from '@/components/dashboard/SellerDashboard';
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';
import LearnerDashboard from '@/components/dashboard/LearnerDashboard';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // For now, we'll show seller dashboard by default
  // Later you can add user role detection based on user metadata or profile
  const userRole = user.user_metadata?.role || 'seller';

  const renderDashboard = () => {
    switch (userRole) {
      case 'seller':
        return <SellerDashboard />;
      case 'buyer':
        return <div className="p-8 text-center">Buyer Dashboard - Coming Soon</div>;
      case 'teacher':
        return <TeacherDashboard />;
      case 'learner':
        return <LearnerDashboard />;
      default:
        return <SellerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 font-homepage">
      <Header />
      <main className="pt-6">
        {renderDashboard()}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
