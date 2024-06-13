<template>
  <ClientOnly>
    <UFormGroup :label="$t('crop')" size="xs">
      <URange
        v-model="settings.photoPosition"
        :min="0"
        :max="100"
        size="sm"
        class="mt-4"
        :ui="{ progress: { background: 'bg-blue-50 dark:bg-blue-950'}, track: { background: '[&::-webkit-slider-runnable-track]:dark:bg-gray-900 [&::-moz-range-track]:dark:bg-gray-900'} }"
      />
    </UFormGroup>
  </ClientOnly>
</template>