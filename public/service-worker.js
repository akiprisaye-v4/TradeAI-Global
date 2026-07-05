const CACHE_VERSION = 'tradeai-v7-ae720cb-pwa';
const STATIC_CACHE = `${CACHE_VERSION}-static`;

const ASSETS = [
  '/',
  '/manifest.json',
  '/images/logo.svg',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(ASSETS))
      .catch(() => undefined)
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => !key.startsWith(CACHE_VERSION))
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;
  if (request.headers.has('range')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => response)
        .catch(() => caches.match('/'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      return cached || fetch(request).then(response => {
        const isCacheable =
          response.ok &&
          response.status === 200 &&
          response.type === 'basic';

        if (isCacheable) {
          const copy = response.clone();

          event.waitUntil(
            caches.open(STATIC_CACHE)
              .then(cache => cache.put(request, copy))
          );
        }

        return response;
      });
    })
  );
});
