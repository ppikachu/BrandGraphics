<script lang="ts" setup>
const model = defineModel() as unknown as FrameSize
</script>

<template>
  <UDivider :label="$t('formatAndImage')" />
  <USelectMenu
    v-model="model"
    :options="socialSizes"
    selected-icon="i-ci-dot-03-m"
  >
    <UButton block >
      {{ model.label + ' (' + model.x + 'x' + model.y + ')' }}
    </UButton>
  </USelectMenu>
</template>