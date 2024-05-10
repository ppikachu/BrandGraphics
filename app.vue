<script setup lang="ts">
import { toJpeg } from 'html-to-image'
//@ts-ignore
import testImage from '@/assets/test.jpg'
import BlendMode from './components/BlendMode.vue';

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
  frameSize: { label: "Square", x: 1080, y: 1080 },
  bgColor: { label: "Red", color: "blue" },
  iso: { label:"Words 1", svg:"i_words1" },
  bgBlendMode: "overlay",
  bgOpacity: 0.5,
  bigText: 'LINKED\nIN.',
  bigTextFont: { id: 'Montserrat', label: 'Moderna', weight: '700' },
  bigTextSize: { size: 20, label: 'md'},
  bigTextLineHeight: 1,
  bigTextColor: { label: "Blanco", color: "white" },
  bigTextShadow: true,
  bigTextAlign: 'left',
  bigTextVerticalAlign: 'items-center',
}
const settings = useStorageAsync('linkedin-local-storage', defaultSettings)

const loaded = ref(false)
const dropZoneRef = ref<HTMLDivElement>()
const previewArea = ref<HTMLElement>()
const { isOverDropZone } = useDropZone(dropZoneRef, { onDrop, dataTypes: ['image/jpeg', 'image/png'] })
const file = shallowRef()
const filename = ref('test')
const previewDownloading = ref(false)

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
  previewDownloading.value = true
  if (!debug) toJpeg(area, { quality: 0.95, pixelRatio: settings.value.frameSize.x / 384 })
  .then(function (dataUrl) {
    var link = document.createElement('a')
    link.download = name
    link.href = dataUrl
    link.click()
  })
  .finally(() => previewDownloading.value = false)
}

const uiHoverInput = computed(() => { return 'outline-2 hover:outline-dotted hover:outline-'+settings.value.bigTextColor.color })
const nLinesInParagraph = computed(() => settings.value.bigText.split(/\n/).length)
const isoAlign = computed(() => {
  switch (settings.value.bigTextAlign) {
    case 'left':
      return 'items-start self-start'
    case 'center':
      return 'items-center self-center'
    case 'right':
      return 'items-end self-end'
  }
})
const factor = 1.5
const isoSize = computed(() => {
  const size = settings.value.bigTextSize.size
  return 'width: ' + size * factor + 'px; height: ' + size * factor + 'px;'
})
// #endregion

onMounted(() => { nextTick(() => { loaded.value = true }) })
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen dark:bg-gray-950 py-16">
    <Header />
    <!-- LOADING -->
    <div v-show="!loaded" class="h-96 w-48 flex items-center justify-center">
      <UProgress animation="swing" size="xs" />
    </div>
    <Transition>
      <div v-show="loaded" class="flex flex-col lg:flex-row items-center gap-4 md:gap-8">
        <!-- 9X9: -->
        <div class="mx-auto w-96 overflow-hidden">
          <div
            ref="previewArea"
            class="flex relative"
            :class="settings.bigTextVerticalAlign"
          >
            <!-- OVER IMAGE -->
            <div class="absolute w-full z-20 flex flex-col p-4">
              <!-- ISO -->
              <div :style="isoSize" :class="isoAlign">
                <nuxt-icon :name="settings.iso.svg" filled :class="settings.bigTextColor.color"/>
              </div>
              <!-- BIG TEXT -->
              <UTextarea
                v-model="settings.bigText"
                variant="none"
                textareaClass="p-0"
                autoresize
                :rows="nLinesInParagraph"
                :style="`
                  font-size: ${settings.bigTextSize.size}px;
                  font-family: ${settings.bigTextFont.id};
                  font-weight: ${settings.bigTextFont.weight || '400'};
                  color: ${settings.bigTextColor.color};
                  line-height: ${settings.bigTextSize.size * settings.bigTextLineHeight}px;
                  margin-top: ${settings.bigTextSize.size * .5}px;
                  text-align: ${settings.bigTextAlign};
                  text-shadow: ${settings.bigTextShadow ? '1px 1px 1px #000' : 'none'}
                `"
                :ui="{ variant: { none: uiHoverInput }, form: 'overflow-hidden' }"
              /><!-- ^^^ importante! ui para ocultar la barra de scroll -->
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
                <div class="hidden group-hover:flex z-20 bg-primary rounded px-2 py-1 space-x-1 max-w-64 mx-auto top-8">
                  <UIcon name="i-heroicons-arrow-up-on-square" class="w-5 h-5 flex-shrink-0" />
                  <span class="text-sm uppercase">click (o arrastrar) para cambiar la imagen</span>
                </div>
              </label>
            </div>
            <!-- GRADIENT -->
            <div
              class="w-full h-full absolute top-0 left-0 opacity-50"
              :style="`
                background-color: ${settings.bgColor.color};
                mix-blend-mode: ${settings.bgBlendMode};
                opacity: ${settings.bgOpacity};
              `"
            />
            <!-- IMAGE -->
            <img
              :src="settings.startbase64"
              alt="fondo-pieza"
              :width="settings.frameSize.x"
              :height="settings.frameSize.y"
              class="object-cover w-full"
              :class="settings.photoAlign"
              :style="`height: ${settings.frameSize.y / settings.frameSize.x * 384}px;`"
            >
          </div>
        </div>
        <!-- CONFIG and EXPORT: -->
        <section class="space-y-4">

          <!-- SETTINGS: -->
          <UDivider label="Format & image crop" />
          <div class="grid grid-cols-2 gap-4">
            <Format v-model="settings.frameSize" />
            <PhotoAlign v-model="settings.photoAlign" />
          </div>
          <!-- TEXT -->
          <TextFormat
            v-model:size="settings.bigTextSize"
            v-model:color="settings.bigTextColor"
            v-model:shadow="settings.bigTextShadow"
            v-model:align="settings.bigTextAlign"
            v-model:valign="settings.bigTextVerticalAlign"
            v-model:iso="settings.iso"
          />
          <!-- COLOR -->
          <UDivider label="Color tint" class="pt-4" />
          <div class="grid grid-cols-2">
            <ColorChooser v-model:color="settings.bgColor" v-model:opacity="settings.bgOpacity" />
            <BlendMode v-model="settings.bgBlendMode" />
          </div>
          <!-- END SETTINGS: -->

          <!-- BUTTONS: -->
          <UButton
            icon="i-heroicons-arrow-down-on-square-16-solid"
            size="md"
            block
            @click="previewArea && downloadFinalImage(previewArea, filename+settings.frameSize.label)"
            :loading="previewDownloading"
          >
            DOWNLOAD
          </UButton>

          <!-- DEBUG: -->
          <!-- <DevOnly>
            <UAlert icon="i-mdi-asterisk" color="yellow" :description="JSON.stringify(file)"/>
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
  font-weight: 700;
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