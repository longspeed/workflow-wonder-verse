import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMarketplace } from '../useMarketplace';
import { supabase } from '@/integrations/supabase/client';
import { Automation, Purchase, Favorite } from '@/types/marketplace';

// Mock Supabase client
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(),
    channel: jest.fn(() => ({
      on: jest.fn().mockReturnThis(),
      subscribe: jest.fn()
    })),
    removeChannel: jest.fn()
  }
}));

// Mock toast
jest.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

describe('useMarketplace', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    });
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should fetch automations with filters', async () => {
    const mockAutomations: Automation[] = [
      {
        id: '1',
        seller_id: 'seller1',
        name: 'Test Automation',
        description: 'Test Description',
        category: 'test',
        price: 10,
        currency: 'USD',
        rating: 4.5,
        download_count: 100,
        tags: ['test'],
        image_urls: ['test.jpg'],
        demo_url: 'test.com',
        documentation_url: 'docs.test.com',
        created_at: '2024-03-20',
        updated_at: '2024-03-20',
        featured: false,
        status: 'published'
      }
    ];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      lte: jest.fn().mockReturnThis(),
      gte: jest.fn().mockReturnThis(),
      contains: jest.fn().mockReturnThis(),
      or: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      then: jest.fn().mockResolvedValue({ data: mockAutomations, error: null })
    });

    const { result } = renderHook(() => useMarketplace(), { wrapper });

    await act(async () => {
      await result.current.setFilters({ category: 'test' });
    });

    expect(result.current.automations).toEqual(mockAutomations);
    expect(result.current.isLoadingAutomations).toBe(false);
  });

  it('should handle purchase automation', async () => {
    const mockPurchase: Purchase = {
      id: '1',
      buyer_id: 'buyer1',
      automation_id: '1',
      amount: 10,
      currency: 'USD',
      status: 'completed',
      created_at: '2024-03-20',
      updated_at: '2024-03-20'
    };

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockPurchase, error: null }),
      insert: jest.fn().mockReturnThis()
    });

    const { result } = renderHook(() => useMarketplace(), { wrapper });

    await act(async () => {
      await result.current.purchaseAutomation('1');
    });

    expect(supabase.from).toHaveBeenCalledWith('purchases');
  });

  it('should toggle favorite', async () => {
    const mockFavorite: Favorite = {
      id: '1',
      user_id: 'user1',
      automation_id: '1',
      created_at: '2024-03-20'
    };

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
      insert: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis()
    });

    const { result } = renderHook(() => useMarketplace(), { wrapper });

    await act(async () => {
      await result.current.toggleFavorite('1');
    });

    expect(supabase.from).toHaveBeenCalledWith('favorites');
  });

  it('should add review', async () => {
    const mockReview = {
      id: '1',
      user_id: 'user1',
      automation_id: '1',
      rating: 5,
      comment: 'Great automation!',
      created_at: '2024-03-20',
      updated_at: '2024-03-20'
    };

    (supabase.from as jest.Mock).mockReturnValue({
      upsert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockReview, error: null })
    });

    const { result } = renderHook(() => useMarketplace(), { wrapper });

    await act(async () => {
      await result.current.addReview({
        automationId: '1',
        rating: 5,
        comment: 'Great automation!'
      });
    });

    expect(supabase.from).toHaveBeenCalledWith('reviews');
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Test error');

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      then: jest.fn().mockRejectedValue(error)
    });

    const { result } = renderHook(() => useMarketplace(), { wrapper });

    await act(async () => {
      await result.current.setFilters({ category: 'test' });
    });

    expect(result.current.automations).toBeUndefined();
    expect(result.current.isLoadingAutomations).toBe(false);
  });
}); 