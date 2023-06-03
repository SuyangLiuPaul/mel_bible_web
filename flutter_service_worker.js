'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "4513de3c16fcaef643d5a5126f375e86",
"index.html": "6d9068baf903fccebc6dbc60bd6bb40e",
"/": "6d9068baf903fccebc6dbc60bd6bb40e",
"main.dart.js": "448e9d7143c2a2a8d9b244fc90249f04",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "bf55d97ade261525f4e9e19b616e161e",
"assets/AssetManifest.json": "48e4fbc8275769bd73835fd709b1453e",
"assets/NOTICES": "4d50ec940f4eb95071b2b6d8241e42fd",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "9c22282b495f7a8ad87320e734f5d926",
"assets/fonts/MaterialIcons-Regular.otf": "bf31e9283f2d739950854d6c8b70a052",
"assets/assets/MelBibleIcon/ios/Icon-29.png": "3a82cb2eee1d418d0853accce8789a09",
"assets/assets/MelBibleIcon/ios/Icon-16.png": "3ded179077de8ba59213927d3a3634a2",
"assets/assets/MelBibleIcon/ios/Icon-256.png": "089eb3a072e17ddf4e6ba37efd8b17c7",
"assets/assets/MelBibleIcon/ios/Icon-120.png": "7c5b0758a20be16686ce2527a951b60f",
"assets/assets/MelBibleIcon/ios/Icon-88.png": "306259b75044017ce7bc765470d29f66",
"assets/assets/MelBibleIcon/ios/Icon-144.png": "7b88b57fe23f0bf77c6818ba6fb299a7",
"assets/assets/MelBibleIcon/ios/Icon-76.png": "34b08bc8cf83523b57a0bf5fd63bee24",
"assets/assets/MelBibleIcon/ios/Icon-60.png": "806d8d2fe60eb3aba43dfd7b27fb6566",
"assets/assets/MelBibleIcon/ios/Icon-48.png": "ee1c1c157b6dec700da43e94801f5e9b",
"assets/assets/MelBibleIcon/ios/Icon-1024.png": "40e5232aed00c763d01a6537ebfdb68e",
"assets/assets/MelBibleIcon/ios/Icon-152.png": "0ed1e8c80f31958e033555b55cd8f253",
"assets/assets/MelBibleIcon/ios/Icon-180.png": "c186a072f3ce54be96eab3a129cd5c37",
"assets/assets/MelBibleIcon/ios/Icon-64.png": "99d07d77fec113099505edbbf9b7cf2d",
"assets/assets/MelBibleIcon/ios/Icon-58.png": "535c2a378477a6a1ec2302e13146cc9c",
"assets/assets/MelBibleIcon/ios/Icon-72.png": "c88cf1cbf90b014ac29ddf3212e8a3b5",
"assets/assets/MelBibleIcon/ios/Icon-196.png": "2cafb72cbd0dd5c19ea6d207b5e7b6ec",
"assets/assets/MelBibleIcon/ios/Icon-80.png": "0c3b6660ac6a411949fdb877dd4c1c8b",
"assets/assets/MelBibleIcon/ios/Icon-57.png": "7cb350d94b84606f31acd94a234ddc13",
"assets/assets/MelBibleIcon/ios/Icon-55.png": "876477fd2211bcdd9cdb6b400c584831",
"assets/assets/MelBibleIcon/ios/Icon-172.png": "cf2bea6656c553064429aadb3182cd9c",
"assets/assets/MelBibleIcon/ios/Icon-167.png": "46d772db965d004a15c6bc71aa87c2e3",
"assets/assets/MelBibleIcon/ios/Icon-40.png": "3ce5061f274b95d7b7cc2cfc4ca31fef",
"assets/assets/MelBibleIcon/ios/Icon-50.png": "f095dc351c1e3936bd456536df630dde",
"assets/assets/MelBibleIcon/ios/Icon-87.png": "8d3cecfb0f3a65442cd63b2f3a56667a",
"assets/assets/MelBibleIcon/ios/Icon-20.png": "f7fc067c1799d2eb0142acd2db5d6bbc",
"assets/assets/MelBibleIcon/ios/Icon-128.png": "9d927a25da63f1ef88d5b5cd723e372b",
"assets/assets/MelBibleIcon/ios/Icon-100.png": "19bdf591a5e9d3cf47a65717c4ddfe92",
"assets/assets/MelBibleIcon/ios/Icon-114.png": "a8ede52de05d9e071d3a5c36e51fb789",
"assets/assets/MelBibleIcon/ios/Icon-32.png": "8f532b5ca7e0d56c6943502f2c304c6e",
"assets/assets/MelBibleIcon/ios/Icon-512.png": "b225f7c2ede88f6954a9504b54dd59ea",
"assets/assets/MelBibleIcon/android/Icon-144.png": "7b88b57fe23f0bf77c6818ba6fb299a7",
"assets/assets/MelBibleIcon/android/Icon-192.png": "4355295e591d4c2be1b5c4f0f7f5cfa8",
"assets/assets/MelBibleIcon/android/Icon-48.png": "ee1c1c157b6dec700da43e94801f5e9b",
"assets/assets/MelBibleIcon/android/Icon-72.png": "c88cf1cbf90b014ac29ddf3212e8a3b5",
"assets/assets/MelBibleIcon/android/Icon-96.png": "ff0879ed6151683fe38a42fc75a941ff",
"assets/assets/MelBibleIcon/android/Icon-36.png": "4484cf5758e1e45c7452452eb058e306",
"assets/assets/MelBibleIcon/android/Icon-512.png": "b225f7c2ede88f6954a9504b54dd59ea",
"assets/assets/chinese_union_trad.json": "0a6f936f8b6b12dd2ace53143561ac12",
"assets/assets/bible_simplified.json": "f9c21e66a0489f5ed3e8667e70bbf644",
"assets/assets/web.json": "8bf7c3b0d05642a5949785cb0d1203bf",
"assets/assets/logo.jpg": "2346ff10e2aef33b31836257de22c872",
"assets/assets/mountain.jpg": "fe3404ec34f5311bf284a0dc92741707",
"assets/assets/chinese_union_simp.json": "91f6263c1bacc5432cd591d14c875002",
"assets/assets/bible_traditional.json": "00e09496f667b9211ab64654bd045626",
"assets/assets/loading_page.jpg": "52de399361bb0df993cb8962cd1a7a45",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
