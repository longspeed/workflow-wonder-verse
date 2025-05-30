
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                The Future of
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  AI Automation
                </span>
                Starts Here
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Discover, integrate, and deploy intelligent automations that transform your business operations. Join thousands of organizations already scaling with AI.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg group"
              >
                Explore Marketplace
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-300 hover:border-gray-400 px-8 py-3 text-lg"
              >
                Start Selling
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">Lightning Fast Setup</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Cpu className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-10" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Workflow Automation</h3>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-blue-200 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full w-4/5 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-purple-200 rounded-full">
                        <div className="h-2 bg-purple-600 rounded-full w-3/5 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-green-200 rounded-full">
                        <div className="h-2 bg-green-600 rounded-full w-5/6 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <span className="text-sm text-gray-500">Processing 1,247 tasks/min</span>
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
