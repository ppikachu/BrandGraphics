<script lang="ts" setup>
const model: any = defineModel()
// linkedInSizes from google ai
const socialSizes = [[
  { label: "Square 1080x1080",          x: 1080, y: 1080 },
  { label: "Landscape 1200x627",        x: 1200, y:  627 },
  { label: "Portrait 627x1200",         x:  627, y: 1200 },
  { label: "Article featured 1200x644", x: 1200, y:  644 },
  { label: "Article banner 600x322",    x:  600, y:  322 },
  { label: "Blog post link 1200x627",   x: 1200, y:  627 },
  { label: "Profile photo 400x400",     x:  400, y:  400 },
  { label: "Cover photo 1128x191",      x: 1128, y:  191 },
]]
</script>

<template>
  <UFormGroup label="Format" size="xs">
    <UDropdown :items="socialSizes" :ui="{ wrapper: 'w-full', width: 'w-auto' }">
      <UButton :label="model.label" trailing-icon="i-heroicons-chevron-up-20-solid" block />
      <template #item="{ item }">
        <UButton color="white" variant="ghost" :label="item.label" @click="model = item" />
      </template>
    </UDropdown>
  </UFormGroup>
</template>