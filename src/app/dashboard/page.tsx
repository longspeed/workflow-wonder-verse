'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import type { Database } from '@/integrations/supabase/types';

type UserRole = 'buyer' | 'seller' | 'admin';
type Profile = Database['public']['Tables']['profiles']['Row'];
type UserPurchase = Database['public']['Tables']['user_purchases']['Row'];
type Product = Database['public']['Tables']['products']['Row'];

interface DashboardStats {
  totalSales: number;
  totalPurchases: number;
  totalFavorites: number;
  totalReviews: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('buyer');
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    totalPurchases: 0,
    totalFavorites: 0,
    totalReviews: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/auth');
          return;
        }

        // Fetch user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_seller')
          .eq('id', user.id)
          .single();

        if (profile) {
          setUserRole(profile.is_seller ? 'seller' : 'buyer');
        }

        // Fetch user stats based on role
        if (profile?.is_seller) {
          const { data: sales } = await supabase
            .from('user_purchases')
            .select('purchase_price')
            .eq('seller_id', user.id);

          setStats(prev => ({
            ...prev,
            totalSales: sales?.reduce((acc, curr) => acc + Number(curr.purchase_price), 0) || 0
          }));
        } else {
          const { data: purchases } = await supabase
            .from('user_purchases')
            .select('id')
            .eq('user_id', user.id);

          const { data: products } = await supabase
            .from('products')
            .select('id')
            .eq('seller_id', user.id);

          setStats({
            totalPurchases: purchases?.length || 0,
            totalFavorites: products?.length || 0,
            totalReviews: 0,
            totalSales: 0
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          onClick={() => router.push('/browse')}
          variant="outline"
        >
          Browse Automations
        </Button>
      </div>

      <Tabs defaultValue={userRole} className="space-y-6">
        <TabsList>
          <TabsTrigger value="buyer">Buyer Dashboard</TabsTrigger>
          <TabsTrigger value="seller">Seller Dashboard</TabsTrigger>
          {userRole === 'admin' && (
            <TabsTrigger value="admin">Admin Dashboard</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="buyer">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>My Purchases</CardTitle>
                <CardDescription>Total automations purchased</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.totalPurchases}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Favorites</CardTitle>
                <CardDescription>Saved automations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.totalFavorites}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Reviews</CardTitle>
                <CardDescription>Reviews submitted</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.totalReviews}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seller">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Sales</CardTitle>
                <CardDescription>Revenue from automations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">${stats.totalSales.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Automations</CardTitle>
                <CardDescription>Published automations</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => router.push('/create')}
                  className="w-full"
                >
                  Create New Automation
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {userRole === 'admin' && (
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Controls</CardTitle>
                <CardDescription>Manage marketplace settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    onClick={() => router.push('/admin/users')}
                    className="w-full"
                  >
                    Manage Users
                  </Button>
                  <Button
                    onClick={() => router.push('/admin/automations')}
                    className="w-full"
                  >
                    Manage Automations
                  </Button>
                  <Button
                    onClick={() => router.push('/admin/settings')}
                    className="w-full"
                  >
                    Marketplace Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
} 