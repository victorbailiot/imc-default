const CACHE_NAME = "cache-imc-v1"

const urls = [
  '/',
  '/index.html',
  '/assets/css/bootstrap.min.css',
  '/assets/images/delete.svg',
  '/assets/js/functions.js',
  '/assets/images/icons/icon-512x512.png'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urls))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response){
        return response
      }
      return fetch(event.request);
    })
  )
})

