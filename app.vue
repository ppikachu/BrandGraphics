<script setup lang="ts">
import { toJpeg } from 'html-to-image'
//@ts-ignore
import testImage from '@/assets/test.jpg'

const runtimeConfig = useRuntimeConfig()
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
  startbase64: testImage,
  photoPosition: 50,
  frameSize: { label: "Portrait Post 1920x1080", x: 1920, y: 1080 },
  iso: "i_words1",
  bgFilter: "aden",
  bigText: 'This is your LinkedIn picture.\nGet it right!',
  bigTextSize: 20,
  bigTextColor: "white",
  bigTextAlign: 'left',
  bigTextVerticalAlign: 'items-center',
}

/**
 * Retrieves settings from local storage or uses default settings.
 * @param defaultSettings - The default settings if no data is found in local storage.
 * @returns The settings object retrieved from local storage or default settings.
 */
const settings = useStorageAsync('linkedin-local-storage', defaultSettings)

const loaded = ref(false)
const previewArea = ref<HTMLElement>()
const filename = ref('test')
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
  .finally(() => downloading.value = false)
}
onMounted(() => { nextTick(() => { loaded.value = true }) })
</script>

<template>
  <VitePwaManifest />
  <div class="flex flex-col items-center lg:justify-center min-h-svh dark:bg-gray-950 py-16">
    <Header />
    <!-- LOADING -->
    <div v-show="!loaded" class="h-96 w-48 mx-auto flex items-center justify-center">
      <UProgress animation="swing" size="xs" />
    </div>
    <Transition>
      <div v-show="loaded" class="flex flex-col lg:flex-row items-center lg:items-start gap-4 md:gap-8">
        <!-- PREVIEW: -->
        <section id="previewArea">
          <UDivider label="Preview" class="mb-4" />
          <div ref="previewArea"><Background :settings="settings" /></div>
        </section>
        <!-- CONFIG and EXPORT: -->
        <section class="space-y-4 w-96">
          <!-- SETTINGS: -->
          <UDivider label="1. Format & Image (click to change)" />
          <Format v-model="settings.frameSize" />
          <div class="grid grid-cols-2 gap-4">
            <PhotoPosition v-model="settings.photoPosition" />
            <Filter v-model="settings.bgFilter" :base64="settings.startbase64" :position="settings.photoPosition" :frameSize="settings.frameSize" />
          </div>
          <!-- TEXT -->
          <UDivider label="2. Edit Text" />
          <UTextarea v-model="settings.bigText" autoresize />
          <TextFormat
            v-model:size="settings.bigTextSize"
            v-model:align="settings.bigTextAlign"
            v-model:valign="settings.bigTextVerticalAlign"
            v-model:iso="settings.iso"
          />
          <!-- END SETTINGS: -->

          <!-- BUTTONS: -->
          <UDivider label="3. Get Image" />
          <UButton
            icon="i-heroicons-arrow-down-on-square-16-solid"
            size="md"
            block
            @click="previewArea && downloadFinalImage(previewArea, filename+' '+settings.frameSize.label)"
            :loading="downloading"
          >
            DOWNLOAD
          </UButton>

          <!-- DEBUG: -->
          <!-- <DevOnly>
            <UAlert icon="i-mdi-asterisk" color="yellow" :description="heightTextArea.toString()"/>
          </DevOnly> -->
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