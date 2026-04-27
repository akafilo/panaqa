const CACHE_NAME = 'panaqa-v16-2026-04-27';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles-estreno-15agosto.css',
  '/script-estreno-15agosto.js',
  '/letras.html',
  '/letras.js',
  '/script-letras-safe.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@300;400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalación del Service Worker
self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    Promise.all([
      // Limpiar cachés viejos
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
          })
        );
      }),
      // Tomar control de todos los clientes inmediatamente
      clients.claim()
    ]).then(function() {
      // Forzar recarga de todas las pestañas abiertas con contenido antiguo
      return clients.matchAll({ type: 'window' }).then(function(clientList) {
        clientList.forEach(function(client) {
          client.navigate(client.url);
        });
      });
    })
  );
});

// Interceptar peticiones de red
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);

  // Para archivos externos (fonts, CDN) usar cache-first
  if (!url.origin.includes(self.location.hostname)) {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        return cached || fetch(event.request).then(function(response) {
          if (response && response.status === 200 && response.type === 'basic') {
            var clone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
          }
          return response;
        });
      })
    );
    return;
  }

  // Para HTML, CSS, JS y otros archivos propios: network-first con navigation preload
  event.respondWith(
    Promise.resolve(event.preloadResponse).then(function(preloaded) {
      if (preloaded) return preloaded;
      return fetch(event.request).then(function(response) {
        if (response && response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
        }
        return response;
      }).catch(function() {
        return caches.match(event.request);
      });
    })
  );
});

// Manejar mensajes del cliente
self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
