
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedAutomations from '@/components/FeaturedAutomations';
import TrustIndicators from '@/components/TrustIndicators';
import Footer from '@/components/Footer';
import IntegrationsSection from '@/components/IntegrationsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FeaturesSection from '@/components/FeaturesSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans">
      <Header />
      <main className="space-y-20">
        <HeroSection />
        <IntegrationsSection />
        <FeaturesSection />
        <CategoryGrid />
        <FeaturedAutomations />
        <TestimonialsSection />
        <TrustIndicators />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
