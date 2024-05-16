<script lang="ts" setup>
const model: any = defineModel()
</script>

<template>
  <UFormGroup label="Crop" size="xs">
    <URange v-model="model" :min="0" :max="100" :step="1" size="md" class="mt-3" />
  </UFormGroup>
</template>