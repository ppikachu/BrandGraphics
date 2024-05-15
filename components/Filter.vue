<script lang="ts" setup>
const model = defineModel()
const open = ref(false)
defineProps({
  base64 : { type: String, default: '' },
})
const filtros = [
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
  <UPopover v-model:open="open" :popper="{ placement: 'top-start' }">
    <UButton
      icon="i-ri-camera-lens-fill"
      :label="filtros.find(f => f.class === model)?.label || 'None'"
      block
      variant="solid"
    />
    <template #panel>
      <UCard :ui="{ body: { base: 'grid grid-cols-4 lg:grid-cols-6 gap-2', padding: 'sm:p-2' } }">
        <UButton
          v-for="f, i in filtros"
          :key="i"
          size="xs"
          :color="model === filtros[i].class ? 'primary' : ''"
          @click="model = filtros[i].class"
          :ui="{ inline: 'flex flex-col gap-1', padding: { xs: 'px-0 pt-0 pb-0.5' } }"
        >
          <figure :class="f.class" class="w-full rounded overflow-hidden">
            <img :src="base64" :alt="f.label" class="object-cover h-10" />
          </figure>
          <div class="text-xs px-1" :class="{ 'text-white': f.label === 'black'}">{{ f.label }}</div>
        </UButton>
      </UCard>
    </template>
  </UPopover>
</UFormGroup>
</template>