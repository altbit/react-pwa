// Hash: {hash}
var PERM_CACHE_NAME = 'react-pwa-perm';
var TEMP_CACHE_NAME = 'react-pwa-temp';
var permUrlTemplates = [
  '/js/',
  '/styles/'
];
var urlsToInstall = ['{files_to_cache}'];
var hostnameToCache = '{hostname}';
var hostnameExcludeFromCache = '{api_hostname}';

var clearCache = function(event, done) {
  var cacheWhitelist = [PERM_CACHE_NAME];

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
      caches.open(TEMP_CACHE_NAME)
        .then(function(cache) {
          return cache.addAll(['/']);
        }),
      caches.open(PERM_CACHE_NAME)
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

            var saveToPerm = false;
            permUrlTemplates.map(function(template) {
              if (event.request.url.indexOf(template) !== -1) {
                saveToPerm = true;
              }
            });

            caches.open(saveToPerm ? PERM_CACHE_NAME: TEMP_CACHE_NAME)
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