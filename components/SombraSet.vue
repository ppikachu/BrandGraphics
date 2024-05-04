<script lang="ts" setup>
const model: any = defineModel()
</script>

<template>
  <UFormGroup label="Sombra" size="xs">
    <UButton
      icon="i-heroicons-square-2-stack-solid"
      :color="model ? 'red' : 'white'"
      @click="model = !model"
      block
      :ui="{ rounded: 'rounded-l-none' }"
    />
  </UFormGroup>
</template>

<style>
.textshadow {
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}
</style>