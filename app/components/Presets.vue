<script lang="ts" setup>
const preset = ref('preset 1')

watch (preset, () => {
  // localStorage.setItem('brand-local-storage', settingsPresets.find((s: Settings) => s.label === preset.value)?.preset)
  for (const key in settings) {
    if (settings.hasOwnProperty(key)) {
      const newKey = settingsPresets.find((s: Settings) => s.label === preset.value)[key] || key
      settings[newKey] = settingsPresets.find((s: Settings) => s.label === preset.value)?[key]
    }
  }
})
</script>

<template>
  <UFormGroup label="Presets" size="xs">
    <USelectMenu
      v-model="preset"
      value-attribute="label"
      selected-icon="i-ci-dot-03-m"
      :options="settingsPresets"
    />
  </UFormGroup>
</template>