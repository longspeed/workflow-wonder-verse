import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Search, Filter, Download, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
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
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [filteredAutomations, setFilteredAutomations] = useState<Automation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userPurchases, setUserPurchases] = useState<string[]>([]);

  const { user } = useAuth();
  const { toast } = useToast();

  const categories = ['all', 'Web Scraping', 'Data Processing', 'Email Automation', 'Social Media', 'E-commerce', 'Marketing', 'Finance'];

  useEffect(() => {
    fetchAutomations();
    if (user) {
      fetchUserPurchases();
    }
  }, [user]);

  const fetchAutomations = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles!products_seller_id_fkey (
            full_name,
            avatar_url
          )
        `)
        .eq('status', 'published');

      if (error) throw error;

      // Type assertion with proper handling
      const typedData = (data || []).map(item => {
        return {
          ...item,
          profiles: item.profiles && typeof item.profiles === 'object' && 'full_name' in item.profiles 
            ? item.profiles as { full_name: string; avatar_url: string }
            : null
        };
      }) as Automation[];

      setAutomations(typedData);
      setFilteredAutomations(typedData);
    } catch (error) {
      console.error('Error fetching automations:', error);
      toast({
        title: "Error",
        description: "Failed to load automations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPurchases = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_purchases')
        .select('product_id')
        .eq('user_id', user.id);

      if (error) throw error;

      setUserPurchases(data?.map(p => p.product_id) || []);
    } catch (error) {
      console.error('Error fetching user purchases:', error);
    }
  };

  const handlePurchase = async (automation: Automation) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to purchase automations",
        variant: "destructive",
      });
      return;
    }

    if (userPurchases.includes(automation.id)) {
      toast({
        title: "Already Purchased",
        description: "You already own this automation",
        variant: "default",
      });
      return;
    }

    try {
      if (automation.price === 0) {
        // Free automation - add to user's library
        const { error } = await supabase
          .from('user_purchases')
          .insert({
            user_id: user.id,
            product_id: automation.id,
            purchase_price: 0
          });

        if (error) throw error;

        setUserPurchases([...userPurchases, automation.id]);
        toast({
          title: "Success",
          description: "Free automation added to your library!",
          variant: "default",
        });
      } else {
        // Paid automation - would integrate with Stripe here
        toast({
          title: "Purchase",
          description: "Stripe integration would handle this purchase",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error purchasing automation:', error);
      toast({
        title: "Error",
        description: "Failed to purchase automation",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    let filtered = automations;

    if (searchTerm) {
      filtered = filtered.filter(automation =>
        automation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        automation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        automation.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(automation => automation.category === selectedCategory);
    }

    if (priceFilter !== 'all') {
      if (priceFilter === 'free') {
        filtered = filtered.filter(automation => automation.price === 0);
      } else if (priceFilter === 'paid') {
        filtered = filtered.filter(automation => automation.price > 0);
      }
    }

    if (ratingFilter !== 'all') {
      const minRating = parseInt(ratingFilter);
      filtered = filtered.filter(automation => automation.rating >= minRating);
    }

    setFilteredAutomations(filtered);
  }, [searchTerm, selectedCategory, priceFilter, ratingFilter, automations]);

  const openModal = (automation: Automation) => {
    setSelectedAutomation(automation);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading automations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse AI Automations</h1>
            
            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search automations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="2">2+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredAutomations.length} automation{filteredAutomations.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAutomations.map((automation) => (
            <Card key={automation.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openModal(automation)}>
              {automation.image_urls && automation.image_urls.length > 0 && (
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img
                    src={automation.image_urls[0]}
                    alt={automation.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold line-clamp-2">{automation.title}</CardTitle>
                  {userPurchases.includes(automation.id) && (
                    <Badge variant="default" className="ml-2">Owned</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{automation.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium ml-1">{automation.rating?.toFixed(1) || '0.0'}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center">
                    <Download className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 ml-1">{automation.download_count || 0}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {automation.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {automation.tags.length > 2 && (
                    <Badge variant="default" className="text-xs">
                      +{automation.tags.length - 2} more
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-bold text-lg">
                      {automation.price === 0 ? 'Free' : `$${automation.price}`}
                    </span>
                  </div>
                  <Badge variant="default">
                    {automation.category}
                  </Badge>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredAutomations.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No automations found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedAutomation && (
        <AutomationDetailsModal
          automation={selectedAutomation}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onPurchase={handlePurchase}
        />
      )}
    </div>
  );
};

export default Browse;
