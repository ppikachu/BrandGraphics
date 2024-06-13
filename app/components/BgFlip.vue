<template>
  <UFormGroup :label="$t('flip')" size="xs">
    <UButton
      :label="settings.bgFlip ? $t('yes') : 'No'"
      icon="i-mdi-flip-horizontal"
      block
      :class="settings.bgFlip ? 'opacity-100' : 'opacity-50'"
      @click="settings.bgFlip = !settings.bgFlip"
    />
  </UFormGroup>
</template>