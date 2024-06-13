<script setup lang="ts">
import '~/assets/app-styles.css'
import '~/assets/user.css'
import '~/assets/extra-filters.css'
import { toJpeg } from 'html-to-image'
//@ts-ignore
import confetti from 'canvas-confetti'

const loaded = ref(false)
const captureArea = ref<HTMLElement>()
const { height: heightPreviewArea } = useElementSize(captureArea)
const filename = ref('test')
const downloading = ref(false)
// const debug = process.env.NODE_ENV === "development" ? true : false
const debug = false

const canDownload = computed(() => {
  return heightTextArea.value > heightPreviewArea.value
})

const socialSize = computed(() => {
  return {
    x: socialSizes.find((f: FrameSize) => f.id === settings.frameSize)?.x,
    y: socialSizes.find((f: FrameSize) => f.id === settings.frameSize)?.y
  }
})

function downloadFinalImage() {
  downloading.value = true
  if (!debug && socialSize.value.x) toJpeg(captureArea.value as HTMLElement, { quality: 0.9, pixelRatio: socialSize.value.x / 384 })
  .then(function (dataUrl) {
    var link = document.createElement('a')
    link.download = filename.value + '_' + socialSize.value.x + 'x' + socialSize.value.y
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
            <Background />
          </div>
        </section>

        <!-- CONFIG and EXPORT: -->
        <section class="space-y-4 min-w-full max-w-96 md:w-96 md:min-w-min px-2">
          <!-- SETTINGS: -->
          <Format />
          <div class="grid grid-cols-5 gap-3">
            <BgFlip class="col-span-1" />
            <div class="col-span-2">
              <PhotoPosition />
            </div>
            <Filter v-model="settings.bgFilter" :base64="settings.startbase64" :position="settings.photoPosition" :frameSize="settings.frameSize" :flip="settings.bgFlip" class="col-span-2" />
          </div>
          <!-- TEXT -->
          <UDivider :label="$t('editText')" />
          <UTextarea v-model="settings.bigText" autoresize size="xl" />
          <TextFormat />
          <!-- END SETTINGS: -->

          <!-- DOWNLOAD: -->
          <UDivider :label="$t('getImage')" />
          <UButton
            :label="canDownload ? $t('fix_before_download') : $t('download')"
            :loading="downloading"
            :disabled="canDownload"
            icon="i-heroicons-arrow-down-on-square-16-solid"
            size="xl" block class="uppercase"
            @click="captureArea && downloadFinalImage()"
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