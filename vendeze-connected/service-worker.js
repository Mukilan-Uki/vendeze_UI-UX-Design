/* Vendeze service worker
   - App files (HTML/JS/CSS): network-first, so a new deploy shows up on the
     next load; falls back to cache when offline.
   - Images/icons: cache-first (they rarely change).
   - API calls and other origins are never cached — stale bookings or
     vendor data would be worse than no data. */
const CACHE_NAME = "vendeze-ui-v20";
const APP_SHELL = [
  "./", "./index.html", "./site-design.css?v=20", "./homepage-design.css?v=20", "./app-design.css?v=20", "./navigation.css?v=20", "./navigation.js?v=20", "./brand-loader.js?v=20", "./ui-design.js?v=20", "./homepage-design.js?v=20", "./script.js?v=20", "./api.js", "./manifest.json",
  "./assets/party.jpg", "./assets/dance.jpg", "./assets/birthday.jpg",
  "./assets/venue.jpg", "./assets/dining.jpg", "./assets/florals.jpg", "./assets/celebration.jpg",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/favicon-32.png",
  "./icons/logo-mark-white.png", "./icons/logo-word-white.png", "./icons/logo-full-white.png",
  "./icons/logo-mark-dark.png", "./icons/logo-word-dark.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;     // API + fonts: straight to network

  const isImage = /\.(png|jpe?g|svg|webp|ico)$/i.test(url.pathname);
  if (isImage) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then((c) => c.put(req, copy)); }
        return res;
      }))
    );
    return;
  }

  event.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then((cached) => cached || caches.match("./index.html")))
  );
});

/* Server-sent Web Push: payload { title, body, url, tag } */
self.addEventListener("push", (event) => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (_) { d = { title: "Vendeze", body: event.data && event.data.text() }; }
  event.waitUntil(self.registration.showNotification(d.title || "Vendeze", {
    body: d.body || "", icon: "icons/icon-192.png", badge: "icons/favicon-64.png",
    tag: d.tag, renotify: true, data: { url: d.url || "#/" },
  }));
});

/* Tapping a notification opens the app (or focuses it) on the right screen */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL("./index.html" + ((event.notification.data && event.notification.data.url) || "#/"), self.registration.scope).href;
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of all) {
      if (c.url.startsWith(self.registration.scope)) { await c.focus(); return c.navigate(target); }
    }
    return self.clients.openWindow(target);
  })());
});
