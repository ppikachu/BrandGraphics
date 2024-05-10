<script lang="ts" setup>
const model: any = defineModel()
</script>

<template>
  <UFormGroup label="Crop" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-cols-3'} }">
      <UButton
        @click="model = 'object-right-top'"
        icon="i-heroicons-bars-3-bottom-right-16-solid"
        block
        :class="model === 'object-right-top' ? 'opacity-100' : 'opacity-50'"
      />
      <UButton
        @click="model = 'object-center'"
        icon="i-heroicons-bars-3-16-solid"
        block
        :class="model === 'object-center' ? 'opacity-100' : 'opacity-50'"
      />
      <UButton
        @click="model = 'object-left-bottom'"
        icon="i-heroicons-bars-3-bottom-left-16-solid"
        block
        :class="model === 'object-left-bottom' ? 'opacity-100' : 'opacity-50'"
      />
    </UButtonGroup>
  </UFormGroup>
</template>