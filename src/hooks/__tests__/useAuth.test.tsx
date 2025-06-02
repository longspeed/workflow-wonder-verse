import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '../useAuth';
import { supabase } from '@/integrations/supabase/client';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';

// Mock the Supabase client
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      onAuthStateChange: jest.fn(),
      getSession: jest.fn(),
      signOut: jest.fn(),
    },
  },
}));

const mockOnAuthStateChange = supabase.auth.onAuthStateChange as jest.Mock;
const mockGetSession = supabase.auth.getSession as jest.Mock;
const mockSignOut = supabase.auth.signOut as jest.Mock;

describe('useAuth', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockOnAuthStateChange.mockClear();
    mockGetSession.mockClear();
    mockSignOut.mockClear();

    // Default mock implementation for onAuthStateChange
    mockOnAuthStateChange.mockImplementation((callback: (event: AuthChangeEvent, session: Session | null) => void) => {
      // Simulate no initial session
      callback('INITIAL', null);
      // Return a dummy subscription object
      return { data: { subscription: { unsubscribe: jest.fn() } } };
    });

    // Default mock implementation for getSession
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });

    // Default mock implementation for signOut
    mockSignOut.mockResolvedValue({ error: null });
  });

  test('should return initial loading state', async () => {
    let callback: (event: AuthChangeEvent, session: Session | null) => void = jest.fn();
    mockOnAuthStateChange.mockImplementation((cb) => { callback = cb; return { data: { subscription: { unsubscribe: jest.fn() } } }; });
    mockGetSession.mockResolvedValueOnce({ data: { session: null }, error: null });

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    // Initial state should have loading true and user/session null
    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
    expect(result.current.session).toBeNull();

    // Wait for the initial session check to complete
    await waitForNextUpdate();

    // After initial session check, loading should be false
    expect(result.current.loading).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.session).toBeNull();
  });

  test('should update state on login', async () => {
    let authStateChangeCallback: (event: AuthChangeEvent, session: Session | null) => void = jest.fn();
    mockOnAuthStateChange.mockImplementation((callback) => { authStateChangeCallback = callback; return { data: { subscription: { unsubscribe: jest.fn() } } }; });
    mockGetSession.mockResolvedValueOnce({ data: { session: null }, error: null }); // Initial session check

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate(); // Wait for initial session check

    const mockUser = { id: 'user-id', email: 'test@example.com' } as User;
    const mockSession = { user: mockUser, access_token: 'fake-token' } as Session;

    // Simulate login event
    await act(async () => {
      authStateChangeCallback('SIGNED_IN', mockSession);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.session).toEqual(mockSession);
  });

  test('should update state on logout', async () => {
    let authStateChangeCallback: (event: AuthChangeEvent, session: Session | null) => void = jest.fn();
    mockOnAuthStateChange.mockImplementation((callback) => { authStateChangeCallback = callback; return { data: { subscription: { unsubscribe: jest.fn() } } }; });

    const mockUser = { id: 'user-id', email: 'test@example.com' } as User;
    const mockSession = { user: mockUser, access_token: 'fake-token' } as Session;

    mockGetSession.mockResolvedValueOnce({ data: { session: mockSession }, error: null }); // Simulate initial logged-in session

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate(); // Wait for initial session check

    expect(result.current.user).toEqual(mockUser); // Ensure initially logged in

    // Simulate logout event
    await act(async () => {
      authStateChangeCallback('SIGNED_OUT', null);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.session).toBeNull();
  });

  test('should call supabase signOut when signOut is called', async () => {
    mockGetSession.mockResolvedValueOnce({ data: { session: null }, error: null }); // Initial session check

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate(); // Wait for initial session check

    await act(async () => {
      await result.current.signOut();
    });

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
}); 