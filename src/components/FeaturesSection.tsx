import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Settings, Code, MousePointerClick, Shield, BarChart2, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: MousePointerClick,
    title: "No-Code Workflow Builder",
    description: "Visually design complex automations with an intuitive drag-and-drop interface. Connect apps and define logic without writing a single line of code.",
    color: 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/30',
    gradient: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
  },
  {
    icon: Globe,
    title: "Seamless App Integrations",
    description: "Connect to all your essential business tools like Slack, Google Sheets, Stripe, HubSpot, and more. Sync data and automate tasks across your ecosystem.",
    color: 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30',
    gradient: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    icon: BarChart2,
    title: "Real-time Analytics",
    description: "Monitor your automation performance with detailed dashboards. Track task runs, identify bottlenecks, and measure the impact on your business efficiency.",
    color: 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30',
    gradient: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
  },
  {
    icon: Settings,
    title: "Customizable Logic",
    description: "Build sophisticated workflows with conditional logic, filters, and data transformation steps. Tailor automations to fit your unique business processes.",
    color: 'text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/30',
    gradient: 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30',
  },
  {
    icon: Code,
    title: "Developer-Friendly API",
    description: "For advanced users, leverage our robust API to build custom integrations, extend functionality, and embed automation capabilities into your own applications.",
    color: 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30',
    gradient: 'from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30',
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Your data and workflows are protected with industry-leading security measures, including encryption, access control, and regular security audits.",
    color: 'text-indigo-700 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/30',
    gradient: 'from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-yellow-50/30 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-900 to-yellow-700 dark:from-yellow-300 dark:to-yellow-500 bg-clip-text text-transparent mb-6 tracking-tight">
            Powerful Features for Your Business
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Automate tasks, connect apps, and streamline operations with our comprehensive suite of tools.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card 
                  className="group rounded-2xl shadow-xl hover:shadow-2xl border border-primary/20 hover:border-primary/40 bg-white/90 dark:bg-gray-800/90 backdrop-blur transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-8 flex flex-col gap-6">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                      <div className={`rounded-xl p-4 w-14 h-14 flex items-center justify-center ${feature.color} relative`}>
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100">{feature.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                    <div className="flex items-center text-primary dark:text-primary/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 