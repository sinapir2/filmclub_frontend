/* eslint-disable no-console */

// eslint-disable-next-line no-undef
workbox.setConfig({ debug: false })
// One manifest placeholder only
// eslint-disable-next-line no-undef
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || [], {});

// eslint-disable-next-line no-undef
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  // eslint-disable-next-line no-undef
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      // eslint-disable-next-line no-undef
      new workbox.expiration.Plugin({ maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 })
    ],
  })
);

self.addEventListener("message", (msg) => {
  if (msg.data && msg.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})
