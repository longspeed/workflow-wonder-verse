export interface Automation {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating?: number;
  download_count?: number;
  currency: string;
  tags: string[];
  image_urls: string[];
  demo_url: string;
  documentation_url: string;
  created_at: string;
  updated_at: string;
  featured: boolean;
  status: string;
  seller_id: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
  };
}

export interface AutomationFilters {
  category: string;
  price: string;
  rating: string;
}

export interface AutomationCardProps {
  automation: Automation;
  isConnected: boolean;
}

export interface AutomationWithProfiles extends Automation {
  profiles: {
    full_name: string;
    avatar_url: string;
  } | null;
} 