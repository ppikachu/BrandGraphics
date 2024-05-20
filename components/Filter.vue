<script lang="ts" setup>
const model = defineModel()
const open = ref(false)
defineProps({
  base64 : { type: String, default: '' },
  position: { type: Number, default: 50 },
  frameSize: { type: Object, default: { label: "Portrait Post 1920x1080", x: 1920, y: 1080 } }
})
const filtros = [
{ label: "Normal", class: "" },
{ label: "1977", class: "_1977" },
{ label: "Aden", class: "aden" },
{ label: "Brannan", class: "brannan" },
{ label: "Brooklyn", class: "brooklyn" },
{ label: "Clarendon", class: "clarendon" },
{ label: "Earlybird", class: "earlybird" },
{ label: "Gingham", class: "gingham" },
{ label: "Hudson", class: "hudson" },
{ label: "Inkwell", class: "inkwell" },
{ label: "Kelvin", class: "kelvin" },
{ label: "Lark", class: "lark" },
{ label: "Lo-Fi", class: "lofi" },
{ label: "Maven", class: "maven" },
{ label: "Mayfair", class: "mayfair" },
{ label: "Moon", class: "moon" },
{ label: "Nashville", class: "nashville" },
{ label: "Perpetua", class: "perpetua" },
{ label: "Reyes", class: "reyes" },
{ label: "Rise", class: "rise" },
{ label: "Slumber", class: "slumber" },
{ label: "Stinson", class: "stinson" },
{ label: "Toaster", class: "toaster" },
{ label: "Valencia", class: "valencia" },
{ label: "Walden", class: "walden" },
{ label: "Willow", class: "willow" },
{ label: "X-pro II", class: "xpro2" }
]
</script>

<template>
  <UFormGroup label="Filter" size="xs">
  <UPopover overlay v-model:open="open" :popper="{ placement: 'bottom' }" :ui="{ base: 'overflow-y-auto max-h-96 lg:max-h-none', }">
    <UButton
      icon="i-ri-camera-lens-fill"
      :label="filtros.find(f => f.class === model)?.label || 'None'"
      block
    />
    <template #panel>
      <UCard :ui="{ body: { base: 'grid grid-cols-4 lg:grid-cols-7 gap-2', padding: 'sm:p-2' } }">
        <UButton
          v-for="f, i in filtros"
          :key="i"
          size="xs"
          :color="model === filtros[i].class ? 'primary' : 'black'"
          @click="model = filtros[i].class, open = false"
          :ui="{ inline: 'flex flex-col gap-1', padding: { xs: 'px-0 pt-0 pb-0.5' } }"
        >
          <figure :class="f.class" class="w-[74px] rounded overflow-hidden">
            <img
              :src="base64"
              :alt="f.label"
              class="object-cover w-full h-10"
              :style="`
                object-position: ${position}% ${position}%;
                height: ${frameSize.y / frameSize.x * 74}px;
              `"
            />
          </figure>
          <div class="text-xs px-0.5" :class="{ 'text-white': f.label === 'black'}">{{ f.label }}</div>
        </UButton>
      </UCard>
    </template>
  </UPopover>
</UFormGroup>
</template>