
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Star, Download, User, Heart, Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useAuth } from '@/hooks/useAuth';
import { automationService, productService } from '@/services/supabase';
import { useRealTimeManager } from '@/hooks/useRealTimeManager';
import { cn } from '@/lib/utils';

export default function AutomationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Fetch automation details
  const { data: automationResponse, isLoading } = useQuery({
    queryKey: ['automation', id],
    queryFn: () => automationService.getAutomationById(id!),
    enabled: !!id,
  });

  const automation = automationResponse?.data;

  // Real-time updates
  useRealTimeManager({
    channel: 'products',
    filter: `id=eq.${id}`,
    onUpdate: (payload) => {
      queryClient.setQueryData(['automation', id], { data: payload.new, error: null });
    },
  });

  // Purchase mutation
  const { mutate: purchaseAutomation, isPending: isPurchasing } = useMutation({
    mutationFn: () => productService.purchaseAutomation(id!, user!.id),
    onSuccess: () => {
      toast('Automation purchased successfully!');
      setShowPurchaseModal(false);
      navigate('/dashboard');
    },
    onError: (error) => {
      toast('Failed to purchase automation. Please try again.');
    },
  });

  // Toggle favorite
  const { mutate: toggleFavorite } = useMutation({
    mutationFn: () => productService.toggleFavorite(id!, user!.id),
    onSuccess: () => {
      setIsFavorite(!isFavorite);
      toast(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-96 bg-gray-200 rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!automation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Automation not found</h1>
          <Button onClick={() => navigate('/browse')}>Back to Browse</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <OptimizedImage
                src={automation.image_urls?.[0] || '/placeholder.png'}
                alt={automation.title}
                width={800}
                height={450}
                quality={90}
                className="object-cover w-full h-full"
                placeholder="blur"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {automation.image_urls?.slice(1, 5).map((url, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                  <OptimizedImage
                    src={url}
                    alt={`${automation.title} - Image ${index + 2}`}
                    width={200}
                    height={112}
                    quality={80}
                    className="object-cover w-full h-full"
                    placeholder="blur"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{automation.title}</h1>
              <div className="flex items-center gap-4">
                <Badge variant="default">{automation.category}</Badge>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1">{automation.rating?.toFixed(1) || '0.0'}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Download className="w-5 h-5" />
                  <span className="ml-1">{automation.download_count} downloads</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <OptimizedImage
                    src="/default-avatar.png"
                    alt="Seller"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Seller</p>
                  <p className="text-sm text-gray-500">Creator</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-yellow-900">
                    ${automation.price?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-sm text-gray-500">One-time purchase</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleFavorite()}
                  >
                    <Heart className={cn(
                      'w-5 h-5',
                      isFavorite ? 'fill-red-500 text-red-500' : ''
                    )} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: automation.title,
                          text: automation.description,
                          url: window.location.href,
                        });
                      }
                    }}
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full bg-yellow-600 hover:bg-yellow-700"
                size="lg"
                onClick={() => setShowPurchaseModal(true)}
                disabled={isPurchasing}
              >
                {isPurchasing ? 'Processing...' : 'Purchase Now'}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{automation.description}</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">What's Included</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Full automation workflow</li>
                <li>Step-by-step documentation</li>
                <li>30 days of support</li>
                <li>Free updates</li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mt-1">
                    <span className="text-yellow-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Easy to Use</h3>
                    <p className="text-sm text-gray-600">Simple setup and configuration</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
                <Button variant="outline">Write a Review</Button>
              </div>
              <p className="text-gray-500">No reviews yet.</p>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Support Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Documentation</h3>
                  <p className="text-gray-600">
                    Access our comprehensive documentation to help you get started
                    and troubleshoot common issues.
                  </p>
                  <Button variant="outline">View Documentation</Button>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Contact Support</h3>
                  <p className="text-gray-600">
                    Need help? Our support team is available to assist you with
                    any questions or issues.
                  </p>
                  <Button variant="outline">Contact Support</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Purchase Modal */}
      <AnimatePresence>
        {showPurchaseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h2 className="text-xl font-semibold mb-4">Confirm Purchase</h2>
              <p className="text-gray-600 mb-6">
                You are about to purchase "{automation.title}" for ${automation.price?.toFixed(2) || '0.00'}.
                This is a one-time payment.
              </p>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPurchaseModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => purchaseAutomation()}
                  disabled={isPurchasing}
                >
                  {isPurchasing ? 'Processing...' : 'Confirm Purchase'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
