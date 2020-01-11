//表示当前对象可以用this或者self
//生命周期

self.addEventListener('install',event=>{
  //1111
  console.log('install',event)
  //会让service worker 跳过等待，直接进入到activate状态
  //等待skipwaiting结束，才进入到activate
  event.waitUntil(this.skipWaiting())
  // self.skipWaiting()
})

self.addEventListener('activate',event=>{
  console.log('activate',event)
  //表示service worker激活后，立即获取控制权(等到获取控制权后，再进行其他操作)
  event.waitUntil(self.clients.claim())
})

//注释：fetch事件会在请求发送的时候触发
self.addEventListener('fetch',event=>{
  console.log('fetch',event)
})
