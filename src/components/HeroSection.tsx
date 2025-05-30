import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-[#FCFCFC] pt-20 pb-12 sm:pb-20 border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4" style={{fontFamily: 'Inter, ui-sans-serif'}}> 
          Building better restaurant teams<br />
          <span className="block">one shift at a time</span>
        </h1>
        <div className="flex items-center justify-center space-x-2 text-lg font-medium text-gray-700 mb-2">
          <span>4.7</span>
          <Star className="w-5 h-5 text-[#FF9900] fill-[#FF9900]" />
          <span className="text-gray-900 font-semibold">12,000+</span>
          <span>Reviews</span>
        </div>
        <p className="text-lg text-gray-500 mb-8 max-w-xl">
          Bring everything together—manage your team from one app.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button size="lg" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-200">
            Start free trial
          </Button>
          <Button size="lg" variant="outline" className="bg-white border border-gray-200 text-gray-900 px-8 py-4 text-lg font-semibold rounded-full shadow-sm hover:bg-gray-50 transition-all duration-200">
            Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
