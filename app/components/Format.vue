<template>
  <UDivider :label="$t('formatAndImage')" />
  <USelectMenu
    v-model="settings.frameSize"
    :options="socialSizes"
    value-attribute="id"
    selected-icon="i-ci-dot-03-m"
  >
    <UButton block >
      {{ socialSizes.find((f: FrameSize) => f.id === settings.frameSize)?.label + ' (' + socialSizes.find((f: FrameSize) => f.id === settings.frameSize)?.x + 'x' + socialSizes.find((f: FrameSize) => f.id === settings.frameSize)?.y + ')' }}
    </UButton>
  </USelectMenu>
</template>