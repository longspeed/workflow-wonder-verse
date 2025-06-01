
import React, { useState, useEffect } from 'react';
import { productService } from '@/services/supabase';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AutomationDetailsModal from './browse/AutomationDetailsModal';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  currency: string | null;
  rating: number | null;
  download_count: number | null;
  category: string;
  tags: string[] | null;
  image_urls: string[] | null;
  demo_url: string | null;
  documentation_url: string | null;
  seller_id: string;
  status: string | null;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
  } | null;
}

const FeaturedAutomations = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAutomation, setSelectedAutomation] = useState<Product | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productService.getProducts();
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handlePurchase = (automation: Product) => {
    if (user) {
      alert(`Purchasing ${automation.title} for $${automation.price}`);
    } else {
      alert('Please log in to purchase');
    }
  };

  return (
    <div className="container py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Automations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.description?.slice(0, 100)}...</CardDescription>
            </CardHeader>
            <CardContent>
              {product.image_urls && product.image_urls.length > 0 && (
                <img
                  src={product.image_urls[0]}
                  alt={product.title}
                  className="rounded-md mb-4 w-full h-48 object-cover"
                />
              )}
              <div className="flex flex-wrap gap-2 mb-2">
                {product.tags?.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="default" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-2xl font-semibold">
                {product.price === 0 ? 'Free' : `$${product.price}`}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div>
                <Badge variant="default">{product.category}</Badge>
              </div>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full"
                onClick={() => setSelectedAutomation(product)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedAutomation && (
        <AutomationDetailsModal
          automation={selectedAutomation}
          isOpen={true}
          onClose={() => setSelectedAutomation(null)}
          onPurchase={handlePurchase}
        />
      )}
    </div>
  );
};

export default FeaturedAutomations;
