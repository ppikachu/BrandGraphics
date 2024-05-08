<script lang="ts" setup>
const model: any = defineModel()
</script>

<template>
  <UFormGroup label="Align" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-flow-col-dense'} }">
      <UButton :color="model === 'left' ? 'blue' : 'white'"
        @click="model = 'left'" variant="solid"
        icon="i-heroicons-bars-3-bottom-left-16-solid"
        :ui="{ inline: 'justify-center' }"
      />
      <UButton :color="model === 'center' ? 'blue' : 'white'"
        @click="model = 'center'" variant="solid"
        icon="i-heroicons-bars-3-16-solid"
        :ui="{ inline: 'justify-center' }"
      />
      <UButton :color="model === 'right' ? 'blue' : 'white'"
        @click="model = 'right'" variant="solid"
        icon="i-heroicons-bars-3-bottom-right-16-solid"
        :ui="{ inline: 'justify-center' }"
      />
    </UButtonGroup>
  </UFormGroup>
</template>