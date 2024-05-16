<script lang="ts" setup>
import '~/assets/cssgram.min.css'
defineProps({ settings: Object })
</script>

<template>
  <div :class="settings?.bgFilter" >
    <img
      :src="settings?.startbase64"
      alt="fondo-pieza"
      class="object-cover"
      :style="`
        width: 384px;
        height: ${settings?.frameSize.y / settings?.frameSize.x * 384}px;
        object-position: ${settings?.photoPosition}% ${settings?.photoPosition}%;
      `"
    >
  </div>
</template>