<script lang="ts" setup>
const model: any = defineModel()
const sizes = [
  { spacing:  70, label: 'sm'},
  { spacing:  85, label: 'md'},
  { spacing: 150, label: 'lg'},
  { spacing: 200, label: 'xl'},
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