
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Download, Eye, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface Automation {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  downloads: number;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

const mockAutomations: Automation[] = [
  {
    id: '1',
    title: 'Slack to Google Sheets Sync',
    description: 'Automatically sync Slack messages to Google Sheets for easy tracking and analysis.',
    price: 29,
    rating: 4.8,
    downloads: 1250,
    category: 'Productivity',
    tags: ['slack', 'google-sheets', 'sync'],
    image: '/placeholder.svg',
    featured: true,
  },
  {
    id: '2',
    title: 'Email Marketing Automation',
    description: 'Complete email marketing workflow with segmentation and analytics.',
    price: 0,
    rating: 4.6,
    downloads: 890,
    category: 'Marketing',
    tags: ['email', 'marketing', 'analytics'],
    image: '/placeholder.svg',
    featured: false,
  },
  {
    id: '3',
    title: 'CRM Lead Management',
    description: 'Automate lead scoring and follow-up processes in your CRM system.',
    price: 49,
    rating: 4.9,
    downloads: 650,
    category: 'CRM',
    tags: ['crm', 'leads', 'sales'],
    image: '/placeholder.svg',
    featured: true,
  },
  {
    id: '4',
    title: 'Social Media Scheduler',
    description: 'Schedule and post content across multiple social media platforms.',
    price: 19,
    rating: 4.5,
    downloads: 1100,
    category: 'Social Media',
    tags: ['social-media', 'scheduling', 'content'],
    image: '/placeholder.svg',
    featured: false,
  },
];

const categories = ['All', 'Productivity', 'Marketing', 'CRM', 'Social Media', 'E-commerce', 'Analytics'];

const AutomationMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAutomations = useMemo(() => {
    let filtered = mockAutomations.filter(automation => {
      const matchesSearch = automation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           automation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           automation.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || automation.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort automations
    switch (sortBy) {
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'downloads':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search automations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="downloads">Downloads</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              size="default"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
        
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="0-25">$0 - $25</SelectItem>
                    <SelectItem value="25-50">$25 - $50</SelectItem>
                    <SelectItem value="50+">$50+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4+">4+ stars</SelectItem>
                    <SelectItem value="3+">3+ stars</SelectItem>
                    <SelectItem value="2+">2+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Downloads</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000+">1000+</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                    <SelectItem value="100+">100+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Results */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {filteredAutomations.length} Automations Found
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredAutomations.length} of {mockAutomations.length} results
        </div>
      </div>

      {/* Automation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAutomations.map((automation, index) => (
          <motion.div
            key={automation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-800">
              <CardHeader className="relative p-0">
                {automation.featured && (
                  <Badge className="absolute top-3 left-3 z-10 bg-yellow-500 text-yellow-900">
                    Featured
                  </Badge>
                )}
                <div className="aspect-video bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-t-lg flex items-center justify-center">
                  <img
                    src={automation.image}
                    alt={automation.title}
                    className="w-16 h-16 object-contain opacity-60"
                  />
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <CardTitle className="text-lg font-semibold group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                    {automation.title}
                  </CardTitle>
                  <div className="text-right">
                    <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                      {automation.price === 0 ? 'Free' : `$${automation.price}`}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {automation.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {automation.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{automation.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{automation.downloads}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{automation.category}</Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Get Automation
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AutomationMarketplace;
