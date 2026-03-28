const cacheName = 'creative-2026-v1';
const assets = [
  '/Pwa/',
  '/Pwa/index.html',
  '/Pwa/manifest.json'
];

// تثبيت الخدمة وحفظ الملفات الأساسية
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تشغيل التطبيق من الذاكرة عند انقطاع الإنترنت
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
