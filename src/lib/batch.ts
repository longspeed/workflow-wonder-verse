interface BatchOptions<T, R> {
  maxSize?: number;
  maxDelay?: number;
  processFn: (items: T[]) => Promise<R[]>;
  onError?: (error: Error, items: T[]) => void;
}

export class BatchProcessor<T, R> {
  private queue: T[] = [];
  private timeout: NodeJS.Timeout | null = null;
  private processing = false;

  constructor(private options: BatchOptions<T, R>) {
    this.options.maxSize = options.maxSize || 100;
    this.options.maxDelay = options.maxDelay || 1000;
  }

  async add(item: T): Promise<R> {
    return new Promise((resolve, reject) => {
      this.queue.push(item);

      if (this.queue.length >= this.options.maxSize!) {
        this.process().then(resolve).catch(reject);
      } else if (!this.timeout) {
        this.timeout = setTimeout(() => {
          this.process().then(resolve).catch(reject);
        }, this.options.maxDelay);
      }
    });
  }

  private async process(): Promise<R> {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;
    const items = this.queue.splice(0, this.options.maxSize);
    
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    try {
      const results = await this.options.processFn(items);
      this.processing = false;
      return results[0];
    } catch (error) {
      this.processing = false;
      this.options.onError?.(error as Error, items);
      throw error;
    }
  }

  async flush(): Promise<R[]> {
    if (this.queue.length === 0) {
      return [];
    }

    const items = [...this.queue];
    this.queue = [];
    
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    return this.options.processFn(items);
  }
}

// Example usage:
// const batchProcessor = new BatchProcessor({
//   processFn: async (items) => {
//     // Process items in batch
//     return items.map(item => /* process item */);
//   },
//   onError: (error, items) => {
//     console.error('Batch processing failed:', error);
//   }
// }); 