<script lang="ts" setup>
const size = defineModel('size')
const align = defineModel('align')
const valign = defineModel('valign')
const iso = defineModel('iso')
// const font = defineModel('font')
const shadow = defineModel('shadow')
// const lineheight = defineModel('lineheight')
</script>

<template>
  <section class="space-y-2">
    <div class="grid grid-cols-2 gap-4">
      <IsoChooser />
      <TextSize v-model="size" />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <!-- BIG TEXT ALIGN -->
      <TextAlign v-model="align" />
      <!-- BIG TEXT VERTICAL ALIGN -->
      <TextVerticalAlign v-model="valign" />
    </div>
  </section>
</template>