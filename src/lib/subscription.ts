type SubscriptionCallback<T> = (data: T) => void;

interface Subscription<T> {
  id: string;
  callback: SubscriptionCallback<T>;
  channel: string;
}

class SubscriptionManager {
  private static instance: SubscriptionManager;
  private subscriptions: Map<string, Set<Subscription<any>>>;
  private lastData: Map<string, any>;

  private constructor() {
    this.subscriptions = new Map();
    this.lastData = new Map();
  }

  static getInstance(): SubscriptionManager {
    if (!SubscriptionManager.instance) {
      SubscriptionManager.instance = new SubscriptionManager();
    }
    return SubscriptionManager.instance;
  }

  subscribe<T>(channel: string, callback: SubscriptionCallback<T>): string {
    const id = Math.random().toString(36).substring(7);
    const subscription: Subscription<T> = { id, callback, channel };

    if (!this.subscriptions.has(channel)) {
      this.subscriptions.set(channel, new Set());
    }

    this.subscriptions.get(channel)!.add(subscription);

    // Send last known data if available
    const lastData = this.lastData.get(channel);
    if (lastData) {
      callback(lastData);
    }

    return id;
  }

  unsubscribe(channel: string, id: string): void {
    const subscriptions = this.subscriptions.get(channel);
    if (subscriptions) {
      for (const sub of subscriptions) {
        if (sub.id === id) {
          subscriptions.delete(sub);
          break;
        }
      }
    }
  }

  publish<T>(channel: string, data: T): void {
    this.lastData.set(channel, data);
    const subscriptions = this.subscriptions.get(channel);
    if (subscriptions) {
      subscriptions.forEach(sub => {
        try {
          sub.callback(data);
        } catch (error) {
          console.error(`Error in subscription callback for channel ${channel}:`, error);
        }
      });
    }
  }

  getSubscriberCount(channel: string): number {
    return this.subscriptions.get(channel)?.size || 0;
  }

  clearChannel(channel: string): void {
    this.subscriptions.delete(channel);
    this.lastData.delete(channel);
  }

  clearAll(): void {
    this.subscriptions.clear();
    this.lastData.clear();
  }
}

export const subscriptionManager = SubscriptionManager.getInstance(); 