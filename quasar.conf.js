// Configuration for your app

module.exports = function(ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: ['axios', 'graphql'],

    css: ['app.styl'],

    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QPageSticky',
        'QPageScroller',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QPopupEdit',
        'QPopupProxy',
        'QInput',
        'QMenu',
        'QDialog',
        'QBanner',
        'QEditor',
        'QForm',
        'QToggle',
        'QCard',
        'QTable',
        'QTr',
        'QTd',
        'QParallax',
        'QPullToRefresh',
        'QInfiniteScroll',
        'QSpinnerDots',
      ],

      directives: ['Ripple'],

      // Quasar plugins
      plugins: ['Notify', 'Loading'],

      config: {
        loading: {},
      },

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: true,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      env: ctx.dev
        ? {
            API_ENDPOINT: JSON.stringify('http://localhost:3000/graphql'),
          }
        : {
            API_ENDPOINT: JSON.stringify('https://nest.may4th.art/graphql'),
          },
      // vueCompiler: true,
      gzip: false,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        })
      },
    },

    devServer: {
      // https: true,
      port: 5454,
      open: true, // opens browser window automatically
    },

    // animations: 'all' --- includes all animations
    animations: [],

    ssr: {
      pwa: false,
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    cordova: {
      id: 'art.may4th.app',
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      },
    },
  }
}
