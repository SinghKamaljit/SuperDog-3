const CACHE = 'superdog-story-version-3';

const SHELL = [
'./',
'./index.html',
'./manifest.json',
'./mascot.png',
'./icon192.svg',
'./icon512.svg'
];

self.addEventListener('install', e => {
e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
self.skipWaiting();
});

self.addEventListener('activate', e => {
e.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
)
);
self.clients.claim();
});

self.addEventListener('fetch', e => {
const url = e.request.url;

// Seamlessly allows all variations of story media to pass by the core cache on-demand
if (/.(png|webp|jpg|mp3|txt)$/i.test(url) || /frame\d+.(png|webp|jpg)/i.test(url)) {
e.respondWith(fetch(e.request).catch(() => new Response('')));
return;
}

e.respondWith(
caches.match(e.request).then(r => r || fetch(e.request))
);
});