<template>
  <UDivider :label="$t('formatAndImage')" />
  <USelectMenu
    v-model="settings.frameSize"
    :options="socialSizes"
    value-attribute="id"
    selected-icon="i-ci-dot-03-m"
  >
    <UButton block >
      {{ format?.label }}
      <span class="text-xs">{{ ' (' + format?.x + 'x' + format?.y + ')' }}</span>
    </UButton>
  </USelectMenu>
</template>