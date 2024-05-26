<script lang="ts" setup>
const model: any = defineModel()
const selectedFormat = ref(1)

const socialSizes = [[
  { label: "Linkedin Square Post",         x: 1080, y: 1080, click: () => selectedFormat.value = 0 },
  { label: "Linkedin Article",             x: 1920, y: 1080, click: () => selectedFormat.value = 1 },
  { label: "Facebook Business Page Cover", x: 1200, y:  674, click: () => selectedFormat.value = 2 },
  { label: "Facebook Story",               x: 1080, y: 1920, click: () => selectedFormat.value = 3 },
]]

watch(() => selectedFormat.value, () => {
  model.value = socialSizes[0][selectedFormat.value]
})
</script>

<template>
  <UDivider :label="$t('formatAndImage')" />
  <UDropdown :items="socialSizes" :ui="{ wrapper: 'w-full', width: 'w-auto' }">
    <UButton :label="model.label + ' (' + model.x + 'x' + model.y + ')'" trailing-icon="i-heroicons-chevron-up-20-solid" block />
    <template #item="{ item }">
      <span :class="{ 'text-primary': model.label === item.label }">
        {{ item.label }}
      </span>
    </template>
  </UDropdown>
</template>