<script lang="ts" setup>
const model = defineModel()
</script>

<template>
  <UFormGroup label="Flip" size="xs">
    <UButton
      label="Flip"
      icon="i-mdi-flip-horizontal"
      block
      :class="model ? 'opacity-100' : 'opacity-50'"
      @click="model = !model"
    />
  </UFormGroup>
</template>