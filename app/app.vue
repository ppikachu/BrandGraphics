<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
// const { $pwa } = useNuxtApp()

useSeoMeta({
  title: runtimeConfig.public.NAME,
  description: runtimeConfig.public.DESCRIPTION,
  ogTitle: runtimeConfig.public.NAME,
  ogDescription: runtimeConfig.public.DESCRIPTION,
  ogImage: runtimeConfig.public.OG_IMAGE,
  ogUrl: runtimeConfig.public.HOST,
  twitterTitle: runtimeConfig.public.NAME,
  twitterDescription: runtimeConfig.public.DESCRIPTION,
  twitterImage: runtimeConfig.public.TWITTER_IMAGE,
  twitterCard: 'summary'
})
useHead({
  htmlAttrs: {
    lang: useI18n().locale
  },
  meta: [
    {
      name: 'theme-color',
      content: '#09090b'
    }
  ],
  link: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png'
    },
  ]
})

// onMounted(() => {
//   if ($pwa?.offlineReady) console.log('offline ready')
// })
</script>

<template>
  <!-- <VitePwaManifest /> -->
  <MainApp />
  <!-- <ClientOnly>
    <div
      v-if="$pwa?.offlineReady || $pwa?.needRefresh"
      class="pwa-toast"
      role="alert"
    >
      <div class="message">
        <span v-if="$pwa.offlineReady">
          App ready to work offline
        </span>
        <span v-else>
          New content available, click on reload button to update.
        </span>
      </div>
      <button
        v-if="$pwa.needRefresh"
        @click="$pwa.updateServiceWorker()"
      >
        Reload
      </button>
      <button @click="$pwa.cancelPrompt()">
        Close
      </button>
    </div>
    <div
      v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
      class="pwa-toast"
      role="alert"
    >
      <div class="message">
        <span>
          Install PWA
        </span>
      </div>
      <button @click="$pwa.install()">
        Install
      </button>
      <button @click="$pwa.cancelInstall()">
        Cancel
      </button>
    </div>
  </ClientOnly> -->
</template>
