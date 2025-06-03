
export interface AutomationFilters {
  category: string;
  price: string;
  rating: string;
  tags: string[];
  search: string;
  sortBy: string;
  sortOrder: string;
}

export interface Automation {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  featured: boolean;
  download_count: number;
  rating: number;
  tags: string[];
  image_urls: string[];
  demo_url: string;
  documentation_url: string;
  seller_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    id: string;
    full_name: string;
    avatar_url: string;
    username: string;
  };
}
