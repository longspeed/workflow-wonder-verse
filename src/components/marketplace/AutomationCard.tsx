
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Download, User } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useToast } from '@/hooks/use-toast';
import type { Automation } from '@/types/marketplace';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AutomationCardProps {
  automation: Automation;
  onPurchase?: (automation: Automation) => void;
}

export function AutomationCard({ automation, onPurchase }: AutomationCardProps) {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handlePurchaseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (onPurchase) {
      onPurchase(automation);
    }
  };

  const handleCardClick = () => {
    navigate(`/automations/${automation.id}`);
  };

  return (
    <Card
      className={cn(
        'transition-all duration-300 hover:shadow-lg cursor-pointer',
        isHovered ? 'scale-[1.02]' : 'scale-100'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
          <OptimizedImage
            src={automation.image_urls?.[0] || '/placeholder.png'}
            alt={automation.name}
            width={400}
            height={225}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg mb-2">{automation.name}</CardTitle>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{automation.description}</p>
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

        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            by Anonymous Seller
          </span>
          <Badge variant="secondary" className="text-xs">Verified</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-yellow-900">
            ${automation.price.toFixed(2)}
          </div>
          <div className="space-x-2">
            <Button
              onClick={handlePurchaseClick}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              Purchase
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
