<template>
  <UFormGroup :label="$t('align')" size="xs">
    <UButtonGroup :ui="{ wrapper: { horizontal: 'grid grid-cols-3'} }">
      <UButton
        icon="i-heroicons-bars-3-bottom-left-16-solid"
        block
        @click="settings.bigTextAlign = 'left'"
        :class="settings.bigTextAlign === 'left' ? 'opacity-100' : 'opacity-50'"
      />
      <UButton
        icon="i-heroicons-bars-3-16-solid"
        block
        @click="settings.bigTextAlign = 'center'"
        :class="settings.bigTextAlign === 'center' ? 'opacity-100' : 'opacity-50'"
      />
      <UButton
        icon="i-heroicons-bars-3-bottom-right-16-solid"
        block
        @click="settings.bigTextAlign = 'right'"
        :class="settings.bigTextAlign === 'right' ? 'opacity-100' : 'opacity-50'"
      />
    </UButtonGroup>
  </UFormGroup>
</template>