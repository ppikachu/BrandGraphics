<script lang="ts" setup>
const model: any = defineModel()
</script>

<template>
  <UFormGroup label="Align" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-cols-3'} }">
      <UButton
        icon="i-heroicons-bars-3-bottom-left-16-solid"
        block
        @click="model = 'left'"
        :class="model === 'left' ? 'opacity-100' : 'opacity-50'"
      />
      <UButton
        icon="i-heroicons-bars-3-16-solid"
        block
        @click="model = 'center'"
        :class="model === 'center' ? 'opacity-100' : 'opacity-50'"
      />
      <UButton
        icon="i-heroicons-bars-3-bottom-right-16-solid"
        block
        @click="model = 'right'"
        :class="model === 'right' ? 'opacity-100' : 'opacity-50'"
      />
    </UButtonGroup>
  </UFormGroup>
</template>