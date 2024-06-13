<script lang="ts" setup>
import '~/assets/cssgram.min.css'
const previewArea = ref<HTMLElement>()
const textArea = ref<HTMLElement>()
const { width: widthTextArea, height: heightText } = useElementSize(textArea)
const { height: heightPreviewArea } = useElementSize(previewArea)
const isoRelativeSize = .005
const textRelativeSize = .004
const paddingRelativeSize = .05

const aspectRatio = computed(() => {
  return socialSizes.find((f: FrameSize) => f.id === settings.frameSize)?.x + '/' + socialSizes.find((f: FrameSize) => f.id === settings.frameSize)?.y
})

const padding = computed(() => {
  return 'padding: ' + widthTextArea.value * paddingRelativeSize + 'px;'
})

const isoSize = computed(() => {
  const size = settings.bigTextSize * widthTextArea.value * isoRelativeSize
  return 'width: ' + size + 'px; height: ' + size + 'px;'
})
const isoAlign = computed(() => {
  switch (settings.bigTextAlign) {
    case 'left':
      return 'self-start'
    case 'center':
      return 'self-center'
    case 'right':
      return 'self-end'
  }
})

const textSize = computed(() => {
  return settings.bigTextSize * widthTextArea.value * textRelativeSize + 'px'
})
/**
 * Checks if the height of the text area exceeds the height of the preview area.
 * If it does, it updates the height of the text area and returns true. Otherwise, it returns false.
 * @return {boolean} Whether the height of the text area exceeds the height of the preview area.
 */
const overflownText = computed(() => {
  // Check if the height of the text area exceeds the height of the preview area
  const overHeight = heightText.value > heightPreviewArea.value
  // update the height of the text area and return true/false
  heightTextArea.value = heightText.value
  return overHeight
})
const textPadding = computed(() => {
  if (settings.bigTextAlign === 'left') return 'padding-right: ' + widthTextArea.value * paddingRelativeSize + 'px;'
  if (settings.bigTextAlign === 'right') return 'padding-left: ' + widthTextArea.value * paddingRelativeSize + 'px;'
})
</script>

<template>
  <div ref="previewArea" class="relative overflow-hidden" :class="overflownText ? 'border-yellow-500 border-b-2 border-dashed' : 'border-white dark:border-gray-950'">
    <div :class="settings.bgFilter" class="transition-all" :style="`transform: ${settings.bgFlip ? 'scaleX(-1)' : 'scaleX(1)'};`">
      <img
        :src="settings.startbase64"
        alt="fondo-pieza"
        class="object-cover transition-all"
        :style="`
          aspect-ratio: ${aspectRatio};
          object-position: ${settings.photoPosition}% ${settings.photoPosition}%;
        `"
      >
    </div>
    <!-- OVER IMAGE -->
    <div ref="textArea" :class="settings.bigTextVerticalAlign" class="absolute top-0 flex w-full min-h-full transition">
      <div class="flex flex-col gap-2 w-full" :style="padding">
        <!-- ISO -->
        <div v-if="settings.iso !== 1" :style="isoSize" :class="isoAlign">
          <nuxt-icon :name="graphics.find((f: Graphic) => f.id === settings.iso)?.svg || ''" filled class="shadow" />
        </div>
        <!-- BIG TEXT -->
        <div class="text-preview" :class=textPadding
          :style="`
            font-size: ${textSize};
            line-height: ${textSize};
            text-align: ${settings.bigTextAlign};
            ${textPadding};
          `"
        >
          {{ settings.bigText }}
        </div>
      </div>
    </div>

    <Transition name="fade" :duration="200">
      <div v-show="overflownText" class="absolute top-0 p-4 flex items-center justify-center w-full h-full">
        <UAlert
          :description="$t('text_warning')"
          icon="i-mdi-alert"
          class="max-w-96"
          color="yellow"
        />
    </div>
    </Transition>

  </div>
</template>