// This is the service worker file

// Set the cache name
const CACHE_NAME = "my-extension-cache-v1";

// Set the files to cache
const FILES_TO_CACHE = [
  "/index.html",
  "/scripts/app.js",
  "/styles/main.css",
  "/images/logo.png"
];

// Override the shortcut keys for opening the developer tools
function preventDevTools() {
  window.addEventListener("keydown", function(e) {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.keyCode == 73) {
      e.preventDefault();
    }
  });
}

// Install the service worker and cache the files
self.addEventListener("install", function(evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// Activate the service worker and remove old cache data
self.addEventListener("activate", function(evt) {
  evt.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Serve cached content when offline and prevent the developer tools from opening
self.addEventListener("fetch", function(evt) {
  if (evt.request.mode !== "navigate") {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    fetch(evt.request).catch(function() {
      return caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("/offline.html");
      });
    })
  );
});

self.addEventListener("message", function(event) {
  if (event.data.command === "preventDevTools") {
    preventDevTools();
  }
});


// In the background script

// Register the service worker
navigator.serviceWorker.register("service-worker.js")
  .then(function(registration) {
    // Send a message to the service worker to call the preventDevTools function
    registration.active.postMessage({ command: "preventDevTools" });
  });
// In the background script

// Register the service worker
navigator.serviceWorker.register("service-worker.js")
  .then(function(registration) {
    // Send a message to the service worker to call the preventDevTools function
    registration.active.postMessage({ command: "preventDevTools" });
  });
