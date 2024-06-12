// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  debug: true,
  devtools: { enabled: true },
  colorMode: {
    preference: 'dark'
  },
  modules: [
    "@vueuse/nuxt",
    "@nuxt/ui",
    "@nuxt/fonts",
    "nuxt-icons",
    "@nuxtjs/device",
    "@nuxtjs/i18n",
    // "@vite-pwa/nuxt"
  ],

  runtimeConfig: {
    public: {
      DEFAULT_LANGUAGE: "es",
      NAME: "BrandGraphics",
      DESCRIPTION: "Generador de thumbnails.",
      OG_IMAGE: "/OGvisu.png",
      TWITTER_IMAGE: "/icon.png",
      ICON: "/icon.png",
      HOST:
        process.env.NODE_ENV === "production"
          ? "https://brandgraphics.vercel.app/"
          : "http://localhost:3000",
    },
  },

  i18n: {
    // Module Options
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'es',
        name: 'Español'
      }
    ],
    defaultLocale: 'en',
  },

  // pwa: {
  //   // payloadExtraction: 'default',
  //   // appManifest: true,
  //   registerType: 'autoUpdate',
  //   workbox: {
  //     navigateFallback: "/",
  //     globPatterns: ['**/*.{js,css,html,ico,png,svg}']
  //   },
  //   devOptions: {
  //     enabled: true
  //   },
  //   includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
  //   manifest: {
  //     name: 'Linkedin Thumbnail Generator',
  //     short_name: 'Linkedin Thumbnails',
  //     description: 'Esta es una aplicación para generar imagen compatibles con los formatos de LinkedIn.',
  //     start_url: '/',
  //     id: '/',
  //     theme_color: '#000000',
  //     background_color: '#000000',
  //     display: 'standalone',

  //     icons: [
  //       {
  //         src: '/android-chrome-192x192.png',
  //         sizes: '192x192',
  //         type: 'image/png'
  //       },
  //       {
  //         src: '/android-chrome-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //         purpose: "any",
  //       }
  //     ]
  //   }
  // },
})