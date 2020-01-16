# v-pwa

- module.exports = {
-  pwa: {
-   name: 'easy-front-vue-cli3',
 -   themeColor: '#4DBA87',
 -   msTileColor: '#000000',
 -   appleMobileWebAppCapable: 'yes',
 -   appleMobileWebAppStatusBarStyle: 'black',
 -   // configure the workbox plugin (GenerateSW or ----InjectManifest)
 -   workboxPluginMode: 'InjectManifest',
 -   workboxOptions: {
  -     // swSrc is required in InjectManifest mode.
  -     swSrc: 'src/service-worker.js',
  -     // 第一种方案
  -     importWorkboxFrom: 'local'
  -     // 第二种方案
  -     // importWorkboxFrom: 'cdn'
  -     // 第三种方案
  -     // importWorkboxFrom: 'disabled',
  -     // importScripts: 'https://storage.googleapis.com/-workbox-cdn/releases/4.3.1/workbox-sw.js'
  -     // ...other Workbox options...
 -   }
 - }
- }

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

