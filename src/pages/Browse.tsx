
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Star, Eye, Download, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import AutomationDetailsModal from '@/components/browse/AutomationDetailsModal';

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
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);

  const { data: automations = [], isLoading, refetch } = useQuery({
    queryKey: ['automations', searchTerm, selectedCategory, priceFilter, ratingFilter],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          profiles!products_seller_id_fkey (
            full_name,
            avatar_url
          )
        `)
        .eq('status', 'published');

      // Apply search filter
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Apply category filter
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      // Apply price filter
      if (priceFilter === 'free') {
        query = query.eq('price', 0);
      } else if (priceFilter === 'under-50') {
        query = query.lt('price', 50);
      } else if (priceFilter === '50-100') {
        query = query.gte('price', 50).lte('price', 100);
      } else if (priceFilter === 'enterprise') {
        query = query.gt('price', 100);
      }

      // Apply rating filter
      if (ratingFilter === '4-plus') {
        query = query.gte('rating', 4);
      } else if (ratingFilter === '3-plus') {
        query = query.gte('rating', 3);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Automation[];
    },
  });

  const handlePurchase = async (automation: Automation) => {
    if (!user) {
      toast.error('Please log in to purchase automations');
      return;
    }

    if (automation.price === 0) {
      // Free automation - just add to user's library
      try {
        const { error } = await supabase
          .from('user_purchases')
          .insert({
            user_id: user.id,
            product_id: automation.id,
            purchase_price: 0,
            purchase_date: new Date().toISOString()
          });

        if (error) throw error;

        // Update download count
        await supabase
          .from('products')
          .update({ download_count: (automation.download_count || 0) + 1 })
          .eq('id', automation.id);

        toast.success('Free automation added to your library!');
        refetch();
      } catch (error) {
        console.error('Error adding free automation:', error);
        toast.error('Failed to add automation to library');
      }
    } else {
      // Paid automation - would implement Stripe checkout here
      toast.info('Paid checkout coming soon! This would redirect to Stripe.');
    }
  };

  const categories = ['all', 'Productivity', 'CRM', 'Marketing', 'Analytics', 'E-commerce', 'Social Media'];

  return (
    <div className="min-h-screen bg-white font-homepage">
      <Header />
      <main className="pt-12 pb-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Browse AI Automations</h1>
          <p className="text-lg text-gray-500 mb-6">Discover, compare, and deploy the best AI automations for your business needs.</p>
          <div className="flex justify-center">
            <Input 
              className="w-full max-w-lg rounded-full px-6 py-4 text-lg border-gray-200 shadow-sm focus:border-primary" 
              placeholder="Search automations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {/* Filter Sidebar */}
          <aside className="hidden lg:block w-64 pt-2">
            <div className="bg-gray-50 rounded-2xl shadow p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price</label>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="under-50">Under $50</SelectItem>
                    <SelectItem value="50-100">$50-$100</SelectItem>
                    <SelectItem value="enterprise">Enterprise ($100+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Rating</label>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="4-plus">4 stars & up</SelectItem>
                    <SelectItem value="3-plus">3 stars & up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>

          {/* Automations Grid */}
          <section className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="animate-pulse">
                    <div className="bg-gray-200 rounded-2xl h-80"></div>
                  </div>
                ))}
              </div>
            ) : automations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No automations found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {automations.map((automation) => (
                  <Card key={automation.id} className="rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 rounded-xl p-3">
                          <Zap className="w-7 h-7 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary mb-1 line-clamp-1">
                            {automation.title}
                          </h3>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {automation.category}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{automation.description}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-yellow-400" />
                          <span className="font-semibold text-gray-900 ml-1">
                            {automation.rating?.toFixed(1) || '0.0'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500 text-sm">
                          <span className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {automation.download_count || 0}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          {automation.price === 0 ? 'Free' : `$${automation.price}`}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedAutomation(automation)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handlePurchase(automation)}
                            disabled={!user}
                          >
                            {automation.price === 0 ? 'Get Free' : 'Buy Now'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      {/* Automation Details Modal */}
      {selectedAutomation && (
        <AutomationDetailsModal
          automation={selectedAutomation}
          isOpen={!!selectedAutomation}
          onClose={() => setSelectedAutomation(null)}
          onPurchase={handlePurchase}
        />
      )}
    </div>
  );
};

export default Browse;
