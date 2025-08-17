const CACHE_NAME = 'panaqa-estreno-17-agosto-2025-v8-ajustes';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles-estreno-15agosto.css',
  '/script-estreno-15agosto.js',
  '/letras.html',
  '/letras.js',
  '/script-letras-safe.js',
  '/manifest.json',
  '/assets/spotify.png',
  '/assets/apple.png',
  '/assets/youtube.png',
  '/assets/tidal.png',
  '/assets/dezzer.png',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@300;400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalación del Service Worker
self.addEventListener('install', function(event) {
  console.log('🔄 SW v6-test: Instalando nuevo Service Worker');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('✅ SW v6-test: Cache abierto -', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('🎯 SW v6-test: Todos los archivos cacheados correctamente');
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', function(event) {
  console.log('🚀 SW v6-test: Activando Service Worker');
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      console.log('🧹 SW v6-test: Limpiando caches anteriores...', cacheNames);
      return Promise.all(
        // Solo eliminar caches anteriores
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ SW v6-test: Eliminando cache anterior:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(function() {
      console.log('✅ SW v6-test: Service Worker activado y limpieza completada');
    })
  );
});

// Interceptar peticiones de red
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      }
    )
  );
});

// Manejar mensajes del cliente
self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
