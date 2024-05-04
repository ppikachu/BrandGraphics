<script lang="ts" setup>
const font = defineModel('font')
const color = defineModel('color')
const shadow = defineModel('shadow')
const align = defineModel('align')
const valign = defineModel('valign')
const size = defineModel('size')
const lineheight = defineModel('lineheight')
</script>

<template>
  <section class="grid grid-cols-2 lg:grid-cols-4 gap-2">
    <FontChooser v-model="font" />
    <div class="grid grid-cols-2">
      <ColorChooser v-model="color"/>
      <SombraSet v-model="shadow"/>
    </div>
    <section class="col-span-2 lg:col-span-2 grid grid-cols-2 gap-2">
        <!-- BIG TEXT ALIGN -->
        <TextAlign v-model="align" />
        <!-- BIG TEXT VERTICAL ALIGN -->
        <TextVerticalAlign v-model="valign" />
    </section>
    <div class="col-span-2 lg:col-span-4 grid grid-cols-2 gap-2">
      <TextSize v-model="size" />
      <TextSpacing v-model="lineheight" />
    </div>
  </section>
</template>