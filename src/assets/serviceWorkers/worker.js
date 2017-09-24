// Hash: {hash}
var PERMANENT_STORAGE = 'react-pwa-perm';
var TEMP_STORAGE = 'react-pwa-temp';
var permanentUrlTemplates = [
  '/js/',
  '/fonts/',
  '/styles/'
];
var urlsToInstall = ['{files_to_cache}'];
var hostnameToCache = '{hostname}';
var hostnameExcludeFromCache = '{api_hostname}';

var clearCache = function(event, done) {
  var cacheWhitelist = [PERMANENT_STORAGE];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
        .then(function() {
          if (typeof done === 'function') {
            return done();
          }
        });
    })
  );
};

self.addEventListener('install', function(event) {
  clearCache(event, function(){
    return Promise.all([
      caches.open(TEMP_STORAGE)
        .then(function(cache) {
          return cache.addAll(['/']);
        }),
      caches.open(PERMANENT_STORAGE)
        .then(function(cache) {
          return cache.addAll(urlsToInstall);
        })
    ]);
  });
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET' ||
    event.request.url.indexOf(hostnameToCache) === -1 ||
    event.request.url.indexOf(hostnameExcludeFromCache) !== -1
  ) {
    return;
  }
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            var isPermanent = false;
            permanentUrlTemplates.map(function(template) {
              if (event.request.url.indexOf(template) !== -1) {
                isPermanent = true;
              }
            });

            caches.open(isPermanent ? PERMANENT_STORAGE: TEMP_STORAGE)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('new SW activated');
});