<script lang="ts" setup>
const size = defineModel('size')
const color = defineModel('color')
const align = defineModel('align')
const valign = defineModel('valign')
const iso = defineModel('iso')
// const font = defineModel('font')
// const shadow = defineModel('shadow')
// const lineheight = defineModel('lineheight')
</script>

<template>
  <UDivider label="Text" />
  <section class="space-y-2">
    <!-- <FontChooser v-model="font" /> -->
    <div class="grid grid-cols-2 gap-4">
      <div class="grid grid-cols-2 gap-2">
        <ColorChooser v-model="color" position="center"/>
        <IsoChooser v-model="iso" />
      </div>
      <!-- <SombraSet v-model="shadow"/> -->
      <TextSize v-model="size" />
    </div>
    <section class="grid grid-cols-2 gap-4">
        <!-- BIG TEXT ALIGN -->
        <TextAlign v-model="align" />
        <!-- BIG TEXT VERTICAL ALIGN -->
        <TextVerticalAlign v-model="valign" />
    </section>
  </section>
</template>