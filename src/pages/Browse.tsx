import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Download, User, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Automation {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  download_count: number;
  category: string;
  tags: string[];
  image_urls: string[];
  demo_url: string;
  documentation_url: string;
  seller_id: string;
  status: string;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
  } | null;
}

const Browse = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch automations from products table
  const { data: automations, isLoading: isLoadingAutomations } = useQuery({
    queryKey: ['automations', searchTerm, selectedCategory, sortBy],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('status', 'published');

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      if (sortBy === 'price_low') {
        query = query.order('price', { ascending: true });
      } else if (sortBy === 'price_high') {
        query = query.order('price', { ascending: false });
      } else if (sortBy === 'rating') {
        query = query.order('rating', { ascending: false });
      } else if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else {
        // featured
        query = query.order('featured', { ascending: false }).order('rating', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Automation[];
    }
  });

  // Fetch seller profiles
  const { data: profilesData } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      if (error) throw error;
      return data;
    }
  });

  const getSellerProfile = (sellerId: string) => {
    return profilesData?.find(profile => profile.id === sellerId) || null;
  };

  const handlePurchase = async (automation: Automation) => {
    try {
      // Add purchase logic here
      toast({
        title: 'Purchase Successful',
        description: `You have successfully purchased ${automation.title}!`
      });
    } catch (error) {
      toast({
        title: 'Purchase Failed',
        description: 'There was an error processing your purchase.',
        variant: 'destructive'
      });
    }
  };

  const filteredCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'data', label: 'Data Processing' },
    { value: 'social', label: 'Social Media' },
    { value: 'ecommerce', label: 'E-commerce' },
  ];

  if (isLoadingAutomations) {
    return (
      <div className="min-h-screen bg-yellow-50 font-homepage">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600"></div>
            <p className="mt-4 text-yellow-800">Loading automations...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 font-homepage">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yellow-900 mb-6">Browse Automations</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search automations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-yellow-300 focus:border-yellow-500"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-white border-yellow-300">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48 bg-white border-yellow-300">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automations?.map((automation) => {
            const sellerProfile = getSellerProfile(automation.seller_id);
            return (
              <Card key={automation.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg mb-2">{automation.title}</CardTitle>
                      <p className="text-sm text-gray-600 mb-3">{automation.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="default">{automation.category}</Badge>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm">{automation.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Download className="w-4 h-4" />
                      <span className="ml-1 text-sm">{automation.download_count}</span>
                    </div>
                  </div>

                  {sellerProfile && (
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        by {sellerProfile.full_name || sellerProfile.username || 'Anonymous'}
                      </span>
                      {sellerProfile.seller_verified && (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      )}
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-yellow-900">
                      ${automation.price.toFixed(2)}
                    </div>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedAutomation(automation);
                          setIsModalOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={() => handlePurchase(automation)}
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        Purchase
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {automations?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No automations found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Browse;
