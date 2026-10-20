
const PREFIX='gymcoach-minimal-'+new URL(self.registration.scope).pathname.replace(/\W/g,'_');
const CACHE=PREFIX+'-v2';
const FILES=['./','index.html','styles.css','minimal.css','script.js','minimal.js','manifest.json','icon-192.png','icon-512.png','popular.html','progression.html','toning.html'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES.map(f=>new URL(f,self.registration.scope).href))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const cached=await cache.match(request,{ignoreSearch:true});
  if(cached)return cached;
  try{return await fetch(request)}catch(error){
   if(request.mode==='navigate')return await cache.match(new URL('index.html',self.registration.scope).href);
   throw error;
  }
 }));
});
