<script lang="ts" setup>
const settings = useStorageAsync('presets-storage', defaultPresets)
const preset = ref('preset 1')
</script>

<template>
  <UFormGroup label="Logo" size="xs">
    <USelectMenu
      v-model="preset"
      value-attribute="name"
      selected-icon="i-ci-dot-03-m"
      :options="settings"
    />
  </UFormGroup>
</template>