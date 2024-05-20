import { VitePWA } from 'vite-plugin-pwa'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    "@vite-pwa/nuxt"
  ],

  runtimeConfig: {
    public: {
      DEFAULT_LANGUAGE: "es",
      NAME: "Linkedin thumbnails",
      DESCRIPTION: "Generador de thumbnails.",
      OG_IMAGE: "/OGvisu.png",
      TWITTER_IMAGE: "/icon.png",
      ICON: "/icon.png",
      // FIXME: url
      HOST:
        process.env.NODE_ENV === "production"
          ? "https://linkedin-susan.vercel.app/"
          : "http://localhost:3000",
    },
  },
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'Linkedin Thumbnail Generator',
          short_name: 'Linkedin Thumbnails',
          description: 'Esta es una aplicación para generar imagen compatibles con los formatos de LinkedIn.',
          theme_color: '#000000',
          icons: [
            {
              src: '/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
  }
})