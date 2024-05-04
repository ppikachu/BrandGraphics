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

// const debug = process.env.NODE_ENV === "development" ? true : false
const debug = false
const loaded = ref(false)
const dropZoneRef = ref<HTMLDivElement>()
const previewArea = ref<HTMLElement>()
const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  // specify the types of data to be received.
  dataTypes: ['image/jpeg']
})
const file = shallowRef()
const filename = ref('test')
const previewDownloading = ref(false)

const config = {
  startFile: '/test.jpg',
// linkedInSizes from google ai
  socialSizes: [[
    { label: "Square",                 x: 1080, y: 1080 },
    { label: "Landscape",              x: 1200, y:  627 },
    { label: "Portrait",               x:  627, y: 1200 },
    { label: "Article featured image", x: 1200, y:  644 },
    { label: "Article banner image",   x:  600, y:  322 },
    { label: "Blog post link images",  x: 1200, y:  627 },
    { label: "Profile photo",          x:  400, y:  400 },
    { label: "Cover photo",            x: 1128, y:  191 },
  ]],
  matrices: [
    //  -----------------------------------------------
    // | - - - | - - = | - = * | - - - | = = - | - = = |
    // | = = = | - = * | - = * | * * = | = - * | * - = |
    // | * * * | = * * | - = * | * = = | - * * | * * - |
    //  -----------------------------------------------
    // | 1 2 3 | 1 2 4 | 1 4 7 | 1 2 3 | 4 5 1 | 1 4 6 |
    // | 4 5 6 | 3 5 7 | 2 5 8 | 8 9 4 | 6 2 7 | 7 2 5 |
    // | 7 8 9 | 6 8 9 | 3 6 9 | 7 6 5 | 3 8 9 | 9 8 3 |
    //  -----------------------------------------------
    [0, 0, 0, .5, .5, .5, 1, 1, 1],
    [0, 0, .5, 0, .5, 1, .5, 1, 1],
    [0, .5, 1, 0, .5, 1, 0, .5, 1],
    [.11, .22, .33, .88, .99, .44, .77, .66, .55],
    [.5, .5, 0, .5, 0, 1, 0, 1, 1],
    [0, .5, .5, 1, 0, .5, 1, 1, 0],
    // [1, 2, 3, 4, 5, 6, 7, 8, 9],
    // [1, 2, 4, 3, 5, 7, 6, 8, 9],
    // [1, 4, 7, 2, 5, 8, 3, 6, 9],
    // [1, 2, 3, 8, 9, 4, 7, 6, 5],
    // [4, 5, 1, 6, 2, 7, 3, 8, 9],
    // [1, 4, 6, 7, 2, 5, 9, 8, 3],
  ],
  blendmodes: [[
    { label:"Normal",       mode:"normal",       click: () => { blendMode(0)  } },
    { label:"Multiply",     mode:"multiply",     click: () => { blendMode(1)  } },
    { label:"Screen",       mode:"screen",       click: () => { blendMode(2)  } },
    { label:"Overlay",      mode:"overlay",      click: () => { blendMode(3)  } },
    { label:"Darken",       mode:"darken",       click: () => { blendMode(4)  } },
    { label:"Lighten",      mode:"lighten",      click: () => { blendMode(5)  } },
    { label:"Color-dodge",  mode:"color-dodge",  click: () => { blendMode(6)  } },
    { label:"Color-burn",   mode:"color-burn",   click: () => { blendMode(7)  } },
    { label:"Hard-light",   mode:"hard-light",   click: () => { blendMode(8)  } },
    { label:"Soft-light",   mode:"soft-light",   click: () => { blendMode(9)  } },
    { label:"Difference",   mode:"difference",   click: () => { blendMode(10) } },
    { label:"Exclusion",    mode:"exclusion",    click: () => { blendMode(11) } },
    { label:"Hue",          mode:"hue",          click: () => { blendMode(12) } },
    { label:"Saturation",   mode:"saturation",   click: () => { blendMode(13) } },
    { label:"Color",        mode:"color",        click: () => { blendMode(14) } },
    { label:"Luminosity",   mode:"luminosity",   click: () => { blendMode(15) } },
    { label:"Plus-darker",  mode:"plus-darker",  click: () => { blendMode(16) } },
    { label:"Plus-lighter", mode:"plus-lighter", click: () => { blendMode(17) } },
  ]],
  editorTabs: [
    {
      slot: 'bigText',
      icon: 'i-material-symbols-photo-library-outline-rounded',
      label: 'Título'
    },
    {
      slot: 'overlay',
      icon: 'i-material-symbols-format-color-fill',
      label: 'Estilo'
    },
  ]
}
const defaultSettings = {
  activeTab: 0,
  startbase64: testImage,
  photoAlign: 'object-center',
  frameSize: { label: "Square", x: 1080, y: 1080 },
  bgColor: { label: "Red", color: "red" },
  bgMatrix: config.matrices[1],
  bgBlendMode: "overlay",
  bgOpacity: 0.5,
  bigText: 'LINKED\nIN.',
  bigTextFont: { id: 'Alfa Slab One', label: 'Pesada', weight: '400' },
  bigTextSize: 40,
  bigTextLineHeight: 1,
  bigTextColor: { label: "Blanco", color: "white" },
  bigTextShadow: true,
  bigTextAlign: 'left',
  bigTextVerticalAlign: 'items-center',
}
const settings = useStorageAsync('linkedin-local-storage', defaultSettings)

