/**
 * Service Worker for GOLFGATE Catalunya PWA
 * Strategy:
 *   - HTML (navigations): network-first (always fresh content)
 *   - Static assets (JS/CSS/images/fonts): stale-while-revalidate
 *   - Never cache /api/ or /admin
 *
 * Bump CACHE_VERSION when you want to force-invalidate the static cache.
 */
const CACHE_VERSION = 'v2';
const STATIC_CACHE = `golfgate-static-${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  // Activate immediately, replacing old SW
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== STATIC_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch (e) {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) return;

  // Never cache API calls or admin
  if (url.pathname.startsWith('/api/')) return;
  if (url.pathname.startsWith('/admin')) return;

  const accept = request.headers.get('accept') || '';
  const isHTML = request.mode === 'navigate' || accept.includes('text/html');

  // HTML: network-first with cache fallback (always fresh when online)
  if (isHTML) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          // Don't cache HTML to avoid stale meta/og tags
          return res;
        })
        .catch(() => caches.match(request).then((c) => c || caches.match('/')))
    );
    return;
  }

  // Static assets: stale-while-revalidate
  event.respondWith(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.match(request).then((cached) => {
        const networkFetch = fetch(request)
          .then((response) => {
            if (response && response.ok && response.type === 'basic') {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    )
  );
});
