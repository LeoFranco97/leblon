// Service worker do app Leblon (escopo: a própria pasta do app). Network-first.
const CACHE='leblon-app-v2';
self.addEventListener('install', e=>self.skipWaiting());
self.addEventListener('activate', e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch', e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(res=>{const c=res.clone();caches.open(CACHE).then(ca=>ca.put(e.request,c)).catch(()=>{});return res;})
    .catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html')))
  );
});