const blendModeActive = useArrayFind(config.blendmodes[0], val => val.mode === settings.value.bgBlendMode)
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
function downloadPreview(area: HTMLElement, name: string): void {
  previewDownloading.value = true
  if (!debug) toJpeg(area, { quality: 0.95, pixelRatio: 2 })
  .then(function (dataUrl) {
    var link = document.createElement('a')
    link.download = name
    link.href = dataUrl
    link.click()
  })
  .finally(() => previewDownloading.value = false)
}
function blendMode(mode: number) {
  settings.value.bgBlendMode = config.blendmodes[0][mode].mode
}

const updateColor = computed(() => {
  return 'outline-2 hover:outline-dotted hover:outline-'+settings.value.bigTextColor.color
})

const paragraphs = computed(() => settings.value.bigText.split(/\n/))
// #endregion

onMounted(() => { nextTick(() => { loaded.value = true }) })
</script>

<template>
  <div class="flex flex-col items-center min-h-screen dark:bg-gray-950 pt-16 md:pt-32 pb-4">
    <Header />
    <!-- LOADING -->
    <div v-show="!loaded" class="h-96 w48 flex items-center justify-center">
      <UProgress animation="swing" size="xs" />
    </div>
    <Transition>
      <div v-show="loaded" class="flex flex-col gap-8">
        <!-- 9X9: -->
        <section
        id="previewArea"
       
        :style="`width: ${settings.frameSize.x/2}px; height: ${settings.frameSize.y/2}px;`"
        >
          <div ref="previewArea" class="w-full h-full flex relative" :class="settings.bigTextAlign, settings.bigTextVerticalAlign">
            <!-- GRADIENT -->
            <div
              class="w-full h-full absolute z-10 top-0 left-0 opacity-50"
              :style="`
                background-color: ${settings.bgColor.color};
                mix-blend-mode: ${settings.bgBlendMode};
                opacity: ${settings.bgOpacity};
              `"
            />
            <!-- BIG TEXT -->
            <UTextarea
              v-model="settings.bigText"
              variant="none"
              class="absolute w-full p-2 z-10"
              auroresize
              :rows="paragraphs.length"
              :style="`
                font-size: ${settings.bigTextSize}px;
                font-family: ${settings.bigTextFont.id};
                font-weight: ${settings.bigTextFont.weight || '400'};
                color: ${settings.bigTextColor.color};
                line-height: ${settings.bigTextSize * settings.bigTextLineHeight}px;
                text-align: ${settings.bigTextAlign};
                text-shadow: ${settings.bigTextShadow ? '1px 1px 1px #000' : 'none'}
              `"
              :ui="{ variant: { none: updateColor }, form: 'w-full overflow-hidden' }"
            />
            <!-- importante! ui para ocultar la barra de scroll -->

            <!-- IMAGE -->
            <img
            :src="settings.startbase64"
            alt="fondo-pieza"
            class="w-full h-full object-cover"
            :class="settings.photoAlign"
            >
          </div>
        </section>
        <!-- CONFIG and EXPORT: -->
        <section class="w-96 mx-auto lg:w-[36rem]">
          <!-- CONFIG: -->
          <section class="space-y-2">
            <UTabs
              :items="config.editorTabs"
              v-model="settings.activeTab"
              :ui="{ list: { background: 'bg-gray-100 dark:bg-gray-900', marker: { background: 'border-2 border-primary-400'}}}"
            >
              <template #default="{ item, selected }">
                <div class="flex items-center gap-1 truncate text-xs">
                  <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />
                  <span class="truncate">{{ item.label }}</span>
                  <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full" />
                </div>
              </template>
              <template #bigText>
                <UCard>
                  <div class="grid grid-cols-2 gap-2">
                    <UFormGroup label="Formato" size="xs" class="mb-2">
                      <UDropdown :items="config.socialSizes">
                        <UButton :label="settings.frameSize.label" trailing-icon="i-heroicons-chevron-up-20-solid" />
                        <template #item="{ item }">
                          <UButton color="white" variant="ghost" :label="item.label" @click="settings.frameSize = item" />
                        </template>
                      </UDropdown>
                    </UFormGroup>
                    <PhotoAlign v-model="settings.photoAlign" />
                  </div>
                  <template #footer>
                    <TextFormat
                      v-model:font="settings.bigTextFont"
                      v-model:size="settings.bigTextSize"
                      v-model:lineheight="settings.bigTextLineHeight"
                      v-model:color="settings.bigTextColor"
                      v-model:shadow="settings.bigTextShadow"
                      v-model:align="settings.bigTextAlign"
                      v-model:valign="settings.bigTextVerticalAlign"
                    />
                  </template>
                </UCard>
              </template>
              <template #overlay>
                <UCard>
                  <div class="space-y-4">
                      <div class="grid grid-cols-2 w-fit">
                        <ColorChooser v-model="settings.bgColor" />
                        <UFormGroup label="Combinación" size="xs">
                          <UDropdown :items="config.blendmodes" :popper="{ placement: 'auto' }" :ui="{ item: { size: 'text-xs' } }">
                            <UButton :label="blendModeActive?.label || 'Ninguno'" color="white" block :ui="{ rounded: 'rounded-l-none' }" />
                            <template #item="{ item }">
                              <span class="truncate" :class="{ 'text-primary': blendModeActive?.mode === item.mode }">{{ item.label }}</span>
                            </template>
                          </UDropdown>
                        </UFormGroup>
                      </div>
                      <UFormGroup label="Patrón" size="xs">
                        <UButtonGroup size="xs">
                          <UButton
                            :color="JSON.stringify(settings.bgMatrix) === JSON.stringify(config.matrices[0]) ? 'red' : 'white'"
                            @click="settings.bgMatrix = config.matrices[0]" variant="solid"
                            icon="i-mdi-view-sequential"
                          />
                          <UButton
                            :color="JSON.stringify(settings.bgMatrix) === JSON.stringify(config.matrices[1]) ? 'red' : 'white'"
                            @click="settings.bgMatrix = config.matrices[1]" variant="solid"
                            icon="i-mdi-slash-forward"
                          />
                          <UButton
                            :color="JSON.stringify(settings.bgMatrix) === JSON.stringify(config.matrices[2]) ? 'red' : 'white'"
                            @click="settings.bgMatrix = config.matrices[2]" variant="solid"
                            icon="i-mdi-view-column"
                          />
                          <UButton
                            :color="JSON.stringify(settings.bgMatrix) === JSON.stringify(config.matrices[3]) ? 'red' : 'white'"
                            @click="settings.bgMatrix = config.matrices[3]" variant="solid"
                            icon="i-typcn-spiral"
                          />
                          <UButton
                            :color="JSON.stringify(settings.bgMatrix) === JSON.stringify(config.matrices[4]) ? 'red' : 'white'"
                            @click="settings.bgMatrix = config.matrices[4]" variant="solid"
                            icon="i-mdi-slash-forward"
                          />
                          <UButton
                            :color="JSON.stringify(settings.bgMatrix) === JSON.stringify(config.matrices[5]) ? 'red' : 'white'"
                            @click="settings.bgMatrix = config.matrices[5]" variant="solid"
                            icon="i-tabler-backslash"
                          />
                        </UButtonGroup>
                      </UFormGroup>
                      <Opacity v-model="settings.bgOpacity" />
                  </div>
                </UCard>
              </template>
            </UTabs>
          </section>
          <!-- BUTTONS: -->
          <section class="pt-2 space-y-2 relative">
            <div class="grid grid-cols-2 gap-2">
              <UButton
                icon="i-heroicons-arrow-down-on-square-16-solid"
                size="md"
                @click="previewArea && downloadPreview(previewArea, filename+settings.frameSize.label)"
                :loading="previewDownloading"
              >
                DESCARGAR
              </UButton>
              <!-- INPUT IMAGE -->
              <div class="relative w-full">
                <input id="image_uploads"
                  type="file"
                  name="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  class="hidden"
                  @change="onFileInput"
                >
                <label
                  ref="dropZoneRef"
                  for="image_uploads"
                  class="flex w-full h-full items-center gap-2 px-2 cursor-pointer text-primary absolute border-dashed border-primary border-2 rounded-md"
                  :class="{'border-green-500 text-green-500': isOverDropZone }"
                >
                  <UIcon name="i-heroicons-arrow-up-on-square" class="w-5 h-5" />
                  <span class="text-sm uppercase">click o arrastra</span>
                </label>
              </div>
            </div>
          </section>
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