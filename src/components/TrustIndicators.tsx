
import React from 'react';
import { Shield, Users, Zap, Award, CheckCircle, TrendingUp } from 'lucide-react';

const TrustIndicators = () => {
  const stats = [
    {
      icon: Users,
      number: '50,000+',
      label: 'Active Users',
      description: 'Businesses trust our platform'
    },
    {
      icon: Zap,
      number: '2.3M+',
      label: 'Automations Deployed',
      description: 'Successfully running workflows'
    },
    {
      icon: Shield,
      number: '99.9%',
      label: 'Uptime SLA',
      description: 'Enterprise-grade reliability'
    },
    {
      icon: TrendingUp,
      number: '$47M+',
      label: 'Cost Savings',
      description: 'Generated for our customers'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 Type II compliant with end-to-end encryption and audit trails'
    },
    {
      icon: CheckCircle,
      title: 'Verified Automations',
      description: 'Every automation is tested, reviewed, and verified by our expert team'
    },
    {
      icon: Award,
      title: 'Performance Guarantee',
      description: '30-day money-back guarantee and SLA-backed performance metrics'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors duration-300 mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            );
          })}
        </div>

        {/* Trust Features */}
        <div className="border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Enterprise Trust
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We understand that automation touches your most critical business processes. That's why we've built enterprise-grade security, reliability, and support into every aspect of our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200 transition-colors duration-300 mb-6">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="border-t border-gray-200 pt-16 mt-16">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-8">
              Trusted by enterprises worldwide and compliant with global standards
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-gray-600" />
                <span className="font-semibold text-gray-700">SOC 2 Type II</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-gray-600" />
                <span className="font-semibold text-gray-700">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-gray-600" />
                <span className="font-semibold text-gray-700">HIPAA Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-gray-600" />
                <span className="font-semibold text-gray-700">ISO 27001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
