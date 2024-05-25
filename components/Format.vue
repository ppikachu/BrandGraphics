<script lang="ts" setup>
const model: any = defineModel()
// linkedInSizes from google ai
const socialSizes = [[
  { label: "Square Post 1080x1080",   x: 1080, y: 1080 },
  { label: "Portrait Post 1920x1080", x: 1920, y: 1080 },
]]
</script>

<template>
  <UDropdown :items="socialSizes" :ui="{ wrapper: 'w-full', width: 'w-auto' }">
    <UButton :label="model.label" trailing-icon="i-heroicons-chevron-up-20-solid" block />
    <template #item="{ item }">
      <span :class="{ 'text-primary': model.label === item.label }" @click="model = item">
        {{ item.label }}
      </span>
    </template>
  </UDropdown>
</template>