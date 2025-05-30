
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Download, Eye, TrendingUp, Zap, Shield } from 'lucide-react';

const featuredAutomations = [
  {
    id: 1,
    name: 'Intelligent Customer Support Triager',
    description: 'AI-powered ticket classification and routing system that reduces response time by 75% using advanced NLP and sentiment analysis.',
    seller: 'AutoFlow Labs',
    rating: 4.9,
    reviews: 1247,
    downloads: '12.3K',
    price: '$299/month',
    tags: ['Customer Support', 'NLP', 'Sentiment Analysis'],
    image: '/placeholder.svg',
    badge: 'Editor\'s Choice',
    metrics: {
      accuracy: '94%',
      timeReduction: '75%',
      satisfaction: '4.8/5'
    }
  },
  {
    id: 2,
    name: 'E-commerce Inventory Optimizer',
    description: 'Machine learning automation that predicts demand, optimizes stock levels, and prevents stockouts across multiple channels.',
    seller: 'RetailAI Solutions',
    rating: 4.8,
    reviews: 892,
    downloads: '8.7K',
    price: '$149/month',
    tags: ['E-commerce', 'Machine Learning', 'Inventory'],
    image: '/placeholder.svg',
    badge: 'Trending',
    metrics: {
      costSavings: '32%',
      accuracy: '91%',
      roi: '340%'
    }
  },
  {
    id: 3,
    name: 'Contract Analysis Engine',
    description: 'Automated contract review and risk assessment using GPT-4 Turbo with legal domain expertise and compliance checking.',
    seller: 'LegalTech Pro',
    rating: 4.7,
    reviews: 567,
    downloads: '5.2K',
    price: '$599/month',
    tags: ['Legal', 'Document Processing', 'Compliance'],
    image: '/placeholder.svg',
    badge: 'Enterprise',
    metrics: {
      timeReduction: '85%',
      accuracy: '96%',
      riskDetection: '89%'
    }
  },
  {
    id: 4,
    name: 'Social Media Content Generator',
    description: 'Multi-platform content creation automation with brand voice learning, hashtag optimization, and performance tracking.',
    seller: 'ContentAI Studio',
    rating: 4.6,
    reviews: 1034,
    downloads: '15.8K',
    price: '$79/month',
    tags: ['Marketing', 'Content Creation', 'Social Media'],
    image: '/placeholder.svg',
    badge: 'Popular',
    metrics: {
      engagement: '+127%',
      contentVolume: '10x',
      brandConsistency: '93%'
    }
  }
];

const FeaturedAutomations = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured AI Automations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hand-picked automations that are transforming businesses worldwide. Verified performance, enterprise-ready, and trusted by thousands.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {featuredAutomations.map((automation) => (
            <Card 
              key={automation.id}
              className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-gray-200 hover:border-gray-300 bg-white"
            >
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                          {automation.name}
                        </h3>
                        <Badge 
                          variant={automation.badge === 'Editor\'s Choice' ? 'default' : 'secondary'}
                          className={`${
                            automation.badge === 'Editor\'s Choice' 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                              : automation.badge === 'Trending'
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                              : automation.badge === 'Enterprise'
                              ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
                              : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                          }`}
                        >
                          {automation.badge}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3 leading-relaxed">
                        {automation.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span>by {automation.seller}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{automation.rating}</span>
                          <span>({automation.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{automation.downloads}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {automation.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                    {Object.entries(automation.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-gray-900">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{automation.price}</span>
                      <span className="text-sm text-gray-500">starting at</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="hover:bg-gray-50">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        Try Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            variant="outline" 
            className="border-gray-300 hover:border-gray-400 px-8 py-3"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            View All Featured Automations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAutomations;
