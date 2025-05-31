import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Zap, Star, MessageSquare, Plus, Edit, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AddAutomationModal from './AddAutomationModal';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);

  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,450',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Active Listings',
      value: '23',
      change: '+3 this week',
      icon: Zap,
      color: 'text-blue-600',
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '142 reviews',
      icon: Star,
      color: 'text-yellow-600',
    },
    {
      title: 'Total Sales',
      value: '1,284',
      change: '+18 today',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
  ];

  const topAutomations = [
    { name: 'Email Marketing Bot', sales: 245, revenue: '$4,900', rating: 4.9 },
    { name: 'Social Media Scheduler', sales: 189, revenue: '$3,780', rating: 4.7 },
    { name: 'Lead Generation Tool', sales: 156, revenue: '$3,120', rating: 4.8 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yellow-900 mb-2">
          Welcome back, {user?.user_metadata?.full_name || 'Seller'}!
        </h1>
        <p className="text-yellow-700">Here's what's happening with your automations today.</p>
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
        {/* Quick Actions */}
        <Card className="bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start bg-yellow-500 hover:bg-yellow-600 text-yellow-900"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Automation
            </Button>
            <Button variant="outline" className="w-full justify-start border-yellow-300 text-yellow-700 hover:bg-yellow-50">
              <Edit className="mr-2 h-4 w-4" />
              Edit Existing Listing
            </Button>
            <Button variant="outline" className="w-full justify-start border-yellow-300 text-yellow-700 hover:bg-yellow-50">
              <Users className="mr-2 h-4 w-4" />
              View My Storefront
            </Button>
          </CardContent>
        </Card>

        {/* Top Performing Automations */}
        <Card className="lg:col-span-2 bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900">Top Performing Automations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topAutomations.map((automation, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-yellow-900">{automation.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-yellow-700">
                      <span>{automation.sales} sales</span>
                      <span className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        {automation.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-yellow-900">{automation.revenue}</p>
                    <p className="text-sm text-yellow-600">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Communications Hub */}
        <Card className="lg:col-span-1 bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900 flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-900">New support request</p>
                <p className="text-xs text-yellow-700">About Email Marketing Bot</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-900">Customer review</p>
                <p className="text-xs text-yellow-700">5 stars on Social Scheduler</p>
              </div>
              <Button variant="outline" className="w-full text-sm border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                View All Messages
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
              <div className="flex items-center justify-between py-2 border-b border-yellow-100">
                <span className="text-sm text-yellow-700">New sale: Email Marketing Bot</span>
                <span className="text-sm font-medium text-green-600">+$20.00</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-yellow-100">
                <span className="text-sm text-yellow-700">Review received on Lead Generation Tool</span>
                <span className="text-sm text-yellow-600">⭐ 5 stars</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-yellow-100">
                <span className="text-sm text-yellow-700">Product view: Social Media Scheduler</span>
                <span className="text-sm text-yellow-600">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Automation Modal */}
      <AddAutomationModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal}
        onSuccess={() => {
          // You can add logic here to refresh the dashboard data
          console.log('New automation added successfully!');
        }}
      />
    </div>
  );
};

export default SellerDashboard;
