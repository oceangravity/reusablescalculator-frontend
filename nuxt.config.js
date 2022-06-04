export default {
  target: "static",


  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Reusable Calculator",
    titleTemplate: "%s - INPACS",
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: "" }, { name: "format-detection", content: "telephone=no" }],

    htmlAttrs: {
      class: "overflow-y-scroll"
    },

    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }]
  },

  vue: {
    config: {
      // silent: true,
      // productionTip: true,
      // devtools: false
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/tailwind.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios.ts"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/composition-api/module",
    // https://go.nuxtjs.dev/typescript
    ["@nuxt/typescript-build", { typeCheck: false }],
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    "@nuxtjs/google-analytics",
    "@nuxt/postcss8",
    ["@pinia/nuxt", { disableVuex: true }]
    // '@nuxtjs/tailwindcss',
    // 'nuxt-vite'
  ],

  googleAnalytics: {
    id: "G-MKWQ6F83NT"
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxt/http",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    [
      "@nuxtjs/i18n",
      {
        locales: [
          { code: "en-US", iso: "en-US", file: "en.json" },
          { code: "es-ES", iso: "es-ES", file: "es.json" }
        ],
        lazy: true,
        langDir: "i18n/",
        defaultLocale: "en-US",
        vueI18nLoader: true,
        detectBrowserLanguage: true,
        strategy: "no_prefix",
        vueI18n: {
          fallbackLocale: "en-US",
          fallbackRoot: true,
          silentFallbackWarn: true
        }
      }
    ]
  ],

  env: {
    APIUrl: "https://pedidos-mobile.prismasl.com/backend/api/"
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: process.env.APIUrl
  },

  debug: true,

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icons: {
      iconFileName: "icon.png"
    },
    config: {
      ":signature": Date.now() // generate new sw.js for each build
    },
    manifest: {
      name: "Catálogo",
      short_name: "Catálogo",
      lang: "en",
      display: "standalone"
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: "https://fonts.googleapis.com/.*",
          handler: "cacheFirst",
          method: "GET",
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: "https://fonts.gstatic.com/.*",
          handler: "cacheFirst",
          method: "GET",
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: "https://pedidos.prismasl.com/media/.*",
          handler: "networkFirst",
          method: "GET",
          strategyOptions: {
            cacheName: "cache",
            cacheableResponse: { statuses: [0, 200] }
          }
        }
      ]
    }
  },

  vite: {
    ssr: true,
    build: {
      sourcemap: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  }
}
