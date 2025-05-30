
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedAutomations from '@/components/FeaturedAutomations';
import TrustIndicators from '@/components/TrustIndicators';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <FeaturedAutomations />
        <TrustIndicators />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
