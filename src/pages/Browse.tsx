
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AutomationMarketplace from '@/components/AutomationMarketplace';

const Browse = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Browse Automations
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover powerful automations to streamline your workflow
          </p>
        </div>
        <AutomationMarketplace />
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
