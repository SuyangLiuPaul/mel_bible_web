'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "4513de3c16fcaef643d5a5126f375e86",
"index.html": "6a567f97c5b65ff2a6b8fe186641cfd5",
"/": "6a567f97c5b65ff2a6b8fe186641cfd5",
"main.dart.js": "448e9d7143c2a2a8d9b244fc90249f04",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "bf55d97ade261525f4e9e19b616e161e",
".git/config": "060a74f458f8f620ca3ba3896b4717d0",
".git/objects/3e/692d5d082b5154a16ef8921f83b4d66b566de7": "dab3fc40fd674ef324ea5224488de94a",
".git/objects/03/c531a7a4eadfbb97e5434401927ee31890cf33": "fe6b24f60048b7f218835d95c2c650ae",
".git/objects/32/89e6c18836b30129c5cdcddcef7236852d5007": "1fb13ab5fb06d78643f96f17aba9ff5a",
".git/objects/35/91af41948adc8001f3586d76b91181311953fc": "c91d33b29071dcff3b2b3385383761cb",
".git/objects/3c/332269966c8db028b72dafa32b5482d33c5bd6": "82bb5e6674d6e027cbf95487a787ca3b",
".git/objects/3c/6ba6097d269a7c2163e85b15f66fbcf3d1a687": "0228cb1ce517605674a9ea13e052f13c",
".git/objects/51/34e6402246228fb7f58ce8fe76727a61d99a62": "6b5e5b48febe40daec7062aecdc3b39f",
".git/objects/3d/fbd7617079c4a9c62f75fba31ae6bc42e37297": "2b0c0c9a4479732d13384be286125181",
".git/objects/0b/85bcdb86bf9e9f9fda81b13cec9c9349d47d77": "77cbf4b6cc88e2471afd14a98ef2e0ed",
".git/objects/5f/0d436a68bd16ca3428537420b31fbe70904c89": "764f30e2984fee2f60c339d9e1b26579",
".git/objects/b2/2fdb2d1fa6a3bced274617d58f6ab432bb0d8b": "1b405e4dfab487f51d41422d52600614",
".git/objects/b2/eb5bdef67451b0d4b4670983ebd86241402e3a": "f805d19187386c2df580fd08f7b926e6",
".git/objects/bb/ac29f5ef7a40bf14c0901bc1457724156bc0de": "1393f20f0610cabefe2d4f45865b0f54",
".git/objects/d7/179b483fb9e85f1338aa7d3be4f4e7ecd861fa": "dfd837f19b7c8a4fb3f0f84cb08bf31f",
".git/objects/b3/812a8e8dd0cf10deb8ef19adac1964e516978c": "abe07fe8c443dc3ac0605710904269f7",
".git/objects/d6/babe3124a38c02dda822f577162c96150e4aea": "91a31d16e9513e1b96f33207bffec611",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/bc/86bdd9aeccc7f42a0468cc9a2bb4225573b55b": "f96f701d40a7dcf464a4d8eb835ec325",
".git/objects/ae/37803d1933c3979fd1b939ff61cc667b0b70dc": "f5c08c98e82ebd9034dbd78b64a292fa",
".git/objects/e5/1a3604423902b33b799d4deac787753e2f58b9": "3cc3bd44583a24ead6eccf32e868c37b",
".git/objects/e2/f55b54540bf6df91b0908540f54d8603db64e7": "1114fe4bdfd9465801355089f90a9a8b",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/eb/4d91d4d64c70656cfcfd52d8ad42823b31ba2d": "809c4bb445c72a0792b5200f7005a208",
".git/objects/ed/08dd15c693467f6a8e6559fa6e061dcc6a35c2": "36bec9bbf7708d4a41d287d5a200447f",
".git/objects/74/8a09b672c7bd33258c13e1aa6152aa9bc797b3": "873519f37dd243c9de6098d8403d1d0b",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/10/549dae72fd9421c6db4171ff80f74b36600a9b": "fca4bca820bbcc3d46a51b18a8406251",
".git/objects/19/6817c3c68a9336564d35a440ec24e543a4fbc6": "49d4b11883f9531cb0c8253f7e4f0ba1",
".git/objects/19/c34a85144a9c737d87fa1ae0240c4b9b546431": "456fc77bd7c777bc5be33b293a83cc6c",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/6b/38408f7df394da7d6ac1d1f4c852d9a0610d55": "a406e38c1dcd72bf52be0c88fa09f47d",
".git/objects/07/4eab85c0a02d044be9cac7d710c62721c0c756": "6384ec997ca76cc1d4c78ebf62483daf",
".git/objects/00/0bb3fcc395f1cbeb922ff97aa4d5a10b14a33f": "92c00807d91777b1d541640d960ac827",
".git/objects/36/b5165bdde0a4ac560e6d0402559580a4fd747a": "b2fc25013f2daa881a6e78eb87f82b84",
".git/objects/09/701661c574dccd00e370779701197dfd7d6802": "d1e241c886311aefc1b109bfd1a1328e",
".git/objects/62/a01d6826913d9efa140d2e9f4bc0f13918e607": "44ba2af6a4f05cb190463143170ae010",
".git/objects/37/7580cbf691d03aea79c63a3a251b1b48ac01f1": "c196d282a50e3c372b4445c6b8868297",
".git/objects/6d/d13f8fec224a49a4700cce63d2ee0237f6e4dc": "b3a6d2717c6748a5dc49960afe83678c",
".git/objects/6c/802888a52ab121dfe8ec0ef3e2c0f80900cefe": "3a6cdda582fbbd64681e990229bc695d",
".git/objects/97/0937c67050a20a11a30f57b13d7d0e6f8bf917": "51e1e8247050655945ccd9e4ad4e8684",
".git/objects/0f/d72252884ea351c43abfd50451aa70af229159": "9670eee7ba1de909388f551367c693fe",
".git/objects/0f/bcdfac3ac31413f6491211fbc0855d056e2921": "cc9bfb3f25be8373b40bd2b96042ef05",
".git/objects/d3/efa7fd80d9d345a1ad0aaa2e690c38f65f4d4e": "610858a6464fa97567f7cce3b11d9508",
".git/objects/dd/728c6215db2b5d61e4dad7675381f63a306628": "32ec58d5d1fb4b99906e1f576d4f82e2",
".git/objects/dd/9f2b039322ec38db46c492355c54ee80e1349f": "0cd3f21bc08e7169c33c69353220a8a7",
".git/objects/d5/b61cc586b656af11429b5e1a1808ce0f018d18": "d1f48f3c5b50ece2215098a814a1e30c",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/a8/7a692d7fb4e10005c492736056e699329e73bf": "88a5c892be13e02863abaadbb2e5df6f",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/b9/ffcadcfdeb2cae1d80f872ce9e7ca2ae18dda5": "d1afcdccb1b5f238783cc8090b5682d8",
".git/objects/e1/8d04543a7b539ae18c99019c6f3baa90801c4c": "8e952ba9d4aeec5203a766fb3df94f9b",
".git/objects/cc/16d3d19ddacde714e28cb83878114dedc6cfda": "ab414ed86ff92998055990ad941acabf",
".git/objects/cc/0210b7d7f05a1ae26068dc910fd233c8360c54": "907f22797f8a5de05e8115a5344a27d1",
".git/objects/f0/83410b0ebf7ab2a7ab1d462456a4c7c1358df9": "5f1718b9abb13748849a03c1c52195e0",
".git/objects/c2/3878b2ba6bcd8b865dbeb5408e43a313d2387e": "f516583d6554b61d3ec471f3de446cd8",
".git/objects/f6/40babdac31455bda46e7254ed62099fe2233b8": "ba49f4838bfef0b52198876d529f61f1",
".git/objects/e9/165cc85dbe7c38a2029034b9697af97d0a814a": "f0672970782e80046ab2a0e7dae58e65",
".git/objects/e7/5e920f175da53dd6f04d858636baa25dc702f4": "0fd694d0b7477cee41611e70d0cd6732",
".git/objects/f8/92e4f26977d9a8d5dd6a59489ba1db4c2762bf": "caff4359e120e84455407a2316dce282",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/2d/31c05e1f92f7aa3c56c5f7d0230217d17f83bc": "ee3252d3c00a928ffde8ced8c2f206fc",
".git/objects/83/da70040cf18eed0af4ac9aee4555257db20798": "837ff85e6dab60e076b4cda69f095063",
".git/objects/77/994057bc051b0eec4794baffb364f7f05bf4f8": "483155db50bcd8ad2d40a4cf33721969",
".git/objects/48/1fd543429108548130faa003a0c7c6fa013ba0": "7c47e82565e86c0a899b3f51f05e8269",
".git/objects/70/4dd2f99bfb0b16b45a61c61ae92015976f175d": "d42e44754100e3733baabb659e55834d",
".git/objects/1e/bf993c04c08e17a0122730f8d7ce6e139c8bad": "eeb4f0d71f24758335fe1753273ad6c2",
".git/objects/8d/0ada247f2c28e3a5bf5ffe7a1305ad8c55de6f": "6ff350c17805885db02ba6ecee6bc1a7",
".git/objects/85/f335cfd9bbd6a1eb936ecd13ea852a4c8ade99": "0436fc81bd691bfac9f23ed21cbadc09",
".git/objects/1d/49b2060714f4e83583f760773133c53ad9259d": "322a4232213343d43cb8ef027f4c9ef4",
".git/objects/1d/384f3748038966a5c7316223edf120dd5894dd": "a8d542276aa823dfefb8d26439e1077a",
".git/objects/76/41a63332991ccdf78f4f7adde602d5f0e7093e": "4933f986a57342d36b53d21f56324d39",
".git/objects/49/fbcd8de177a74e23924af05a5bfcbe902f0777": "4f490485f93f9ffc7abd14e1a04ed0aa",
".git/objects/2b/9188906f82168019f55a4934e57c6f7868f161": "3c6e6a351289a812d2d3e5405b3e75e3",
".git/objects/47/93bd136bd74e93cf81acfbc49bc68862a848ca": "ace11f64c485d37aae0ae7aade7ca56c",
".git/objects/13/8c367ac99cf23711dd96cb045cf2b015c6e054": "ed3e2da25ca6930bcf8f4124a8d2a113",
".git/objects/7a/e03e09e1910991213cf069040981cf5b07e838": "3e67a0247e142db30cb8051bb9b0ad10",
".git/objects/7a/fe0b8059077e5895974f63e6d0b048e60bcaea": "baef1be1105ea35dcea0b0e23d292e6c",
".git/objects/8e/7f4b338840099949781ab85496d7a67fae46f1": "7f2803c236e9e7d95ef6ed16a3a2bd13",
".git/objects/8e/849178c312fe7fe368f1e3bfe53552a20c8306": "0def36c7089400558499a28ecfca5724",
".git/objects/22/1bb6b27d4bd81be7ac8f2f89e67115ea5e503e": "c131189a27805afe94b7e9d28f0e105c",
".git/objects/25/6cd7aac6241b6293e25971ef320d214e2ed394": "c13bb5e17c210bb13ca307949b31d686",
".git/objects/25/4a33a494a2fbce5a99871d0f97e2f061c897f4": "032ed58f27bca96689122be1b62a5d38",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "51f10109299573fa60fb8662276f2ee0",
".git/logs/refs/heads/gh-pages": "f0a547ac064e9bd9b9561d60336ce710",
".git/logs/refs/heads/main": "dfa18c9863ea7bac472deae842f3328a",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/refs/heads/gh-pages": "cb073d2bd40e78f172b8ff4b5f50d60c",
".git/refs/heads/main": "cb073d2bd40e78f172b8ff4b5f50d60c",
".git/index": "66e5b4542e9c80003e163c3a99a99229",
".git/COMMIT_EDITMSG": "c31d13926911fe2fd2fab5c038cabc93",
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
