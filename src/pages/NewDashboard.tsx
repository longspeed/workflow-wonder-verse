import React from 'react';
import { DollarSign, Zap, Star, Menu } from 'lucide-react';

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
  { label: 'Dashboard', icon: Star },
  { label: 'Listings', icon: Zap },
  { label: 'Analytics', icon: DollarSign },
  { label: 'Settings', icon: Menu },
];

const NewDashboard = () => {
  return (
    <div className="min-h-screen bg-yellow-50 font-homepage flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-yellow-200 to-yellow-100 border-r border-yellow-300 p-8 flex flex-col gap-8">
        <div className="text-2xl font-extrabold text-yellow-900 mb-8 tracking-tight">GoldDash</div>
        <nav className="flex flex-col gap-4">
          {sidebarLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <a key={idx} href="#" className="flex items-center gap-3 px-4 py-2 rounded-xl text-yellow-900 hover:bg-yellow-300/40 font-semibold transition-all">
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
        <header className="bg-white border-b border-yellow-200 px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-yellow-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-yellow-900 font-medium">Welcome, User</span>
            <img src="/avatar.svg" alt="User avatar" className="w-10 h-10 rounded-full border-2 border-yellow-300" />
          </div>
        </header>
        {/* Stat Cards */}
        <main className="flex-1 p-8 bg-yellow-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className={`rounded-2xl shadow-lg bg-gradient-to-br ${stat.color} text-yellow-900 p-6 flex items-center gap-6`}>
                  <div className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-yellow-900" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-lg text-yellow-900/80 font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Placeholder for more dashboard content */}
          <div className="bg-white rounded-2xl p-8 text-center text-yellow-900 text-lg font-medium shadow-inner border border-yellow-100">
            More analytics and management tools coming soon!
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewDashboard; 