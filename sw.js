/* PANAQA — service worker de retiro.
   La web anterior instalaba un service worker con caché. Este archivo lo
   reemplaza: borra todas las cachés viejas, se desinstala y recarga las
   pestañas abiertas para que todos vean la versión nueva del sitio.
   La web nueva ya no registra ningún service worker. */
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (names) { return Promise.all(names.map(function (n) { return caches.delete(n); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: 'window' }); })
      .then(function (clients) { clients.forEach(function (c) { c.navigate(c.url); }); })
  );
});
