import { z } from 'zod';
import { authRateLimiter } from './rate-limiter';

// Password validation schema
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Session configuration
export const SESSION_CONFIG = {
  idleTimeout: 30 * 60 * 1000, // 30 minutes
  absoluteTimeout: 24 * 60 * 60 * 1000, // 24 hours
  refreshInterval: 5 * 60 * 1000, // 5 minutes
};

// Session management
export class SessionManager {
  private lastActivity: number;
  private refreshTimer: NodeJS.Timeout | null;

  constructor() {
    this.lastActivity = Date.now();
    this.refreshTimer = null;
    this.setupActivityListeners();
  }

  private setupActivityListeners() {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, () => this.updateLastActivity());
    });
  }

  private updateLastActivity() {
    this.lastActivity = Date.now();
  }

  public startSession() {
    this.updateLastActivity();
    this.startRefreshTimer();
  }

  private startRefreshTimer() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }

    this.refreshTimer = setInterval(() => {
      const now = Date.now();
      const idleTime = now - this.lastActivity;

      if (idleTime >= SESSION_CONFIG.idleTimeout) {
        this.handleSessionTimeout();
      } else if (idleTime >= SESSION_CONFIG.absoluteTimeout) {
        this.handleAbsoluteTimeout();
      }
    }, SESSION_CONFIG.refreshInterval);
  }

  private handleSessionTimeout() {
    // Implement your session timeout logic here
    // For example, show a warning dialog
    console.warn('Session timeout warning');
  }

  private handleAbsoluteTimeout() {
    // Implement your absolute timeout logic here
    // For example, force logout
    console.warn('Session expired');
  }

  public cleanup() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  }
}

// Password validation
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  try {
    passwordSchema.parse(password);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(err => err.message),
      };
    }
    return { isValid: false, errors: ['Invalid password format'] };
  }
};

// Rate-limited authentication check
export const checkAuthRateLimit = async (email: string): Promise<boolean> => {
  return authRateLimiter.check(email);
}; 