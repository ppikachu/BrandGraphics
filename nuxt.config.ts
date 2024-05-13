// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@vueuse/nuxt",
    "@nuxt/ui",
    "@nuxt/fonts",
    "nuxt-icons",
    "@nuxtjs/device",
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

  fonts: {
    // You can provide overrides for individual families
    families: [
      // specify specific font data - this will bypass any providers
      // { name: 'Montserrat', provider: 'google' },
      // { name: 'Playfair Display' },
      // { name: 'UnifrakturMaguntia' },
      // { name: 'Press Start 2P' },
      // { name: 'Abril Fatface' },
      // { name: 'Alfa Slab One' },
      // { name: 'Permanent Marker' },
    ],
    // providers: {
    //   google: true
    // },
    // The weights, styles, and subsets to generate font face rules for.
    // You can also customize these for a specific family, within `families`.
    defaults: {
      // weights: [400, 500, 600, 700],
      // styles: ['normal', 'italic'],
      // subsets: ['latin-ext', 'latin'],
    },
    // order in which providers are checked.
    // priority: ['bunny', 'google'],
  }

})