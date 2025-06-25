const CACHE_NAME = 'alcalinidad-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/lucide/0.263.1/lucide.min.css',
  'https://unpkg.com/lucide@latest/dist/umd/lucide.js'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Eliminar caches antiguos
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia de caché: Cache First, luego Network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve la respuesta cacheada si existe
        if (response) {
          return response;
        }
        
        // Si no está en caché, hacemos la petición a la red
        return fetch(event.request)
          .then(response => {
            // Verificamos que la respuesta sea válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonamos la respuesta para poder usarla y guardarla en caché
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                // Guardamos la respuesta en caché
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // Si falla la red y es una solicitud de página, devolvemos la página offline
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            // Para otros recursos, simplemente fallamos
            return new Response('Sin conexión');
          });
      })
  );
});

// Evento para actualizar el caché cuando hay una nueva versión
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});