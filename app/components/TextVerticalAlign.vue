<script lang="ts" setup>
const model: any = defineModel()
</script>

<template>
  <UFormGroup label="Vertical" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-cols-3'} }">
      <UButton
        icon="i-heroicons-bars-arrow-up-16-solid"
        block
        @click="model = 'items-start'"
        :class="model === 'items-start' ? 'opacity-100' : 'opacity-50'"
      />
      <UButton
        icon="i-heroicons-bars-3-16-solid"
        block
        @click="model = 'items-center'"
        :class="model === 'items-center' ? 'opacity-100' : 'opacity-50'"
      />
      <UButton
        icon="i-heroicons-bars-arrow-down-16-solid"
        block
        @click="model = 'items-end'"
        :class="model === 'items-end' ? 'opacity-100' : 'opacity-50'"
      />
    </UButtonGroup>
  </UFormGroup>
</template>