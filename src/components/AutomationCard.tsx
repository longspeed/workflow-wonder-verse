
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface Automation {
  id: string;
  name: string;
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
}

interface AutomationCardProps {
  automation: Automation;
}

export function AutomationCard({ automation }: AutomationCardProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handlePurchase = async () => {
    try {
      toast({
        title: 'Success',
        description: 'Automation purchased successfully!'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to purchase automation',
        variant: 'destructive'
      });
    }
  };

  const handleToggleFavorite = async () => {
    try {
      toast({
        title: 'Success',
        description: 'Favorite status updated'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update favorite status',
        variant: 'destructive'
      });
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{automation.name || automation.title}</CardTitle>
            <CardDescription className="mt-2">{automation.description}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleFavorite}
            className="text-gray-500 hover:text-red-500"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="default">{automation.category}</Badge>
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1">{automation.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Download className="w-4 h-4" />
              <span className="ml-1">{automation.download_count}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {automation.tags?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {automation.image_urls?.[0] && (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={automation.image_urls[0]}
                alt={automation.name || automation.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-4">
        <div className="text-2xl font-bold">
          ${automation.price.toFixed(2)}
          <span className="text-sm text-gray-500 ml-1">{automation.currency}</span>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/automations/${automation.id}`)}
          >
            View Details
          </Button>
          <Button onClick={handlePurchase}>
            Purchase
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 
