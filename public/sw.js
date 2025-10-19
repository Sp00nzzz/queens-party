// Simple service worker for caching static assets
const CACHE_NAME = 'queens-party-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/Assets/Map.png',
  '/Assets/Logo.png',
  '/Assets/BudlightBeerAd.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
