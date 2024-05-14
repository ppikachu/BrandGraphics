<script lang="ts" setup>
const model: any = defineModel()
const open = ref(false)

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
  <UDivider label="Filter" class="pt-4" />
  <UPopover v-model:open="open" :popper="{ placement: 'top-start' }">
    <UButton
      icon="i-ri-camera-lens-fill"
      :label="filtros.find(f => f.class === model)?.label || 'None'"
      block
      variant="solid"
    />
    <template #panel>
      <UCard :ui="{ body: { padding: 'sm:p-2' } }">
        <div class="grid grid-cols-3 gap-2">
          <UButton
            v-for="f, i in filtros"
            block
            :color="model === filtros[i].class ? 'primary' : ''"
            @click="model = filtros[i].class"
          >
            <span class="text-xs px-1" :class="{ 'text-white': f.label === 'black'}">{{ f.label }}</span>
          </UButton>
        </div>
      </UCard>
    </template>
  </UPopover>
</template>