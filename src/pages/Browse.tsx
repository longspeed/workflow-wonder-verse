import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Star } from 'lucide-react';

const automations = [
  {
    name: 'Smart Email Responder',
    description: 'AI that drafts and sends replies to emails automatically.',
    rating: 4.8,
    reviews: 320,
    price: '$49/mo',
    icon: Zap,
    tag: 'Productivity',
  },
  {
    name: 'CRM Data Sync',
    description: 'Seamlessly syncs customer data between platforms.',
    rating: 4.7,
    reviews: 210,
    price: '$29/mo',
    icon: Zap,
    tag: 'CRM',
  },
  // ...add more mock automations
];

const Browse = () => {
  return (
    <div className="min-h-screen bg-white font-homepage">
      <Header />
      <main className="pt-12 pb-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Browse AI Automations</h1>
          <p className="text-lg text-gray-500 mb-6">Discover, compare, and deploy the best AI automations for your business needs.</p>
          <div className="flex justify-center">
            <Input className="w-full max-w-lg rounded-full px-6 py-4 text-lg border-gray-200 shadow-sm focus:border-primary" placeholder="Search automations..." />
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {/* Filter Sidebar */}
          <aside className="hidden lg:block w-64 pt-2">
            <div className="bg-gray-50 rounded-2xl shadow p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <select className="w-full rounded-lg border-gray-200">
                  <option>All</option>
                  <option>Productivity</option>
                  <option>CRM</option>
                  <option>Marketing</option>
                  <option>Analytics</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price</label>
                <select className="w-full rounded-lg border-gray-200">
                  <option>All</option>
                  <option>Free</option>
                  <option>Under $50/mo</option>
                  <option>$50-$100/mo</option>
                  <option>Enterprise</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Rating</label>
                <select className="w-full rounded-lg border-gray-200">
                  <option>All</option>
                  <option>4 stars & up</option>
                  <option>3 stars & up</option>
                </select>
              </div>
            </div>
          </aside>
          {/* Automations Grid */}
          <section className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {automations.map((automation, idx) => {
                const Icon = automation.icon;
                return (
                  <Card key={idx} className="rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 rounded-xl p-3">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary mb-1">{automation.name}</h3>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{automation.tag}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{automation.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-5 h-5 fill-yellow-400" />
                          <span className="font-semibold text-gray-900 ml-1">{automation.rating}</span>
                          <span className="text-gray-500 text-sm">({automation.reviews})</span>
                        </div>
                        <span className="text-lg font-bold text-primary">{automation.price}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse; 