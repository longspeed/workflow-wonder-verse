import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Automation = Database['public']['Tables']['automations']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

export const automationService = {
  async getAutomations() {
    const { data, error } = await supabase
      .from('automations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  },

  async getAutomationById(id: string) {
    const { data, error } = await supabase
      .from('automations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async getAutomationsBySeller(sellerId: string) {
    const { data, error } = await supabase
      .from('automations')
      .select('*')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  },

  async createAutomation(automation: Omit<Automation, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('automations')
      .insert(automation)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async updateAutomation(id: string, updates: Partial<Automation>) {
    const { data, error } = await supabase
      .from('automations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async deleteAutomation(id: string) {
    const { error } = await supabase
      .from('automations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  },

  async getFeaturedAutomations() {
    const { data, error } = await supabase
      .from('automations')
      .select('*, profiles(*)')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  },

  async searchAutomations(query: string) {
    const { data, error } = await supabase
      .from('automations')
      .select('*, profiles(*)')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  },

  async getAutomationsByCategory(category: string) {
    const { data, error } = await supabase
      .from('automations')
      .select('*, profiles(*)')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  },

  subscribeToAutomations(callback: (payload: any) => void) {
    return supabase
      .channel('automations-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'automations' }, callback)
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

// Analytics Service
export const analyticsService = {
  async getSellerAnalytics(sellerId: string, dateRange: DateRange, timeframe: string) {
    const { data: revenueData, error: revenueError } = await supabase
      .from('purchases')
      .select('created_at, price')
      .eq('seller_id', sellerId)
      .gte('created_at', dateRange.from.toISOString())
      .lte('created_at', dateRange.to.toISOString())
      .order('created_at');

    if (revenueError) throw revenueError;

    const { data: salesData, error: salesError } = await supabase
      .from('purchases')
      .select('automation_id, automations(name)')
      .eq('seller_id', sellerId)
      .gte('created_at', dateRange.from.toISOString())
      .lte('created_at', dateRange.to.toISOString());

    if (salesError) throw salesError;

    const { data: ratingData, error: ratingError } = await supabase
      .from('reviews')
      .select('rating')
      .eq('seller_id', sellerId)
      .gte('created_at', dateRange.from.toISOString())
      .lte('created_at', dateRange.to.toISOString());

    if (ratingError) throw ratingError;

    const { data: automationData, error: automationError } = await supabase
      .from('automations')
      .select('id, name, status')
      .eq('seller_id', sellerId);

    if (automationError) throw automationError;

    // Calculate metrics
    const totalRevenue = revenueData.reduce((sum, purchase) => sum + purchase.price, 0);
    const totalSales = salesData.length;
    const averageRating = ratingData.reduce((sum, review) => sum + review.rating, 0) / ratingData.length || 0;
    const activeAutomations = automationData.filter(a => a.status === 'active').length;

    // Process data for charts
    const processedRevenueData = processRevenueData(revenueData, timeframe);
    const processedSalesData = processSalesData(salesData);
    const processedRatingData = processRatingData(ratingData);
    const processedAutomationData = processAutomationData(automationData, salesData);

    // Generate insights
    const insights = generateInsights({
      totalRevenue,
      totalSales,
      averageRating,
      activeAutomations,
      revenueData: processedRevenueData,
      salesData: processedSalesData,
      ratingData: processedRatingData,
      automationData: processedAutomationData,
    });

    return {
      totalRevenue,
      revenueChange: calculateChange(revenueData, timeframe),
      totalSales,
      salesChange: calculateChange(salesData, timeframe),
      averageRating,
      totalReviews: ratingData.length,
      activeAutomations,
      totalAutomations: automationData.length,
      revenueData: processedRevenueData,
      salesData: processedSalesData,
      ratingData: processedRatingData,
      automationData: processedAutomationData,
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
  // Group by date and calculate daily revenue
  const grouped = data.reduce((acc, purchase) => {
    const date = new Date(purchase.created_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + purchase.price;
    return acc;
  }, {});

  return Object.entries(grouped).map(([date, revenue]) => ({
    date,
    revenue,
  }));
}

function processSalesData(data: any[]) {
  // Group by automation and count sales
  const grouped = data.reduce((acc, purchase) => {
    const name = purchase.automations.name;
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped).map(([automation, sales]) => ({
    automation,
    sales,
  }));
}

function processRatingData(data: any[]) {
  // Count ratings by value
  const grouped = data.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped).map(([rating, value]) => ({
    rating: Number(rating),
    value,
  }));
}

function processAutomationData(automations: any[], sales: any[]) {
  return automations.map(automation => {
    const automationSales = sales.filter(s => s.automation_id === automation.id);
    const revenue = automationSales.reduce((sum, sale) => sum + sale.price, 0);
    return {
      name: automation.name,
      revenue,
      sales: automationSales.length,
    };
  });
}

function calculateChange(data: any[], timeframe: string) {
  // Calculate percentage change from previous period
  const currentPeriod = data.filter(item => {
    const date = new Date(item.created_at);
    return date >= new Date(Date.now() - getTimeframeInDays(timeframe) * 24 * 60 * 60 * 1000);
  });

  const previousPeriod = data.filter(item => {
    const date = new Date(item.created_at);
    return date >= new Date(Date.now() - getTimeframeInDays(timeframe) * 2 * 24 * 60 * 60 * 1000) &&
           date < new Date(Date.now() - getTimeframeInDays(timeframe) * 24 * 60 * 60 * 1000);
  });

  const currentValue = currentPeriod.length;
  const previousValue = previousPeriod.length;

  if (previousValue === 0) return 100;
  return ((currentValue - previousValue) / previousValue) * 100;
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

function generateInsights(data: any) {
  const insights = [];

  // Revenue insight
  if (data.revenueChange > 20) {
    insights.push({
      title: 'Strong Revenue Growth',
      description: `Revenue has increased by ${data.revenueChange.toFixed(1)}% compared to the previous period.`,
      type: 'positive',
      impact: 'high',
    });
  } else if (data.revenueChange < -10) {
    insights.push({
      title: 'Revenue Decline',
      description: `Revenue has decreased by ${Math.abs(data.revenueChange).toFixed(1)}% compared to the previous period.`,
      type: 'negative',
      impact: 'high',
    });
  }

  // Rating insight
  if (data.averageRating >= 4.5) {
    insights.push({
      title: 'Excellent Customer Satisfaction',
      description: `Your automations have an average rating of ${data.averageRating.toFixed(1)}/5.`,
      type: 'positive',
      impact: 'medium',
    });
  }

  // Sales distribution insight
  const topAutomation = data.salesData.reduce((a, b) => a.sales > b.sales ? a : b);
  insights.push({
    title: 'Top Performing Automation',
    description: `${topAutomation.automation} is your best-selling automation with ${topAutomation.sales} sales.`,
    type: 'neutral',
    impact: 'medium',
  });

  return insights;
}

function generateCSVReport(data: any) {
  // Implementation for CSV report generation
  // This would create a downloadable CSV file with the analytics data
}

function generatePDFReport(data: any) {
  // Implementation for PDF report generation
  // This would create a downloadable PDF file with the analytics data
}
