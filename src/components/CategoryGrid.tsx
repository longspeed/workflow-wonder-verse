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
    gradient: 'from-yellow-300 to-yellow-500'
  },
  {
    name: 'Email Marketing',
    icon: Mail,
    count: '892',
    description: 'Campaign automation, personalization, analytics',
    gradient: 'from-yellow-400 to-yellow-600'
  },
  {
    name: 'E-commerce',
    icon: ShoppingCart,
    count: '1,053',
    description: 'Inventory management, pricing optimization',
    gradient: 'from-yellow-200 to-yellow-400'
  },
  {
    name: 'Analytics & BI',
    icon: BarChart3,
    count: '734',
    description: 'Data visualization, predictive modeling',
    gradient: 'from-yellow-500 to-yellow-700'
  },
  {
    name: 'CRM & Sales',
    icon: Users,
    count: '1,189',
    description: 'Lead scoring, pipeline automation, forecasting',
    gradient: 'from-yellow-300 to-yellow-500'
  },
  {
    name: 'Document Processing',
    icon: FileText,
    count: '567',
    description: 'OCR, data extraction, workflow automation',
    gradient: 'from-yellow-400 to-yellow-600'
  },
  {
    name: 'Scheduling & Calendar',
    icon: Calendar,
    count: '423',
    description: 'Meeting coordination, resource booking',
    gradient: 'from-yellow-200 to-yellow-400'
  },
  {
    name: 'Process Automation',
    icon: Zap,
    count: '1,456',
    description: 'Workflow orchestration, task automation',
    gradient: 'from-yellow-500 to-yellow-700'
  },
  {
    name: 'Data Integration',
    icon: Database,
    count: '689',
    description: 'ETL pipelines, API connectors, sync tools',
    gradient: 'from-yellow-300 to-yellow-500'
  },
  {
    name: 'AI Assistants',
    icon: Bot,
    count: '832',
    description: 'Virtual assistants, voice processing',
    gradient: 'from-yellow-400 to-yellow-600'
  },
  {
    name: 'Workflow Management',
    icon: Workflow,
    count: '945',
    description: 'Project automation, team collaboration',
    gradient: 'from-yellow-200 to-yellow-400'
  },
  {
    name: 'Finance & Payments',
    icon: CreditCard,
    count: '378',
    description: 'Invoice processing, expense automation',
    gradient: 'from-yellow-500 to-yellow-700'
  }
];

const CategoryGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-yellow-900 mb-4 tracking-tight">
            Explore AI Automation Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover intelligent automations across every business function. From customer support to financial processing, find the perfect solution for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.name}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border border-border hover:border-primary/40 hover:-translate-y-1 bg-white/90 backdrop-blur rounded-2xl smooth-motion"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col items-start space-y-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-lg">
                          {category.name}
                        </h3>
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {category.count}
                        </span>
                      </div>
                      <p className="text-base text-gray-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-primary to-yellow-600 hover:from-primary/90 hover:to-yellow-700 text-yellow-900 px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl smooth-motion">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
