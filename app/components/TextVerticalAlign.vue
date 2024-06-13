<template>
  <UFormGroup label="Vertical" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-cols-3'} }">
      <UButton
        icon="i-heroicons-bars-arrow-up-16-solid"
        block
        @click="settings.bigTextVerticalAlign = 'items-start'"
        :class="settings.bigTextVerticalAlign === 'items-start' ? 'opacity-100' : 'opacity-50'"
      />
      <UButton
        icon="i-heroicons-bars-3-16-solid"
        block
        @click="settings.bigTextVerticalAlign = 'items-center'"
        :class="settings.bigTextVerticalAlign === 'items-center' ? 'opacity-100' : 'opacity-50'"
      />
      <UButton
        icon="i-heroicons-bars-arrow-down-16-solid"
        block
        @click="settings.bigTextVerticalAlign = 'items-end'"
        :class="settings.bigTextVerticalAlign === 'items-end' ? 'opacity-100' : 'opacity-50'"
      />
    </UButtonGroup>
  </UFormGroup>
</template>