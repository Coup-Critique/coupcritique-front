self.importScripts('sw-polyfill.js');

function fetchJson(filePath) {
	return fetch(filePath)
		.then(function (res) {
			return res.json();
		})
		.catch(function (err) {
			console.error(err);
			return err;
		});
}

var versionPromise = fetchJson('/meta.json');

// var cachableRoutes = ['/cgu', '/legal-notice', '/remerciements'];

self.addEventListener('install', function (evt) {
	evt.waitUntil(
		(async function () {
			await versionPromise.then(function (res) {
				return caches.open(res.version).then(function (cache) {
					return fetchJson('/build/manifest.json') /* .then(function (res) {
						cachableRoutes = cachableRoutes.concat(Object.values(res));
						return Promise.all(
							cachableRoutes.map(function (url) {
								return cache.add(url);
							})
						);
					}) */;
				});
			});

			self.skipWaiting();
		})()
	);
});

self.addEventListener('activate', function (evt) {
	console.log('[ServiceWorker] Activate');
	evt.waitUntil(
		(async function () {
			await versionPromise.then(function (res) {
				return caches.keys().then(function (cacheNames) {
					return Promise.all(
						cacheNames.map(function (cacheName) {
							if (cacheName !== res.version) {
								return caches.delete(cacheName);
							}
							return null;
						})
					);
				});
			});

			// if ('navigationPreload' in self.registration) {
			// 	await self.registration.navigationPreload.enable();
			// }
		})()
	);
	self.clients.claim();
});

// bugged
// self.addEventListener('fetch', function (evt) {
// 	evt.respondWith(
// 		caches.match(evt.request).then(function (response) {
// 			return response || fetch(evt.request);
// 		})
// 	);
// });
