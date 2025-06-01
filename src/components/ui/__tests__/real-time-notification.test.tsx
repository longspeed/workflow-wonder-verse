import { render, screen, fireEvent, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RealTimeNotification } from '../real-time-notification';
import { supabase } from '@/integrations/supabase/client';
import { Notification } from '@/types/marketplace';

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

describe('RealTimeNotification', () => {
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

  it('should render notification bell with unread count', async () => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        user_id: 'user1',
        title: 'Test Notification',
        message: 'Test Message',
        type: 'info',
        read: false,
        created_at: '2024-03-20'
      }
    ];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      then: jest.fn().mockResolvedValue({ data: mockNotifications, error: null })
    });

    render(<RealTimeNotification />, { wrapper });

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should show notifications in popover', async () => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        user_id: 'user1',
        title: 'Test Notification',
        message: 'Test Message',
        type: 'info',
        read: false,
        created_at: '2024-03-20'
      }
    ];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      then: jest.fn().mockResolvedValue({ data: mockNotifications, error: null })
    });

    render(<RealTimeNotification />, { wrapper });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Test Notification')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('should mark notification as read', async () => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        user_id: 'user1',
        title: 'Test Notification',
        message: 'Test Message',
        type: 'info',
        read: false,
        created_at: '2024-03-20'
      }
    ];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      then: jest.fn().mockResolvedValue({ data: mockNotifications, error: null }),
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis()
    });

    render(<RealTimeNotification />, { wrapper });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const markAsReadButton = screen.getByText('Mark as read');
    fireEvent.click(markAsReadButton);

    expect(supabase.from).toHaveBeenCalledWith('notifications');
  });

  it('should mark all notifications as read', async () => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        user_id: 'user1',
        title: 'Test Notification',
        message: 'Test Message',
        type: 'info',
        read: false,
        created_at: '2024-03-20'
      }
    ];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      then: jest.fn().mockResolvedValue({ data: mockNotifications, error: null }),
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis()
    });

    render(<RealTimeNotification />, { wrapper });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const markAllAsReadButton = screen.getByText('Mark all as read');
    fireEvent.click(markAllAsReadButton);

    expect(supabase.from).toHaveBeenCalledWith('notifications');
  });

  it('should handle real-time notifications', async () => {
    const mockChannel = {
      on: jest.fn().mockReturnThis(),
      subscribe: jest.fn()
    };

    (supabase.channel as jest.Mock).mockReturnValue(mockChannel);

    render(<RealTimeNotification />, { wrapper });

    expect(supabase.channel).toHaveBeenCalledWith('notifications');
    expect(mockChannel.on).toHaveBeenCalled();
    expect(mockChannel.subscribe).toHaveBeenCalled();
  });

  it('should show loading state', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      then: jest.fn().mockResolvedValue({ data: [], error: null })
    });

    render(<RealTimeNotification />, { wrapper });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Loading notifications...')).toBeInTheDocument();
  });

  it('should show empty state', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      then: jest.fn().mockResolvedValue({ data: [], error: null })
    });

    render(<RealTimeNotification />, { wrapper });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('No notifications')).toBeInTheDocument();
  });
}); 