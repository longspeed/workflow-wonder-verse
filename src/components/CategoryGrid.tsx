
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageSquare, 
  Mail, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  FileText, 
  Calendar, 
  Zap,
  Database,
  Bot,
  Workflow,
  CreditCard
} from 'lucide-react';

const categories = [
  {
    name: 'Customer Support',
    icon: MessageSquare,
    count: '1,247',
    description: 'AI chatbots, ticket routing, sentiment analysis',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Email Marketing',
    icon: Mail,
    count: '892',
    description: 'Campaign automation, personalization, analytics',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    name: 'E-commerce',
    icon: ShoppingCart,
    count: '1,053',
    description: 'Inventory management, pricing optimization',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Analytics & BI',
    icon: BarChart3,
    count: '734',
    description: 'Data visualization, predictive modeling',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    name: 'CRM & Sales',
    icon: Users,
    count: '1,189',
    description: 'Lead scoring, pipeline automation, forecasting',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    name: 'Document Processing',
    icon: FileText,
    count: '567',
    description: 'OCR, data extraction, workflow automation',
    gradient: 'from-teal-500 to-blue-500'
  },
  {
    name: 'Scheduling & Calendar',
    icon: Calendar,
    count: '423',
    description: 'Meeting coordination, resource booking',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    name: 'Process Automation',
    icon: Zap,
    count: '1,456',
    description: 'Workflow orchestration, task automation',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    name: 'Data Integration',
    icon: Database,
    count: '689',
    description: 'ETL pipelines, API connectors, sync tools',
    gradient: 'from-slate-500 to-gray-500'
  },
  {
    name: 'AI Assistants',
    icon: Bot,
    count: '832',
    description: 'Virtual assistants, voice processing',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    name: 'Workflow Management',
    icon: Workflow,
    count: '945',
    description: 'Project automation, team collaboration',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    name: 'Finance & Payments',
    icon: CreditCard,
    count: '378',
    description: 'Invoice processing, expense automation',
    gradient: 'from-emerald-500 to-teal-500'
  }
];

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore AI Automation Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover intelligent automations across every business function. From customer support to financial processing, find the perfect solution for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.name}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-gray-200 hover:border-gray-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-start space-y-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1 w-full">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                          {category.name}
                        </h3>
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
