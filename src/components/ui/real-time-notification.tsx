
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Bell, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
}

export function RealTimeNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Use products table to simulate notifications
    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, title, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;

        // Transform products to notification format for demo
        const mockNotifications: Notification[] = data?.map(product => ({
          id: product.id,
          title: 'New Product',
          message: `${product.title} was just added to the marketplace`,
          type: 'info' as const,
          read: false,
          created_at: product.created_at
        })) || [];

        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // Set up real-time subscription for products
    const subscription = supabase
      .channel('product_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'products'
        },
        (payload) => {
          const newNotification: Notification = {
            id: payload.new.id,
            title: 'New Product Added',
            message: `${payload.new.title} is now available in the marketplace`,
            type: 'success',
            read: false,
            created_at: payload.new.created_at
          };

          setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
          
          toast.success(newNotification.title, {
            description: newNotification.message,
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getIcon = (type: Notification['type']) => {
    const iconProps = { className: "w-4 h-4" };
    
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle {...iconProps} className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle {...iconProps} className="w-4 h-4 text-red-500" />;
      default:
        return <Info {...iconProps} className="w-4 h-4 text-blue-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-full mt-2 w-80 z-50 shadow-lg">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No notifications yet
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
