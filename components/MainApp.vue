<script setup lang="ts">
import '~/assets/app-styles.css'
import '~/assets/user.css'
import '~/assets/extra-filters.css'
import { toJpeg } from 'html-to-image'
//@ts-ignore
import confetti from 'canvas-confetti'

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
      colors: ['#fdba74', '#f97316', '#c2410c'],
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
  <div class="app-font flex flex-col items-center lg:justify-center min-h-svh dark:bg-gray-950 py-16">
    <Header />
    <!-- LOADING -->
    <div v-show="!loaded" class="h-96 w-48 mx-auto flex items-center justify-center">
      <UProgress animation="swing" size="xs" />
    </div>

    <Transition name="fade">
      <div v-show="loaded" class="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
        <!-- PREVIEW: -->
        <section id="preview">
          <!-- <UDivider :label="$t('preview')" class="mb-4" /> -->
          <div ref="captureArea">
            <Background :settings="settings" v-model="canDownload" />
          </div>
        </section>

        <!-- CONFIG and EXPORT: -->
        <section class="space-y-4 min-w-full max-w-96 md:w-96 md:min-w-min px-2">
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
