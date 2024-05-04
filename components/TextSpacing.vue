<script lang="ts" setup>
const model: any = defineModel()
const sizes = [
  { spacing:  .80, label: 'sm'},
  { spacing: 1.00, label: 'md'},
  { spacing: 1.50, label: 'lg'},
  { spacing: 2.00, label: 'xl'},
]
</script>

<template>
  <UFormGroup label="Espaciado" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-flow-col-dense'} }">
      <UButton
        v-for="s in sizes"
        :color="model === s.spacing ? 'red' : 'white'"
        @click="model = s.spacing"
        variant="solid"
        :label="s.label"
        :ui="{ inline: 'justify-center' }"
      />
    </UButtonGroup>
  </UFormGroup>
</template>