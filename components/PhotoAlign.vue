<script lang="ts" setup>
const model: any = defineModel()
</script>

<template>
  <UFormGroup label="Crop" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-cols-3'} }">
      <UButton
        @click="model = 'object-right-top'"
        icon="i-mdi-arrow-collapse-down"
        block
        :class="model === 'object-right-top' ? 'opacity-100' : 'opacity-50'"
      />
      <UButton
        @click="model = 'object-center'"
        icon="i-mdi-arrow-collapse-vertical"
        block
        :class="model === 'object-center' ? 'opacity-100' : 'opacity-50'"
      />
      <UButton
        @click="model = 'object-left-bottom'"
        icon="i-mdi-arrow-collapse-up"
        block
        :class="model === 'object-left-bottom' ? 'opacity-100' : 'opacity-50'"
      />
    </UButtonGroup>
  </UFormGroup>
</template>