<script lang="ts" setup>
const model = defineModel()
</script>

<template>
  <UFormGroup :label="$t('flip')" size="xs">
    <UButton
      :label="model ? $t('yes') : 'No'"
      icon="i-mdi-flip-horizontal"
      block
      :class="model ? 'opacity-100' : 'opacity-50'"
      @click="model = !model"
    />
  </UFormGroup>
</template>