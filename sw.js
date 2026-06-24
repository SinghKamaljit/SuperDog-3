const CACHE = 'superdog-story-version-3'; // ✅ Active and uncommented

const SHELL = [
'./',
'./index.html',
'./manifest.json',
'./mascot.png',
'./icon192.svg',
'./icon512.svg'
];

// 1. Install stage: Saves the layout shell files locally
self.addEventListener('install', e => {
e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
self.skipWaiting();
});

// 2. Activate stage: Cleans old versions and claims immediate control
self.addEventListener('activate', e => {
e.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
) // ✅ Correctly closed parenthesis
); // ✅ Correctly closed parenthesis
self.clients.claim(); // ✅ Active control over current window
});

// 3. Fetch stage: Streams story files dynamically, caches core shell
self.addEventListener('fetch', e => {
const url = e.request.url;

// Dynamic story media matchers (filters past the cache for on-demand fetch)
if (//\d+.(png|webp|jpg)latex
/i.test(url) || /frame\d+\.(png|webp|jpg)

/i.test(url) ||
 /.mp3latex
/i.test(url) || /\.txt

/i.test(url)) {
e.respondWith(fetch(e.request).catch(() => new Response('')));
return;
}

// App Core Shell matchers (intercepts and responds directly from cache)
e.respondWith(
caches.match(e.request).then(r => r || fetch(e.request))
);
});