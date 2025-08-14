// Service Worker para forzar actualizaciones
self.addEventListener('fetch', function(event) {
  // Forzar descarga de archivos críticos
  if (event.request.url.includes('styles.css') || 
      event.request.url.includes('script.js') || 
      event.request.url.includes('index.html')) {
    
    event.respondWith(
      fetch(event.request, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
    );
  }
});

// Auto-actualizar cuando hay nueva versión
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'FORCE_UPDATE') {
    self.skipWaiting();
    self.clients.claim();
  }
});
