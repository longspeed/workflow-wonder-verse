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
    <div className="min-h-screen bg-white font-homepage">
      <Header />
      <main className="space-y-24">
        <HeroSection />
        <IntegrationsSection />
        <TestimonialsSection />
        <FeaturesSection />
        <CategoryGrid />
        <FeaturedAutomations />
        <TrustIndicators />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
