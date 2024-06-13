<script lang="ts" setup>
const sizes = [
  { size: 12, label: 'sm'},
  { size: 20, label: 'md'},
  { size: 32, label: 'lg'},
  // { size: 85, label: 'xl'},
]
</script>

<template>
  <UFormGroup :label="$t('size')" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-cols-3'} }">
      <UButton
        v-for="s in sizes"
        block
        :label="s.label"
        @click="settings.bigTextSize = s.size"
        :class="settings.bigTextSize === s.size ? 'opacity-100' : 'opacity-50'"
      />
    </UButtonGroup>
  </UFormGroup>
</template>