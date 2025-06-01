
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Download, ExternalLink, User, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

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

interface AutomationDetailsModalProps {
  automation: Automation;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (automation: Automation) => void;
}

const AutomationDetailsModal = ({ automation, isOpen, onClose, onPurchase }: AutomationDetailsModalProps) => {
  const { user } = useAuth();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{automation.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            {automation.image_urls && automation.image_urls.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Screenshots</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {automation.image_urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${automation.title} screenshot ${index + 1}`}
                      className="rounded-lg border shadow-sm w-full h-48 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{automation.description}</p>
            </div>

            {/* Tags */}
            {automation.tags && automation.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {automation.tags.map((tag, index) => (
                    <Badge key={index} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="space-y-3">
              {automation.demo_url && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(automation.demo_url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Demo
                </Button>
              )}
              {automation.documentation_url && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(automation.documentation_url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing & Purchase */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-primary mb-2">
                  {automation.price === 0 ? 'Free' : `$${automation.price}`}
                </div>
                {automation.currency && automation.price > 0 && (
                  <div className="text-sm text-gray-500">{automation.currency}</div>
                )}
              </div>
              
              <Button
                className="w-full mb-4"
                size="lg"
                onClick={() => onPurchase(automation)}
                disabled={!user}
              >
                {automation.price === 0 ? 'Get Free Automation' : 'Buy Now'}
              </Button>
              
              {!user && (
                <p className="text-sm text-gray-500 text-center">
                  Please log in to purchase
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Rating
                  </span>
                  <span className="font-medium">
                    {automation.rating?.toFixed(1) || '0.0'} / 5
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Download className="w-4 h-4" />
                    Downloads
                  </span>
                  <span className="font-medium">{automation.download_count || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Published
                  </span>
                  <span className="font-medium">
                    {new Date(automation.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            {automation.profiles && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Seller</h3>
                <div className="flex items-center gap-3">
                  {automation.profiles.avatar_url ? (
                    <img
                      src={automation.profiles.avatar_url}
                      alt={automation.profiles.full_name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{automation.profiles.full_name}</div>
                    <div className="text-sm text-gray-500">Automation Creator</div>
                  </div>
                </div>
              </div>
            )}

            {/* Category */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Category</h3>
              <Badge variant="default" className="text-sm">
                {automation.category}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutomationDetailsModal;
