
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const SellerBenefits = () => {
  const benefits = [
    "Keep 85% of every sale",
    "No upfront listing fees",
    "Global payment processing",
    "Built-in marketing tools",
    "Dedicated seller support",
    "Real-time analytics",
    "Automated tax handling",
    "Mobile seller dashboard"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Start Earning Today
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join our community of successful sellers who are building profitable businesses 
              by sharing their AI automation expertise with the world.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-blue-100">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              >
                Contact Sales
              </Button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Success Stories</h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-400 pl-4">
                <p className="text-blue-100 mb-2">
                  "I've made over $50,000 in my first year selling email automation workflows. 
                  The platform makes it so easy to reach customers."
                </p>
                <p className="text-sm text-blue-200">- Sarah Chen, AI Developer</p>
              </div>
              
              <div className="border-l-4 border-yellow-400 pl-4">
                <p className="text-blue-100 mb-2">
                  "AutomateAI helped me turn my side project into a full-time business. 
                  The seller tools are incredible."
                </p>
                <p className="text-sm text-blue-200">- Marcus Johnson, Automation Specialist</p>
              </div>
              
              <div className="border-l-4 border-purple-400 pl-4">
                <p className="text-blue-100 mb-2">
                  "The marketplace exposure is amazing. I get customers from all over the world 
                  without any marketing effort."
                </p>
                <p className="text-sm text-blue-200">- Elena Rodriguez, CRM Expert</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerBenefits;
