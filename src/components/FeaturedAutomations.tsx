import React, { useState, useEffect } from 'react';
import { automationService } from '@/services/supabase';
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
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface AutomationWithProfile {
  id: string;
  name: string;
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
  updated_at?: string;
  featured?: boolean;
  profiles?: {
    full_name: string;
    avatar_url: string;
  } | null;
}

const FeaturedAutomations = () => {
  const [automations, setAutomations] = useState<AutomationWithProfile[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedAutomations = async () => {
      try {
        const { data, error } = await automationService.getFeaturedAutomations();
        
        if (error) {
          console.error('Error fetching featured automations:', error);
          return;
        }

        setAutomations(data as AutomationWithProfile[] || []);
      } catch (error) {
        console.error('Error fetching featured automations:', error);
      }
    };

    fetchFeaturedAutomations();
  }, []);

  const handlePurchase = (automation: AutomationWithProfile) => {
    if (user) {
      alert(`Purchasing ${automation.name} for $${automation.price}`);
    } else {
      alert('Please log in to purchase');
    }
  };

  const handleViewDetails = (automationId: string) => {
    navigate(`/automations/${automationId}`);
  };

  return (
    <div className="container py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Automations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {automations.map(automation => (
          <Card 
            key={automation.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleViewDetails(automation.id)}
          >
            <CardHeader>
              <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                 <img
                  src={automation.image_urls?.[0] || '/placeholder.png'}
                  alt={automation.name}
                  className="rounded-md mb-4 w-full h-48 object-cover"
                 />
              </div>
              <CardTitle>{automation.name}</CardTitle>
              <CardDescription>{automation.description?.slice(0, 100)}...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-2">
                {automation.tags?.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="default" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-2xl font-semibold">
                {automation.price === 0 ? 'Free' : `$${automation.price.toFixed(2)}`}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div>
                <Badge variant="default">{automation.category}</Badge>
              </div>
               <Button 
                variant="default" 
                size="sm" 
                className="w-full"
                onClick={(e) => {
                   e.stopPropagation();
                   handlePurchase(automation);
                }}
              >
                Purchase
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedAutomations;
