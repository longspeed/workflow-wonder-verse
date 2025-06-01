export type UserRole = 'buyer' | 'seller' | 'admin';
export type AutomationStatus = 'draft' | 'published' | 'archived';
export type PurchaseStatus = 'pending' | 'completed' | 'refunded';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Automation {
  id: string;
  seller_id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  currency: string;
  rating: number;
  download_count: number;
  tags: string[];
  image_urls: string[];
  demo_url: string | null;
  documentation_url: string | null;
  created_at: string;
  updated_at: string;
  featured: boolean;
  status: AutomationStatus;
  seller?: User;
}

export interface Purchase {
  id: string;
  buyer_id: string;
  automation_id: string;
  amount: number;
  currency: string;
  status: PurchaseStatus;
  created_at: string;
  updated_at: string;
  automation?: Automation;
}

export interface Favorite {
  id: string;
  user_id: string;
  automation_id: string;
  created_at: string;
  automation?: Automation;
}

export interface Review {
  id: string;
  user_id: string;
  automation_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

export interface AutomationFilters {
  category?: string;
  price?: string;
  rating?: string;
  tags?: string[];
  search?: string;
  sortBy?: 'popularity' | 'price' | 'rating' | 'latest';
  sortOrder?: 'asc' | 'desc';
} 