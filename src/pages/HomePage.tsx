
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Code, Users } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CategoryGrid from '@/components/CategoryGrid';
import TestimonialsSection from '@/components/TestimonialsSection';
import TrustIndicators from '@/components/TrustIndicators';
import IntegrationsSection from '@/components/IntegrationsSection';
import FeaturedAutomations from '@/components/FeaturedAutomations';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <FeaturesSection />
      <CategoryGrid />
      <FeaturedAutomations />
      <TestimonialsSection />
      <TrustIndicators />
      <IntegrationsSection />
      
      {/* CTA Section */}
      <section className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
            Ready to Get Started?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Join thousands of learners who have transformed their workflows with our platform.
          </p>
          <Link to="/auth">
            <Button className="bg-primary hover:bg-primary/90">
              Start Learning Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
