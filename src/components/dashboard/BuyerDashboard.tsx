import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award, Play, Calendar, TrendingUp, RefreshCw, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAccountData } from '@/hooks/useAccountData';
import { toast } from '@/components/ui/use-toast';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';
import { LoadingGrid, LoadingCard, LoadingSpinner } from '@/components/ui/advanced-loading';
import { AdvancedInteraction, ParallaxCard, MagneticButton } from '@/components/ui/advanced-interactions';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { AnimatedCard, CardHeader, CardContent } from '@/components/ui/animated-card';
import { Badge } from '@/components/ui/badge';
import { ProgressiveLoading, ProgressiveList } from '@/components/ui/progressive-loading';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const { profile, products, loading, error, refreshData } = useAccountData();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Memoize filtered products
  const { purchasedProducts, wishlistProducts } = useMemo(() => ({
    purchasedProducts: products.filter(p => p.status === 'purchased'),
    wishlistProducts: products.filter(p => p.status === 'wishlist')
  }), [products]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await refreshData();
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Auto-refresh failed:', error);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshData]);

  const handleRefresh = useCallback(async () => {
    try {
      await refreshData();
      setLastUpdate(new Date());
      toast({
        title: "Data refreshed",
        description: "Your dashboard data has been updated.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Failed to refresh dashboard data. Please try again.",
        variant: "destructive",
      });
    }
  }, [refreshData]);

  // Keyboard shortcuts
  useKeyboardShortcut('r', handleRefresh, { ctrl: true });
  useKeyboardShortcut('f5', handleRefresh);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <LoadingCard variant="shimmer" lines={2} className="h-16" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <LoadingGrid rows={3} cols={2} variant="shimmer" className="lg:col-span-2" />
          <LoadingGrid rows={2} cols={1} variant="shimmer" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Error loading dashboard data"
        error={error}
        onRetry={handleRefresh}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProgressiveLoading direction="down" className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-yellow-900 mb-2 animate-fadeIn">
              Welcome back, {profile?.full_name || user?.user_metadata?.full_name || 'User'}!
            </h1>
            <p className="text-yellow-700 animate-slideUp">
              Manage your automations and discover new ones.
              <span className="text-sm text-yellow-600 ml-2">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </span>
            </p>
          </div>
          <MagneticButton strength={0.3}>
            <Button
              variant="outline"
              onClick={handleRefresh}
              className="flex items-center gap-2 hover:bg-yellow-50"
              aria-label="Refresh dashboard data"
            >
              <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
              Refresh Data
            </Button>
          </MagneticButton>
        </div>
      </ProgressiveLoading>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Automations Library */}
        <ProgressiveLoading direction="right" className="lg:col-span-2">
          <ParallaxCard depth={15} className="h-full">
            <AnimatedCard>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-yellow-600 animate-float" aria-hidden="true" />
                    <h2 className="text-xl font-semibold text-yellow-900">My Automations Library</h2>
                  </div>
                  <Badge variant="info" size="sm" className="animate-pulse">
                    {purchasedProducts.length} automations
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ProgressiveList staggerDelay={150}>
                  {purchasedProducts.map((product) => (
                    <AdvancedInteraction
                      key={product.id}
                      hoverScale={1.02}
                      glow
                      tilt
                      className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-yellow-900">{product.title}</h3>
                          {product.rating && (
                            <div className="flex items-center text-yellow-600 animate-pulse">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-yellow-700">{product.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <MagneticButton strength={0.2}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-400"
                            aria-label={`Launch ${product.title}`}
                          >
                            <Play className="h-4 w-4 mr-1" aria-hidden="true" />
                            Launch
                          </Button>
                        </MagneticButton>
                        <MagneticButton strength={0.2}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-400"
                            aria-label={`View history for ${product.title}`}
                          >
                            <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
                            History
                          </Button>
                        </MagneticButton>
                      </div>
                    </AdvancedInteraction>
                  ))}
                  {purchasedProducts.length === 0 && (
                    <div className="text-center py-8 text-yellow-700 animate-fadeIn">
                      <p>You haven't purchased any automations yet.</p>
                      <AdvancedInteraction hoverScale={1.05} glow bounce>
                        <Button
                          variant="link"
                          className="text-yellow-600 hover:text-yellow-700 mt-2"
                          onClick={() => window.location.href = '/browse'}
                          aria-label="Browse available automations"
                        >
                          Browse Automations
                        </Button>
                      </AdvancedInteraction>
                    </div>
                  )}
                </ProgressiveList>
              </CardContent>
            </AnimatedCard>
          </ParallaxCard>
        </ProgressiveLoading>

        {/* Wishlist */}
        <ProgressiveLoading direction="left">
          <ParallaxCard depth={15} className="h-full">
            <AnimatedCard>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-yellow-600 animate-float" aria-hidden="true" />
                    <h2 className="text-xl font-semibold text-yellow-900">Wishlist</h2>
                  </div>
                  <Badge variant="warning" size="sm" className="animate-pulse">
                    {wishlistProducts.length} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ProgressiveList staggerDelay={150}>
                  {wishlistProducts.map((product) => (
                    <AdvancedInteraction
                      key={product.id}
                      hoverScale={1.02}
                      glow
                      tilt
                      className="p-4 bg-yellow-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-yellow-900">{product.title}</h3>
                        {product.rating && (
                          <div className="flex items-center text-yellow-600 animate-pulse">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-yellow-700 mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-yellow-900">${product.price}</span>
                        <MagneticButton strength={0.2}>
                          <Button 
                            size="sm" 
                            className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 transition-colors"
                            aria-label={`Purchase ${product.title} for $${product.price}`}
                          >
                            Purchase
                          </Button>
                        </MagneticButton>
                      </div>
                    </AdvancedInteraction>
                  ))}
                  {wishlistProducts.length === 0 && (
                    <div className="text-center py-8 text-yellow-700 animate-fadeIn">
                      <p>Your wishlist is empty.</p>
                      <AdvancedInteraction hoverScale={1.05} glow bounce>
                        <Button
                          variant="link"
                          className="text-yellow-600 hover:text-yellow-700 mt-2"
                          onClick={() => window.location.href = '/browse'}
                          aria-label="Browse available automations"
                        >
                          Browse Automations
                        </Button>
                      </AdvancedInteraction>
                    </div>
                  )}
                </ProgressiveList>
              </CardContent>
            </AnimatedCard>
          </ParallaxCard>
        </ProgressiveLoading>
      </div>
    </div>
  );
};

export default BuyerDashboard;
