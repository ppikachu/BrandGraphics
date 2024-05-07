<script lang="ts" setup>
const model: any = defineModel()
const sizes = [
  { size: 20, label: 'sm'},
  { size: 40, label: 'md'},
  { size: 60, label: 'lg'},
  // { size: 85, label: 'xl'},
]
</script>

<template>
  <UFormGroup label="Size" size="xs">
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