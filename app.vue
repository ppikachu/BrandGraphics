<script setup lang="ts">
import { toJpeg } from 'html-to-image'
//@ts-ignore
import confetti from 'canvas-confetti'
//@ts-ignore
import testImage from '@/assets/test.jpg'
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
    lang: 'es'
  },
  meta: [
    {
      name: 'theme-color',
      content: '#FFFFFF'
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

const defaultSettings = {
  frameSize: { x: 1920, y: 1080 },
  startbase64: testImage,
  photoPosition: 33,
  bgFlip: false,
  bgFilter: "nashville",
  iso: "i_words1",
  bigText: 'This is your LinkedIn picture.\nGet it right!',
  bigTextSize: 20,
  bigTextColor: "white",
  bigTextAlign: 'left',
  bigTextVerticalAlign: 'items-end',
}

/**
 * Retrieves settings from local storage or uses default settings.
 * @param defaultSettings - The default settings if no data is found in local storage.
 * @returns The settings object retrieved from local storage or default settings.
 */
const settings = useStorageAsync('linkedin-local-storage', defaultSettings)

const loaded = ref(false)
const captureArea = ref<HTMLElement>()
const filename = ref('test')
const canDownload = ref(true)
const downloading = ref(false)
// const debug = process.env.NODE_ENV === "development" ? true : false
const debug = false

function downloadFinalImage(area: HTMLElement, name: string): void {
  downloading.value = true
  if (!debug) toJpeg(area, { quality: 0.95, pixelRatio: settings.value.frameSize.x / 384 })
  .then(function (dataUrl) {
    var link = document.createElement('a')
    link.download = name
    link.href = dataUrl
    link.click()
  })
  .finally(() => {
    confetti({
      colors: ['#93c5fd', '#3b82f6', '#1d4ed8', '#1e3a8a'],
      particleCount: 200,
      spread: 120,
      origin: { y: 0.7 }
    })
    downloading.value = false
  })
}
onMounted(() => {
  // if ($pwa?.offlineReady) console.log('offline ready')
  nextTick(() => { loaded.value = true })
  })
</script>

<template>
  <!-- <VitePwaManifest /> -->
  <div class="flex flex-col items-center lg:justify-center min-h-svh dark:bg-gray-950 py-16">
    <Header />
    <!-- LOADING -->
    <div v-show="!loaded" class="h-96 w-48 mx-auto flex items-center justify-center">
      <UProgress animation="swing" size="xs" />
    </div>

    <Transition>
      <div v-show="loaded" class="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
        <!-- PREVIEW: -->
        <section id="preview">
          <!-- <UDivider :label="$t('preview')" class="mb-4" /> -->
          <div ref="captureArea">
            <Background :settings="settings" v-model="canDownload" />
          </div>
        </section>

        <!-- CONFIG and EXPORT: -->
        <section class="space-y-4 max-w-96 md:w-96">
          <!-- SETTINGS: -->
          <Format v-model="settings.frameSize" />
          <div class="grid grid-cols-3 gap-4">
            <BgFlip v-model="settings.bgFlip" />
            <PhotoPosition v-model="settings.photoPosition" />
            <Filter v-model="settings.bgFilter" :base64="settings.startbase64" :position="settings.photoPosition" :frameSize="settings.frameSize" :flip="settings.bgFlip" />
          </div>
          <!-- TEXT -->
          <UDivider :label="$t('editText')" />
          <UTextarea v-model="settings.bigText" autoresize size="xl" />
          <TextFormat
            v-model:size="settings.bigTextSize"
            v-model:align="settings.bigTextAlign"
            v-model:valign="settings.bigTextVerticalAlign"
            v-model:iso="settings.iso"
          />
          <!-- END SETTINGS: -->

          <!-- DOWNLOAD: -->
          <UDivider :label="$t('getImage')" />
          <UButton
            :label="canDownload ? $t('download') : $t('fix_before_download')"
            :loading="downloading" :disabled="!canDownload"
            icon="i-heroicons-arrow-down-on-square-16-solid"
            size="xl" block class="uppercase"
            @click="captureArea && downloadFinalImage(captureArea, filename + ' ' + settings.frameSize.x + 'x' + settings.frameSize.y)"
          />

          <!-- <UAlert v-show="$pwa?.needRefresh" icon="i-mdi-alert-circle" color="yellow">
            <template #description>
              New content available, click on reload button to update.
              <button @click="$pwa?.updateServiceWorker()">
                Reload
              </button>
            </template>
          </UAlert> -->
        </section>
      </div>
    </Transition>
  </div>
</template>

<style>
body {
  font-family: "JetBrains Mono", sans-serif;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>