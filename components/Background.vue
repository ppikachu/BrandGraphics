<script lang="ts" setup>
import '~/assets/cssgram.min.css'
const props = defineProps({ settings: Object })
const dropZoneRef = ref<HTMLDivElement>()
const previewArea = ref<HTMLElement>()
const textArea = ref<HTMLElement>()
const { height: heightTextArea } = useElementSize(textArea)
const { height: heightPreviewArea } = useElementSize(previewArea)
const { isOverDropZone } = useDropZone(dropZoneRef, { onDrop, dataTypes: ['image/jpeg', 'image/png'] })
const file = shallowRef()
const filename = ref('test')

/**
 * Reset the photo position to the center.
 */
function resetPhoto() {
  props.settings!.photoPosition = 50
}

/**
 * Handle file input event to set the base64 value in settings and reset the photo position.
 *
 * @param {Event} e - The event object containing file input details.
 * @return {void} This function does not return anything.
 */
function onFileInput(e: Event): void {
  const { base64: fileBase64 } = useBase64((e.target as HTMLInputElement).files![0])
  props.settings!.startbase64 = fileBase64 as unknown as string
  resetPhoto()
}
/**
 * Handle the drop event when files are dropped on the zone.
 *
 * @param {File[] | null} files - The array of files dropped or null.
 * @return {void} This function does not return anything.
 */
function onDrop(files: File[] | null): void {
  if (files) {
    file.value = files[0]
    filename.value = file.value.name
    const { base64: fileBase64 } = useBase64(files[0] )
    props.settings!.startbase64 = fileBase64 as unknown as string
    resetPhoto()
  }
}

const isoAlign = computed(() => {
  switch (props.settings?.bigTextAlign) {
    case 'left':
      return 'self-start'
    case 'center':
      return 'self-center'
    case 'right':
      return 'self-end'
  }
})
const isoRelativeSize = 1.5
const isoSize = computed(() => {
  const size = props.settings?.bigTextSize
  return 'width: ' + size * isoRelativeSize + 'px; height: ' + size * isoRelativeSize + 'px;'
})
const textPadding = computed(() => {
  if (props.settings?.bigTextAlign === 'left') return 'pr-6'
  if (props.settings?.bigTextAlign === 'right') return 'pl-6'
})
</script>

<template>
  <div class="mx-auto w-96 relative" :class="{'border-red-500 border-2': heightTextArea > heightPreviewArea }">

      <div id="previewArea" ref="previewArea"
        :class="settings?.bgFilter"
      >
        <img
          :src="settings?.startbase64"
          alt="fondo-pieza"
          class="object-cover"
          :style="`
            width: 384px;
            height: ${settings?.frameSize.y / settings?.frameSize.x * 384}px;
            object-position: ${settings?.photoPosition}% ${settings?.photoPosition}%;
            transform: ${settings?.bgFlip ? 'scaleX(-1)' : 'scaleX(1)'};
          `"
        >
      </div>

      <!-- OVER IMAGE -->
      <div id="textArea" ref="textArea" class="absolute top-0 flex w-full min-h-full" :class="settings?.bigTextVerticalAlign">
        <div class="p-4 w-full">
          <div class="flex flex-col gap-2">
            <!-- ISO -->
            <div v-if="settings?.iso" :style="isoSize" :class="isoAlign">
              <nuxt-icon :name="settings?.iso" filled class="shadow" />
            </div>
            <!-- BIG TEXT -->
            <div
              class="Jura"
              :class=textPadding
              :style="`
                font-size: ${settings?.bigTextSize}px;
                line-height: ${settings?.bigTextSize}px;
                text-align: ${settings?.bigTextAlign};
              `"
            >
              {{ settings?.bigText }}
            </div>
          </div>
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
          class="group absolute flex w-full h-full cursor-pointer items-center justify-center hover:outline-dashed outline-offset-4 outline-primary outline-2 rounded"
          :class="{'outline-dashed outline-green-500': isOverDropZone }"
        >
          <div class="hidden group-hover:flex z-20 bg-primary rounded px-2 py-1 space-x-1 max-w-80">
            <UIcon name="i-heroicons-arrow-up-on-square" class="w-5 h-5 flex-shrink-0" />
            <span class="text-sm uppercase">click (or drop) to choose image</span>
          </div>
        </label>
      </div>
  </div>

  <UAlert
    v-if="heightTextArea > heightPreviewArea"
    description="Text exceeds preview area. Shorten text or reduce font size."
    icon="i-mdi-alert"
    color="yellow"
    class="my-4 z-20"
  />
</template>

<style>
.flip-horizontally {
  transform: scaleX(-1);
}

.Jura {
  white-space: pre-line;
  font-family: "Jura";
  color: white;
  font-weight: 700;
  text-shadow: 1px 1px 1px black;
}
.shadow {
  filter: drop-shadow( 1px 1px 1px black);
  -webkit-filter: drop-shadow( 1px 1px 1px black);
}
</style>