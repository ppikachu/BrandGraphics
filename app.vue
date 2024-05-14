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
    {
      rel: 'manifest',
      href: '/site.webmanifest'
    }
  ]
})

const defaultSettings = {
  startbase64: testImage,
  photoAlign: 'object-center',
  frameSize: { label: "Portrait Post 1920x1080", x: 1920, y: 1080 },
  bgColor: "blue",
  iso: { label:"Words 1", svg:"i_words1" },
  bgFilter: "aden",
  bgBlendMode: "overlay",
  bgOpacity: 0.5,
  bigText: 'This is your LinkedIn picture.\nGet it right!',
  bigTextSize: 20,
  bigTextColor: "white",
  bigTextAlign: 'left',
  bigTextVerticalAlign: 'items-center',
}
const settings = useStorageAsync('linkedin-local-storage', defaultSettings)

const loaded = ref(false)
const dropZoneRef = ref<HTMLDivElement>()
const previewArea = ref<HTMLElement>()
const textArea = ref<HTMLElement>()
const { height: heightTextArea } = useElementSize(textArea)
const { height: heightPreviewArea } = useElementSize(previewArea)
const { isOverDropZone } = useDropZone(dropZoneRef, { onDrop, dataTypes: ['image/jpeg', 'image/png'] })
const file = shallowRef()
const filename = ref('test')
const downloading = ref(false)

// const debug = process.env.NODE_ENV === "development" ? true : false
const debug = false

// #region FUNCTIONS
function onFileInput(e: Event) {
  const { base64: fileBase64 } = useBase64((e.target as HTMLInputElement).files![0])
  settings.value.startbase64 = fileBase64 as unknown as string
}
// called when files are dropped on zone
function onDrop(files: File[] | null) {
  if (files) {
    file.value = files[0]
    filename.value = file.value.name
    const { base64: fileBase64 } = useBase64(files[0] )
    settings.value.startbase64 = fileBase64 as unknown as string
  }
}
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

const uiHoverInput = computed(() => { return 'outline-2 hover:outline-dotted hover:outline-'+settings.value.bigTextColor })
const nLinesInParagraph = computed(() => settings.value.bigText.split(/\n/).length)
const isoAlign = computed(() => {
  switch (settings.value.bigTextAlign) {
    case 'left':
      return 'self-start'
    case 'center':
      return 'self-center'
    case 'right':
      return 'self-end'
  }
})
const isoRelativeSize = 2
const isoSize = computed(() => {
  const size = settings.value.bigTextSize
  return 'width: ' + size * isoRelativeSize + 'px; height: ' + size * isoRelativeSize + 'px;'
})
const textPadding = computed(() => {
  if (settings.value.bigTextAlign === 'left') return 'p-1 pr-6'
  if (settings.value.bigTextAlign === 'center') return 'p-1'
  if (settings.value.bigTextAlign === 'right') return 'p-1 pl-6'
})
// #endregion

onMounted(() => { nextTick(() => { loaded.value = true }) })
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen dark:bg-gray-950 py-16">
    <Header />
    <!-- LOADING -->
    <div v-show="!loaded" class="h-96 w-48 mx-auto flex items-center justify-center">
      <UProgress animation="swing" size="xs" />
    </div>
    <Transition>
      <div v-show="loaded" class="flex flex-col lg:flex-row items-center gap-4 md:gap-8">
        <!-- 9X9: -->
        <div class="mx-auto w-96">
          <div
            ref="previewArea"
            class="flex relative"
            :class="settings.bigTextVerticalAlign, {'border-red-500 border-2': heightTextArea > heightPreviewArea }"
          >
            <!-- OVER IMAGE -->
            <div ref="textArea" class="absolute w-full z-20">
              <div class="p-4 flex flex-col">
                <!-- ISO -->
                <div :style="isoSize" :class="isoAlign" class="p-1">
                  <nuxt-icon :name="settings.iso.svg" filled />
                </div>
                <!-- BIG TEXT -->
                <UTextarea
                  v-model="settings.bigText"
                  autoresize
                  variant="none"
                  :textareaClass=textPadding
                  :rows="nLinesInParagraph"
                  :style="`
                    font-size: ${settings.bigTextSize}px;
                    line-height: ${settings.bigTextSize}px;
                    text-align: ${settings.bigTextAlign};
                  `"
                  :ui="{ variant: { none: uiHoverInput }, form: 'overflow-hidden Montserrat' }"
                /><!-- ^^^ importante! ui para ocultar la barra de scroll -->
              </div>
            </div>
            <!-- INPUT IMAGE -->
            <div class="absolute top-0 left-0 w-full h-full">
              <input id="image_uploads"
                type="file"
                name="image_uploads"
                accept=".jpg, .jpeg, .png"
                @change="onFileInput"
                class="hidden"
              >
              <label
                ref="dropZoneRef"
                for="image_uploads"
                class="group absolute z-10 w-full h-full cursor-pointer hover:outline-dashed outline-offset-4 outline-primary outline-2 rounded"
                :class="{'outline-dashed outline-green-500': isOverDropZone }"
              >
                <div class="hidden group-hover:flex z-20 bg-primary rounded px-2 py-1 space-x-1 max-w-64 mx-auto relative top-8">
                  <UIcon name="i-heroicons-arrow-up-on-square" class="w-5 h-5 flex-shrink-0" />
                  <span class="text-sm uppercase">click (o arrastrar) para cambiar la imagen</span>
                </div>
              </label>
            </div>
            <Background :settings="settings" />
          </div>
          <UAlert
            v-if="heightTextArea > heightPreviewArea"
            description="Text exceeds preview area. Shorten text or reduce font size."
            icon="i-mdi-alert"
            color="yellow"
            class="my-4 z-20"
          />
        </div>
        <!-- CONFIG and EXPORT: -->
        <section class="space-y-4 w-96">
          <!-- SETTINGS: -->
          <UDivider label="Format & image crop" />
          <div class="grid grid-cols-2 gap-4">
            <Format v-model="settings.frameSize" />
            <PhotoAlign v-model="settings.photoAlign" />
          </div>
          <!-- TEXT -->
          <TextFormat
            v-model:size="settings.bigTextSize"
            v-model:align="settings.bigTextAlign"
            v-model:valign="settings.bigTextVerticalAlign"
            v-model:iso="settings.iso"
          />
          <!-- COLOR -->
          <Filter v-model="settings.bgFilter" />
          <!-- END SETTINGS: -->

          <!-- BUTTONS: -->
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
.Montserrat {
  font-family: "Montserrat";
  color: white;
  font-weight: 700;
  text-shadow: 1px 1px 1px black;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.shadow {
  -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
  filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
  /* Similar syntax to box-shadow */
}
</style>