<script lang="ts" setup>
const model: any = defineModel()
</script>

<template>
  <UFormGroup label="Alineación" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-flow-col-dense'} }">
      <UButton :color="model === 'left' ? 'red' : 'white'"
        @click="model = 'left'" variant="solid"
        icon="i-heroicons-bars-3-bottom-left-16-solid"
        :ui="{ inline: 'justify-center' }"
      />
      <UButton :color="model === 'center' ? 'red' : 'white'"
        @click="model = 'center'" variant="solid"
        icon="i-heroicons-bars-3-16-solid"
        :ui="{ inline: 'justify-center' }"
      />
      <UButton :color="model === 'right' ? 'red' : 'white'"
        @click="model = 'right'" variant="solid"
        icon="i-heroicons-bars-3-bottom-right-16-solid"
        :ui="{ inline: 'justify-center' }"
      />
    </UButtonGroup>
  </UFormGroup>
</template>