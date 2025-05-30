import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Zap, Star } from 'lucide-react';

const stats = [
  {
    label: 'Total Sales',
    value: '1,245',
    icon: DollarSign,
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    label: 'Active Listings',
    value: '12',
    icon: Zap,
    color: 'from-yellow-300 to-yellow-500',
  },
  {
    label: 'Revenue',
    value: '$23,400',
    icon: Star,
    color: 'from-yellow-200 to-yellow-400',
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white font-homepage">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">Welcome to Your Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="rounded-2xl shadow-lg border-0 bg-gradient-to-br {stat.color} text-yellow-900">
                <CardContent className="p-6 flex items-center gap-6">
                  <div className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-yellow-900" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-lg text-yellow-900/80 font-medium">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* Placeholder for more dashboard content */}
        <div className="bg-yellow-50 rounded-2xl p-8 text-center text-yellow-900 text-lg font-medium shadow-inner">
          More analytics and management tools coming soon!
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard; 