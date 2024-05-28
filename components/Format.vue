<script lang="ts" setup>
const model = defineModel() as unknown as FrameSize
</script>

<template>
  <UDivider :label="$t('formatAndImage')" />
  <USelectMenu
    :options="socialSizes"
    v-model="model"
  >
    <UButton block >
      {{ model.label + ' (' + model.x + 'x' + model.y + ')' }}
    </UButton>
  </USelectMenu>
</template>