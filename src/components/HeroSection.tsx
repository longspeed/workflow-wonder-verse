import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-100 overflow-hidden min-h-[60vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 w-full h-64 opacity-40">
          <path fill="url(#flow)" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,181.3C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          <defs>
            <linearGradient id="flow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4F8CFF" />
              <stop offset="100%" stopColor="#A5B4FC" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Crafting <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">Super Smooth</span>
                <br /> Digital Experiences
              </h1>
              <p className="text-2xl text-gray-600 leading-relaxed max-w-xl">
                Elevate your workflow with clarity, simplicity, and effortless automation. Discover the next generation of user-centric, elegant, and responsive design.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 text-xl shadow-lg group"
              >
                Explore Marketplace
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-300 hover:border-primary px-10 py-4 text-xl"
              >
                Start Selling
              </Button>
            </div>
            <div className="flex items-center space-x-10 pt-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Zap className="h-6 w-6 text-yellow-500" />
                <span className="text-base font-medium">Lightning Fast Setup</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Shield className="h-6 w-6 text-green-500" />
                <span className="text-base font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Cpu className="h-6 w-6 text-primary" />
                <span className="text-base font-medium">AI-Powered</span>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="relative bg-white rounded-3xl shadow-2xl p-10 transform rotate-2 hover:rotate-0 transition-transform duration-300 border border-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-indigo-400 rounded-3xl opacity-10" />
              <div className="relative space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 text-lg">Workflow Automation</h3>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                <div className="space-y-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2.5 bg-blue-200 rounded-full">
                        <div className="h-2.5 bg-primary rounded-full w-4/5 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2.5 bg-purple-200 rounded-full">
                        <div className="h-2.5 bg-indigo-500 rounded-full w-3/5 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2.5 bg-green-200 rounded-full">
                        <div className="h-2.5 bg-green-600 rounded-full w-5/6 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center pt-6">
                  <span className="text-base text-gray-500">Processing 1,247 tasks/min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
