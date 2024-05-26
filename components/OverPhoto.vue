<script lang="ts" setup>
import '~/assets/cssgram.min.css'
const props = defineProps({ settings: Object })
const model = defineModel()
const previewArea = ref<HTMLElement>()
const textArea = ref<HTMLElement>()
const { width: widthTextArea, height: heightTextArea } = useElementSize(textArea)
const { height: heightPreviewArea } = useElementSize(previewArea)

function format() {
  //HACK: heavily hardcoded! needs to be fixed for other formats
  return props.settings?.frameSize.x === 1920 ? 'aspect-video' : 'aspect-square'
}
const isoRelativeSize = .005
const textRelativeSize = .004
const paddingRelativeSize = .05

const isoSize = computed(() => {
  const size = props.settings?.bigTextSize * widthTextArea.value * isoRelativeSize
  return 'width: ' + size + 'px; height: ' + size + 'px;'
})
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
function textSize() {
  return props.settings?.bigTextSize * widthTextArea.value * textRelativeSize + 'px'
}
const overflownText = computed(() => {
  const overHeight = heightTextArea.value > heightPreviewArea.value
  model.value = !overHeight
  return overHeight
})
const padding = computed(() => {
  return 'padding: ' + widthTextArea.value * paddingRelativeSize + 'px;'
})
const textPadding = computed(() => {
  if (props.settings?.bigTextAlign === 'left') return 'padding-right: ' + widthTextArea.value * paddingRelativeSize + 'px;'
  if (props.settings?.bigTextAlign === 'right') return 'padding-left: ' + widthTextArea.value * paddingRelativeSize + 'px;'
})
</script>

<template>
  <div ref="previewArea" class="relative overflow-hidden border-b-2 border-dashed" :class="overflownText ? 'border-yellow-500' : 'border-gray-950'">
    <div :class="settings?.bgFilter">
      <img
        :src="settings?.startbase64"
        alt="fondo-pieza"
        class="object-cover"
        :class="format()"
        :style="`
          object-position: ${settings?.photoPosition}% ${settings?.photoPosition}%;
          transform: ${settings?.bgFlip ? 'scaleX(-1)' : 'scaleX(1)'};
        `"
      >
    </div>
    <!-- OVER IMAGE -->
    <div ref="textArea" :class="settings?.bigTextVerticalAlign" class="absolute top-0 flex w-full min-h-full transition">
      <div class="flex flex-col gap-2 w-full" :style="padding">
        <!-- ISO -->
        <div v-if="settings?.iso" :style="isoSize" :class="isoAlign">
          <nuxt-icon :name="settings?.iso" filled class="shadow" />
        </div>
        <!-- BIG TEXT -->
        <div class="Jura" :class=textPadding
          :style="`
            font-size: ${textSize()};
            line-height: ${textSize()};
            text-align: ${settings?.bigTextAlign};
            ${textPadding};
          `"
        >
          {{ settings?.bigText }}
        </div>
      </div>
    </div>

    <Transition :duration="200">
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

<style>
.flip-horizontally {
  transform: scaleX(-1);
}

.Jura {
  white-space: pre-line;
  overflow-wrap: break-word;
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