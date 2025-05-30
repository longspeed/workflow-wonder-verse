import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Settings, Code, MousePointerClick, Shield, BarChart2, Globe } from 'lucide-react';

const features = [
  {
    icon: MousePointerClick,
    title: "No-Code Workflow Builder",
    description: "Visually design complex automations with an intuitive drag-and-drop interface. Connect apps and define logic without writing a single line of code.",
    color: 'text-yellow-700 bg-yellow-100',
  },
  {
    icon: Globe,
    title: "Seamless App Integrations",
    description: "Connect to all your essential business tools like Slack, Google Sheets, Stripe, HubSpot, and more. Sync data and automate tasks across your ecosystem.",
    color: 'text-yellow-700 bg-yellow-100',
  },
  {
    icon: BarChart2,
    title: "Real-time Analytics",
    description: "Monitor your automation performance with detailed dashboards. Track task runs, identify bottlenecks, and measure the impact on your business efficiency.",
    color: 'text-yellow-700 bg-yellow-100',
  },
  {
    icon: Settings,
    title: "Customizable Logic",
    description: "Build sophisticated workflows with conditional logic, filters, and data transformation steps. Tailor automations to fit your unique business processes.",
    color: 'text-yellow-700 bg-yellow-100',
  },
  {
    icon: Code,
    title: "Developer-Friendly API",
    description: "For advanced users, leverage our robust API to build custom integrations, extend functionality, and embed automation capabilities into your own applications.",
    color: 'text-yellow-700 bg-yellow-100',
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Your data and workflows are protected with industry-leading security measures, including encryption, access control, and regular security audits.",
    color: 'text-yellow-700 bg-yellow-100',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-yellow-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-900 to-yellow-700 bg-clip-text text-transparent mb-6 tracking-tight">
            Powerful Features for Your Business
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Automate tasks, connect apps, and streamline operations with our comprehensive suite of tools.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={idx} 
                className="group rounded-2xl shadow-xl hover:shadow-2xl border border-primary/20 hover:border-primary/40 bg-white/90 backdrop-blur transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-8 flex flex-col gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className={`rounded-xl p-4 w-14 h-14 flex items-center justify-center ${feature.color} relative`}>
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-yellow-900">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 