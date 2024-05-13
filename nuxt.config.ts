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
})