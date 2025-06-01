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
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Type assertion with proper handling
      const typedData = (data || []).map(item => {
        const profilesData = item.profiles;
        return {
          ...item,
          profiles: profilesData && typeof profilesData === 'object' && profilesData !== null && 'full_name' in profilesData 
            ? (profilesData as { full_name: string; avatar_url: string })
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
        });

        // Update download count
        await supabase
          .from('products')
          .update({ download_count: (automation.download_count || 0) + 1 })
          .eq('id', automation.id);
      } else {
        // Paid automation - handle payment flow
        toast({
          title: "Coming Soon",
          description: "Payment processing will be available soon!",
        });
      }
    } catch (error) {
      console.error('Error handling purchase:', error);
      toast({
        title: "Error",
        description: "Failed to process your request",
        variant: "destructive",
      });
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterAutomations(value, selectedCategory, priceFilter, ratingFilter);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    filterAutomations(searchTerm, value, priceFilter, ratingFilter);
  };

  const handlePriceFilter = (value: string) => {
    setPriceFilter(value);
    filterAutomations(searchTerm, selectedCategory, value, ratingFilter);
  };

  const handleRatingFilter = (value: string) => {
    setRatingFilter(value);
    filterAutomations(searchTerm, selectedCategory, priceFilter, value);
  };

  const filterAutomations = (
    search: string,
    category: string,
    price: string,
    rating: string
  ) => {
    let filtered = [...automations];

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    // Apply price filter
    if (price !== 'all') {
      const maxPrice = parseFloat(price);
      filtered = filtered.filter(item => item.price <= maxPrice);
    }

    // Apply rating filter
    if (rating !== 'all') {
      const minRating = parseFloat(rating);
      filtered = filtered.filter(item => (item.rating || 0) >= minRating);
    }

    setFilteredAutomations(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yellow-900 mb-4">Browse Automations</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600" />
              <Input
                type="text"
                placeholder="Search automations..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-white border-yellow-200 focus:border-yellow-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[180px] bg-white border-yellow-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priceFilter} onValueChange={handlePriceFilter}>
              <SelectTrigger className="w-[180px] bg-white border-yellow-200">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="10">Under $10</SelectItem>
                <SelectItem value="25">Under $25</SelectItem>
                <SelectItem value="50">Under $50</SelectItem>
                <SelectItem value="100">Under $100</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ratingFilter} onValueChange={handleRatingFilter}>
              <SelectTrigger className="w-[180px] bg-white border-yellow-200">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAutomations.map((automation) => (
          <Card key={automation.id} className="bg-white border-yellow-200 hover:border-yellow-400 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-yellow-900">{automation.title}</CardTitle>
                <Badge variant={automation.price === 0 ? "secondary" : "default"}>
                  {automation.price === 0 ? 'Free' : `$${automation.price}`}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-yellow-700">
                <Star className="h-4 w-4 fill-yellow-400" />
                <span>{automation.rating?.toFixed(1) || 'No ratings'}</span>
                <span className="mx-2">•</span>
                <Download className="h-4 w-4" />
                <span>{automation.download_count || 0} downloads</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-800 line-clamp-2">{automation.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {automation.tags?.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-yellow-50">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedAutomation(automation);
                  setModalOpen(true);
                }}
              >
                View Details
              </Button>
              <Button
                onClick={() => handlePurchase(automation)}
                disabled={userPurchases.includes(automation.id)}
                className={userPurchases.includes(automation.id) ? 'bg-green-600' : 'bg-yellow-600 hover:bg-yellow-700'}
              >
                {userPurchases.includes(automation.id) ? 'Owned' : 'Get Automation'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAutomations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-yellow-700 text-lg">No automations found matching your criteria.</p>
        </div>
      )}

      <AutomationDetailsModal
        automation={selectedAutomation}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onPurchase={handlePurchase}
        isPurchased={selectedAutomation ? userPurchases.includes(selectedAutomation.id) : false}
      />
    </div>
  );
};

export default Browse;
