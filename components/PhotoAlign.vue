<script lang="ts" setup>
const model: any = defineModel()
</script>

<template>
  <UFormGroup label="Encuadre" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-flow-col-dense'} }">
      <UButton :color="model === 'object-right-top' ? 'red' : 'white'"
        @click="model = 'object-right-top'" variant="solid"
        icon="i-heroicons-bars-3-bottom-right-16-solid"
        :ui="{ inline: 'justify-center' }"
      />
      <UButton :color="model === 'object-center' ? 'red' : 'white'"
        @click="model = 'object-center'" variant="solid"
        icon="i-heroicons-bars-3-16-solid"
        :ui="{ inline: 'justify-center' }"
      />
      <UButton :color="model === 'object-left-bottom' ? 'red' : 'white'"
        @click="model = 'object-left-bottom'" variant="solid"
        icon="i-heroicons-bars-3-bottom-left-16-solid"
        :ui="{ inline: 'justify-center' }"
      />
    </UButtonGroup>
  </UFormGroup>
</template>