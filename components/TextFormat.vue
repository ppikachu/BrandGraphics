<script lang="ts" setup>
// const font = defineModel('font')
const size = defineModel('size')
const color = defineModel('color')
const shadow = defineModel('shadow')
const align = defineModel('align')
const valign = defineModel('valign')
const iso = defineModel('iso')
// const lineheight = defineModel('lineheight')
</script>

<template>
  <UDivider label="Texto" />
  <section class="space-y-2">
    <!-- <FontChooser v-model="font" /> -->
    <div class="grid grid-cols-2 gap-2">
      <div class="grid grid-cols-2 gap-2">
        <ColorChooser v-model="color" position="center"/>
        <IsoChooser v-model="iso" />
      </div>
      <!-- <SombraSet v-model="shadow"/> -->
      <TextSize v-model="size" />
    </div>
    <section class="grid grid-cols-2 gap-2">
        <!-- BIG TEXT ALIGN -->
        <TextAlign v-model="align" />
        <!-- BIG TEXT VERTICAL ALIGN -->
        <TextVerticalAlign v-model="valign" />
    </section>
  </section>
</template>