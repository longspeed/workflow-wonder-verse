import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { RealtimeChannel } from '@supabase/supabase-js';

// Type definitions
type Product = Database['public']['Tables']['products']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

// Product Services
export const productService = {
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { data };
  },

  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProduct(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async createProductWithImage(
    product: Omit<Product, 'id' | 'created_at' | 'updated_at'>,
    imageFile: File
  ) {
    // Upload image first
    const imagePath = `products/${Date.now()}_${imageFile.name}`;
    await storageService.uploadFile('products', imagePath, imageFile);

    // Get public URL
    const imageUrl = await storageService.getPublicUrl('products', imagePath);

    // Create product with image URL
    const { data, error } = await supabase
      .from('products')
      .insert({
        ...product,
        image_urls: [imageUrl]
      })
      .select()
      .single();
    
    if (error) {
      // Clean up uploaded image if product creation fails
      await storageService.deleteFile('products', imagePath);
      throw error;
    }
    
    return data;
  },

  async updateProductImage(productId: string, imageFile: File) {
    // Get current product
    const { data: product } = await supabase
      .from('products')
      .select('image_urls')
      .eq('id', productId)
      .single();

    // Delete old image if exists
    if (product?.image_urls?.[0]) {
      const oldPath = product.image_urls[0].split('/').pop();
      if (oldPath) {
        await storageService.deleteFile('products', oldPath);
      }
    }

    // Upload new image
    const imagePath = `products/${Date.now()}_${imageFile.name}`;
    await storageService.uploadFile('products', imagePath, imageFile, { upsert: true });

    // Get public URL
    const imageUrl = await storageService.getPublicUrl('products', imagePath);

    // Update product with new image URL
    const { data, error } = await supabase
      .from('products')
      .update({ image_urls: [imageUrl] })
      .eq('id', productId)
      .select()
      .single();
    
    if (error) {
      // Clean up uploaded image if update fails
      await storageService.deleteFile('products', imagePath);
      throw error;
    }
    
    return data;
  }
};

// Profile Services
export const profileService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Auth Services
export const authService = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }
};

// File Storage Services
export const storageService = {
  async uploadFile(
    bucket: string,
    path: string,
    file: File,
    options?: { cacheControl?: string; upsert?: boolean }
  ) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, options);

    if (error) throw error;
    return data;
  },

  async getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) throw error;
  },

  async listFiles(bucket: string, path?: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path || '', {}, { signal: new AbortController().signal });

    if (error) throw error;
    return data;
  }
};

// Real-time Subscription Services
export const realtimeService = {
  subscribeToProducts(callback: (payload: any) => void): RealtimeChannel {
    return supabase
      .channel('products_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        callback
      )
      .subscribe();
  },

  subscribeToProfile(userId: string, callback: (payload: any) => void): RealtimeChannel {
    return supabase
      .channel(`profile_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${userId}`
        },
        callback
      )
      .subscribe();
  },

  subscribeToAuth(callback: (payload: any) => void): RealtimeChannel {
    return supabase
      .channel('auth_changes')
      .on('auth_state_change', callback)
      .subscribe();
  }
};
