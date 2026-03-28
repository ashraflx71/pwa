const CACHE_NAME = 'pwa-ashraf-v1';

// استخدام المسارات النسبية لضمان العمل على GitHub Pages
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon.svg' // أضفت الأيقونة لتعمل بدون إنترنت أيضاً
];

// 1. مرحلة التثبيت: تخزين الملفات الأساسية
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('تم تخزين الملفات بنجاح - Green Tech Mode');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. مرحلة التفعيل: تنظيف الكاش القديم لتوفير المساحة والبطارية
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('تنظيف الملفات القديمة لتوفير المساحة...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. استراتيجية العمل بدون إنترنت (Offline First)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // إرجاع الملف من الكاش إذا وجد، وإلا جلبه من الشبكة
      return response || fetch(event.request).catch(() => {
        // يمكنك هنا إضافة صفحة offline.html اختيارياً
      });
    })
  );
});
