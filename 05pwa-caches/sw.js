//表示当前对象可以用this或者self
const CACHE_NAME = 'cache_v2'
//主要就是缓存内容
self.addEventListener('install',async event=>{

//开启一个caches,得到一个cache对象(存入key)
const cache = await caches.open(CACHE_NAME)
//cache对象就可以存储资源(等待cache把所有的资源存储起来)
//注意 在存 index.html的时候，存'/',而不是存'/index.html',不然会找不到资源
await cache.addAll([
  '/',
  '/index.css',
  '/images/logo.png',
  '/manifest.json'
])
//就没有必要添加 event.waitUntil(),因为前边的所有操作都用了 await
await this.skipWaiting()




  //会让service worker 跳过等待，直接进入到activate状态
  //等待skipwaiting结束，才进入到activate

  // event.waitUntil(this.skipWaiting())
  // self.skipWaiting()
})

//主要是清除旧缓存
self.addEventListener('activate',async event=>{
  //会清除掉旧的资源,获取到所有资源的key
const keys = await caches.keys()
keys.forEach(key=>{
  if(key !== CACHE_NAME){
      caches.delete(key)
  }
})
//就没有必要添加 event.waitUntil(),因为前边的所有操作都用了 await
await self.clients.claim()


  //表示service worker激活后，立即获取控制权(等到获取控制权后，再进行其他操作)
  //例如：获得控制权后，在进行缓存操作
  // event.waitUntil(self.clients.claim())
})

//主要是操作缓存
//判断资源是否能够请求成功,如果请求成功,就响应成功的结果,如果请求失败了,就读取caches缓存
//注释：fetch事件会在请求发送的时候触发
self.addEventListener('fetch', event=>{
  // console.log('fetch',event)
  //获取请求的url
  // console.log(event.request.url)

  //请求对象
  const req = event.request
  //例如 http://localhost (只保留同源的资源，其他域名的资源，可能会出错，不保存)
  const url = new URL(req.url)
  if(url.origin !== self.origin){ // self.origin 、location.origin也可以
    return
  }
  //给浏览器响应（判断是不是静态资源，是走缓存，不是就走线上资源）
  //线上资源优先网络，静态资源优先缓存
  if(req.url.includes('/api')){
    event.respondWith(networkFirst(req))
  }else{
    event.respondWith(cacheFirst(req))
  }

})

//网络请求优先
async function networkFirst(req){
  const cache = await caches.open(CACHE_NAME)
try {
  //先从网络读取最新的资源
  const fresh = await fetch(req)
  //网络优先，获取到的数据，应该再次更新到缓存中
  //把响应的数据备份存储再缓存中(缓存了就没有返回了，所以备份一份做缓存用，另一份做返回用)
  cache.put(req,fresh.clone())
  return fresh
} catch (e) {
  //去读缓存
  // const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(req)
  return cached
}
}

//缓存优先，一般适用于静态资源
async function cacheFirst(req){
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(req)
//如果从缓存中拿到
  if(cached){
    return cached
  }else{
    const fresh = await fetch(req)
    //把响应的数据备份存储再缓存中(缓存了就没有返回了，所以备份一份做缓存用，另一份做返回用)
    cache.put(req,fresh.clone())
    return fresh
  }
}