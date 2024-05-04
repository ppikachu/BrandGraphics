<script lang="ts" setup>
const model: any = defineModel()
const sizes = [
  { size: 100, label: 'sm'},
  { size: 150, label: 'md'},
  { size: 250, label: 'lg'},
  { size: 450, label: 'xl'},
]
</script>

<template>
  <UFormGroup label="Tamaño" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-flow-col-dense'} }">
      <UButton
        v-for="s in sizes"
        :color="model === s.size ? 'red' : 'white'"
        @click="model = s.size"
        variant="solid"
        :label="s.label"
        :ui="{ inline: 'justify-center' }"
      />
    </UButtonGroup>
  </UFormGroup>
</template>