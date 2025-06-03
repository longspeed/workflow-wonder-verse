
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import type { DateRange } from '@/types/analytics';

type Product = Database['public']['Tables']['products']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

export const automationService = {
  async getAutomations() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  },

  async getAutomationById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async getAutomationsBySeller(sellerId: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  },

  async createAutomation(automation: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert(automation)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async updateAutomation(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async deleteAutomation(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  },

  async getFeaturedAutomations() {
    const { data, error } = await supabase
      .from('products')
      .select('*, profiles(*)')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  },

  async searchAutomations(query: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*, profiles(*)')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  },

  async getAutomationsByCategory(category: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*, profiles(*)')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  },

  subscribeToAutomations(callback: (payload: any) => void) {
    return supabase
      .channel('products-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, callback)
      .subscribe();
  }
};

export const productService = {
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  },

  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async createProduct(product: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async updateProduct(id: string, updates: Partial<Database['public']['Tables']['products']['Row']>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  },

  async purchaseAutomation(productId: string, userId: string) {
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (productError) throw productError;
    if (!product) throw new Error('Product not found');

    const { data, error } = await supabase
      .from('user_purchases')
      .insert({
        user_id: userId,
        product_id: productId,
        purchase_price: product.price
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async toggleFavorite(productId: string, userId: string) {
    // Mock implementation since favorites table doesn't exist yet
    return Promise.resolve({ productId, userId, isFavorite: true });
  }
};

export const profileService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  }
};

export const storageService = {
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    
    if (error) throw error;
    return data;
  },

  async getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  },

  async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) throw error;
  }
};

export const realtimeService = {
  subscribeToProducts(callback: (payload: any) => void) {
    return supabase
      .channel('products-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, callback)
      .subscribe();
  },

  subscribeToProfile(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`profile-${userId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` }, callback)
      .subscribe();
  },

  subscribeToAuth(callback: (payload: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Analytics Service (simplified for available tables)
export const analyticsService = {
  async getSellerAnalytics(sellerId: string, dateRange: DateRange, timeframe: string) {
    // Get revenue data from user_purchases
    const { data: revenueData, error: revenueError } = await supabase
      .from('user_purchases')
      .select('created_at, purchase_price')
      .gte('created_at', dateRange.from.toISOString())
      .lte('created_at', dateRange.to.toISOString())
      .order('created_at');

    if (revenueError) throw revenueError;

    // Get products data for the seller
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('id, title, status')
      .eq('seller_id', sellerId);

    if (productsError) throw productsError;

    // Calculate metrics with available data
    const totalRevenue = revenueData.reduce((sum, purchase) => sum + purchase.purchase_price, 0);
    const totalSales = revenueData.length;
    const averageRating = 0; // Not available without reviews table
    const activeProducts = productsData.filter(p => p.status === 'published').length;

    // Process data for charts
    const processedRevenueData = processRevenueData(revenueData, timeframe);
    const processedSalesData = processSalesData(productsData, revenueData);

    // Generate basic insights
    const insights = generateBasicInsights({
      totalRevenue,
      totalSales,
      activeProducts,
      totalProducts: productsData.length,
    });

    return {
      totalRevenue,
      revenueChange: 0, // Would need historical data
      totalSales,
      salesChange: 0, // Would need historical data
      averageRating: 0,
      totalReviews: 0,
      activeAutomations: activeProducts,
      totalAutomations: productsData.length,
      revenueData: processedRevenueData,
      salesData: processedSalesData,
      ratingData: [],
      automationData: [],
      insights,
    };
  },

  async exportAnalyticsReport(sellerId: string, dateRange: DateRange, format: 'csv' | 'pdf') {
    const analytics = await this.getSellerAnalytics(sellerId, dateRange, '30d');
    
    if (format === 'csv') {
      return generateCSVReport(analytics);
    } else {
      return generatePDFReport(analytics);
    }
  },
};

// Helper functions
function processRevenueData(data: any[], timeframe: string) {
  const grouped = data.reduce((acc, purchase) => {
    const date = new Date(purchase.created_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + purchase.purchase_price;
    return acc;
  }, {});

  return Object.entries(grouped).map(([date, revenue]) => ({
    date,
    revenue,
  }));
}

function processSalesData(products: any[], purchases: any[]) {
  const grouped = products.reduce((acc, product) => {
    const productPurchases = purchases.filter(p => p.product_id === product.id);
    acc[product.title] = productPurchases.length;
    return acc;
  }, {});

  return Object.entries(grouped).map(([automation, sales]) => ({
    automation,
    sales,
  }));
}

function generateBasicInsights(data: any) {
  const insights = [];

  if (data.totalRevenue > 1000) {
    insights.push({
      title: 'Good Revenue Performance',
      description: `You have generated $${data.totalRevenue.toFixed(2)} in revenue.`,
      type: 'positive',
      impact: 'high',
    });
  }

  if (data.activeProducts > 0) {
    insights.push({
      title: 'Active Products',
      description: `You have ${data.activeProducts} published products available for purchase.`,
      type: 'neutral',
      impact: 'medium',
    });
  }

  return insights;
}

function getTimeframeInDays(timeframe: string) {
  switch (timeframe) {
    case '7d': return 7;
    case '30d': return 30;
    case '90d': return 90;
    case '1y': return 365;
    default: return 30;
  }
}

function generateCSVReport(data: any) {
  // Implementation for CSV report generation
  return 'CSV data would be generated here';
}

function generatePDFReport(data: any) {
  // Implementation for PDF report generation
  return 'PDF data would be generated here';
}
