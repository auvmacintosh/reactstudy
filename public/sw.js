const cacheName = 'v1';

// const cacheAssets = [
//     'index.html',
//     'favicon.ico'
// ];

// Call Install Event
self.addEventListener('install', (e) => {
    console.debug('Service Worker: Installed');
    // e.waitUntil(
    //     caches
    //         .open(cacheName)
    //         .then(cache => {
    //             console.log('Service Worker: Caching Files');
    //             cache.addAll(cacheAssets);
    //         })
    //         .then(() => {
    //             self.skipWaiting()
    //         })
    // );
});

// Call Activate Event
self.addEventListener('activate', (e) => {
    console.debug('Service Worker: Acticated');
    // remove unwanated caches
    // e.waitUntil(
    //     caches.keys().then(cacheNames => {
    //         return Promise.all(
    //             cacheNames.map(cache => {
    //                 if (cache !== cacheName) {
    //                     console.debug('Service Worker: Clearing Old Caches');
    //                     // return caches.delete(cache);
    //                 }
    //             })
    //         )
    //     })
    // )
});

// 这段代码有问题, 离线的时候, 并不能使用cache
// Call Fetch Event
// self.addEventListener('fetch', e => {
//     console.log('Service Worker: Fetching');
//     e.respondWith(
//         fetch(e.request)
//             .then(res => {
//                 // Make clone of response
//                 const resClone = res.clone();
//                 // Open cache
//                 caches
//                     .open(cacheName)
//                     .then(cache => {
//                         // Add response to cache
//                         console.log('put cache: ' + e.request.url);
//                         cache.put(e.request, resClone);
//                     });
//                 return res;
//             })
//             .catch(err => {
//                 console.log('use cache: ' + e.request.url);
//                 caches.match(e.request).then(res => res);
//             })
//     )
//
//     // e.respondWith(
//     //     fetch(e.request).catch(() => {
//     //         caches.match(e.request)
//     //     })
//     // )
// });

// 这段代码是从MDN上Copy下来的, 可以工作
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(resp) {
            return resp || fetch(event.request).then(function(response) {
                return caches.open('v1').then(function(cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
