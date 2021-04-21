importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

workbox.precaching.precacheAndRoute([]);

self.addEventListener('install', event => {
  const urls = [
    'index.html',
    '/'
  ];
  const cacheName = workbox.core.cacheNames.runtime;
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(urls)));
});

workbox.routing.registerRoute(/(index|\/event\/|\/about\/|\/contact\/)(.*)html|(.*)\/$/, args => {
  return workbox.strategies.networkFirst().handle(args).then(response => {
    if (!response) {
      return caches.match('offline.html');
    }
    return response;
  });
});

workbox.routing.registerRoute(/\.(?:js|css|webp|png|gif|jpg|svg)$/,
  workbox.strategies.cacheFirst()
);