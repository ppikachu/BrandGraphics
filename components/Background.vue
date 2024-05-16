<script lang="ts" setup>
import '~/assets/cssgram.min.css'
const { settings } = defineProps({ settings: Object })
</script>

<template>
  <figure class="w-full" :class="settings?.bgFilter">
    <img
      :src="settings?.startbase64"
      alt="fondo-pieza"
      :width="settings?.frameSize.x"
      :height="settings?.frameSize.y"
      class="object-cover"
      :class="settings?.photoAlign"
      :style="`
        object-position: 0 ${settings?.photoPosition}%;
        height: ${settings?.frameSize.y / settings?.frameSize.x * 384}px;
      `"
    >
  </figure>
</template>