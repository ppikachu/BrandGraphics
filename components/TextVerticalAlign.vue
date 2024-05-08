<script lang="ts" setup>
const model: any = defineModel()
</script>

<template>
  <UFormGroup label="Vertical" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-flow-col-dense'} }">
      <UButton :color="model === 'items-start'   ? 'blue' : 'white'"
        @click="model = 'items-start'" variant="solid"
        icon="i-heroicons-bars-arrow-up-16-solid"
        :ui="{ inline: 'justify-center' }"
      />
      <UButton :color="model === 'items-center' ? 'blue' : 'white'"
        @click="model = 'items-center'" variant="solid"
        icon="i-heroicons-bars-3-16-solid"
        :ui="{ inline: 'justify-center' }"
      />
      <UButton :color="model === 'items-end'  ? 'blue' : 'white'"
        @click="model = 'items-end'" variant="solid"
        icon="i-heroicons-bars-arrow-down-16-solid"
        :ui="{ inline: 'justify-center' }"
      />
    </UButtonGroup>
  </UFormGroup>
</template>