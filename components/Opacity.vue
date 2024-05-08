<script lang="ts" setup>
const model: any = defineModel()
const sizes = [
  { id: 0.00, label: '0%'},
  { id: 0.25, label: '25%'},
  { id: 0.50, label: '50%'},
  { id: 0.75, label: '75%'},
  { id: 1.00, label: '100%'},
]
</script>

<template>
  <UFormGroup label="Opacity" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-cols-5'} }">
      <UButton
        v-for="s in sizes"
        :color="model === s.id ? 'blue' : 'white'"
        @click="model = s.id"
        variant="solid"
        :label="s.label"
        :ui="{ inline: 'justify-center' }"
      />
    </UButtonGroup>
  </UFormGroup>
</template>