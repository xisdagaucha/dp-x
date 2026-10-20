/* DP X: permite instalar como aplicativo. Sempre busca a versão nova; só usa a cópia guardada sem internet. */
const CACHE = 'dpx-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(fetch(req).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)).catch(() => {}); return res; }).catch(() => caches.match(req)));
});
