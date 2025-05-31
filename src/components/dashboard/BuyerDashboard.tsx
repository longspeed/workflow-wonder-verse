
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Star, Heart, Clock, BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const BuyerDashboard = () => {
  const { user } = useAuth();

  const purchasedAutomations = [
    { name: 'Email Marketing Bot', purchaseDate: '2024-01-15', status: 'Active', rating: 5 },
    { name: 'Social Media Scheduler', purchaseDate: '2024-01-10', status: 'Active', rating: 4 },
    { name: 'Lead Generation Tool', purchaseDate: '2024-01-05', status: 'Active', rating: 5 },
  ];

  const recommendedAutomations = [
    { name: 'Content Creation AI', price: '$29.99', rating: 4.8, category: 'Marketing' },
    { name: 'Customer Support Bot', price: '$39.99', rating: 4.9, category: 'Support' },
    { name: 'Data Analysis Tool', price: '$49.99', rating: 4.7, category: 'Analytics' },
  ];

  const wishlistItems = [
    { name: 'Advanced CRM Integration', price: '$59.99', rating: 4.6 },
    { name: 'Multi-Platform Posting Bot', price: '$34.99', rating: 4.8 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yellow-900 mb-2">
          Welcome back, {user?.user_metadata?.full_name || 'User'}!
        </h1>
        <p className="text-yellow-700">Manage your automations and discover new ones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Automations Library */}
        <Card className="lg:col-span-2 bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900 flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              My Automations Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {purchasedAutomations.map((automation, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-yellow-900">{automation.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-yellow-700">
                      <span>Purchased: {automation.purchaseDate}</span>
                      <span className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        {automation.rating}/5
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {automation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-yellow-700">Total Purchases</span>
                <span className="font-semibold text-yellow-900">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-700">Active Automations</span>
                <span className="font-semibold text-yellow-900">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-700">Total Spent</span>
                <span className="font-semibold text-yellow-900">$485.90</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-700">Wishlist Items</span>
                <span className="font-semibold text-yellow-900">5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended for You */}
        <Card className="lg:col-span-2 bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900">Recommended for You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedAutomations.map((automation, index) => (
                <div key={index} className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">{automation.name}</h4>
                  <div className="flex items-center justify-between text-sm text-yellow-700 mb-3">
                    <span>{automation.category}</span>
                    <span className="flex items-center">
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      {automation.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-yellow-900">{automation.price}</span>
                    <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wishlist */}
        <Card className="bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900 flex items-center">
              <Heart className="mr-2 h-5 w-5" />
              Wishlist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {wishlistItems.map((item, index) => (
                <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                  <h5 className="font-medium text-yellow-900 text-sm">{item.name}</h5>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold text-yellow-900">{item.price}</span>
                    <span className="flex items-center text-xs text-yellow-700">
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      {item.rating}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-sm border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                View All Wishlist
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3 bg-white border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900 flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h5 className="font-medium text-yellow-900 mb-2">Latest Purchase</h5>
                <p className="text-sm text-yellow-700">Email Marketing Bot</p>
                <p className="text-xs text-yellow-600">January 15, 2024</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h5 className="font-medium text-yellow-900 mb-2">Recent Review</h5>
                <p className="text-sm text-yellow-700">Rated Social Scheduler 4⭐</p>
                <p className="text-xs text-yellow-600">2 days ago</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h5 className="font-medium text-yellow-900 mb-2">Support Request</h5>
                <p className="text-sm text-yellow-700">Help with Lead Generation Tool</p>
                <p className="text-xs text-yellow-600">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuyerDashboard;
