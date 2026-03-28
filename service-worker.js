const CACHE_NAME = 'pwa-ashraf-v1';
// أضف هنا الملفات التي تريد تشغيلها بدون إنترنت
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json'
];

// 1. مرحلة التثبيت (Installation): تخزين الملفات الأساسية
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('تم تخزين الملفات بنجاح - Green Tech Mode');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. مرحلة التفعيل (Activation): تنظيف الكاش القديم لتوفير المساحة
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('تنظيف الملفات القديمة...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. استراتيجية جلب البيانات (Fetch): العمل بدون إنترنت (Offline First)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // إرجاع الملف من الكاش إذا وجد، أو جلبه من الشبكة
      return response || fetch(event.request);
    })
  );
});
