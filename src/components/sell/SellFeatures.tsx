
import React from 'react';
import { Shield, Globe, BarChart3, CreditCard, Headphones, Rocket } from 'lucide-react';

const SellFeatures = () => {
  const features = [
    {
      icon: Globe,
      title: "Global Marketplace",
      description: "Reach millions of potential customers worldwide with our extensive marketing network."
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Get paid quickly and securely with multiple payment options and fraud protection."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track your sales, customer engagement, and revenue with detailed analytics."
    },
    {
      icon: Shield,
      title: "IP Protection",
      description: "Your intellectual property is protected with our advanced security measures."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help anytime with our dedicated seller support team."
    },
    {
      icon: Rocket,
      title: "Marketing Tools",
      description: "Boost your sales with our built-in marketing and promotion tools."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Sell on AutomateAI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide everything you need to build a successful AI automation business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                  <IconComponent className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SellFeatures;
