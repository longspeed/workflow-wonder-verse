/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: (string | PrecacheEntry)[];
};

interface PrecacheEntry {
  url: string;
  revision?: string;
}

const CACHE_NAME = 'workflow-wonder-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync
self.addEventListener('sync', (event: ExtendableEvent & { tag: string }) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notification handler
self.addEventListener('push', (event: ExtendableEvent & { data?: PushMessageData }) => {
  const options = {
    body: event.data?.text() || 'New notification',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png'
  };

  event.waitUntil(
    self.registration.showNotification('Workflow Wonder', options)
  );
});

async function doBackgroundSync() {
  try {
    // Sync offline data when connection is restored
    console.log('Background sync triggered');
    
    // Add your sync logic here
    // For example, sync form submissions, upload queued files, etc.
    
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Notification click handler
self.addEventListener('notificationclick', (event: ExtendableEvent & { notification: Notification }) => {
  event.notification.close();
  
  event.waitUntil(
    self.clients.openWindow('/')
  );
});

export {};
