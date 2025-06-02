import { LRUCache } from 'lru-cache';

interface RateLimitOptions {
  maxAttempts: number;
  windowMs: number;
}

export class RateLimiter {
  private cache: LRUCache<string, number>;
  private options: RateLimitOptions;

  constructor(options: RateLimitOptions) {
    this.options = options;
    this.cache = new LRUCache({
      max: 500, // Maximum number of items to store
      ttl: options.windowMs, // Time to live for each entry
    });
  }

  async check(key: string): Promise<boolean> {
    const attempts = this.cache.get(key) || 0;
    
    if (attempts >= this.options.maxAttempts) {
      return false;
    }

    this.cache.set(key, attempts + 1);
    return true;
  }

  async reset(key: string): Promise<void> {
    this.cache.delete(key);
  }
}

// Create instances for different rate limiting needs
export const authRateLimiter = new RateLimiter({
  maxAttempts: 5, // 5 attempts
  windowMs: 15 * 60 * 1000, // 15 minutes
});

export const apiRateLimiter = new RateLimiter({
  maxAttempts: 100, // 100 requests
  windowMs: 60 * 1000, // 1 minute
}); 