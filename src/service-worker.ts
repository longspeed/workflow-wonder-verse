/// <reference lib="webworker" />

const CACHE_NAME = 'workflow-wonder-verse-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/assets/logo.png',
];

// Install event - cache static assets
self.addEventListener('install', (event: ExtendableMessageEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event: ExtendableMessageEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event: FetchEvent) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip non-HTTP(S) requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        return response;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache the response
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event: SyncEvent) => {
  if (event.tag === 'sync-automations') {
    event.waitUntil(syncAutomations());
  }
});

// Push notification handling
self.addEventListener('push', (event: PushEvent) => {
  const data = event.data?.json() ?? {};
  
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/assets/logo.png',
      badge: '/assets/badge.png',
      data: data.data,
    })
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close();

  if (event.notification.data?.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Helper function to sync automations
async function syncAutomations() {
  try {
    const db = await openDB();
    const pendingAutomations = await db.getAll('pendingAutomations');

    for (const automation of pendingAutomations) {
      try {
        // Attempt to sync the automation
        await syncAutomation(automation);
        
        // Remove from pending if successful
        await db.delete('pendingAutomations', automation.id);
      } catch (error) {
        console.error('Failed to sync automation:', error);
      }
    }
  } catch (error) {
    console.error('Failed to sync automations:', error);
  }
}

// Helper function to open IndexedDB
function openDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('workflow-wonder-verse', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('pendingAutomations', { keyPath: 'id' });
    };
  });
}

// Helper function to sync a single automation
async function syncAutomation(automation: any) {
  // Implement your sync logic here
  // This is just a placeholder
  return new Promise((resolve) => setTimeout(resolve, 1000));
} 