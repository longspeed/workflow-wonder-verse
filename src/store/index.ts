import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AppState {
  // Auth state
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  setAuth: (user: User | null, session: Session | null) => void;
  signOut: () => Promise<void>;

  // UI state
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Loading states
  loadingStates: Record<string, boolean>;
  setLoading: (key: string, isLoading: boolean) => void;
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  title?: string;
  timestamp: number;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      session: null,
      isAuthenticated: false,
      setAuth: (user, session) => set({
        user,
        session,
        isAuthenticated: !!user,
      }),
      signOut: async () => {
        await supabase.auth.signOut();
        set({
          user: null,
          session: null,
          isAuthenticated: false,
        });
      },

      // UI state
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Notifications
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [...state.notifications, notification],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearNotifications: () => set({ notifications: [] }),

      // Loading states
      loadingStates: {},
      setLoading: (key, isLoading) =>
        set((state) => ({
          loadingStates: {
            ...state.loadingStates,
            [key]: isLoading,
          },
        })),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
); 