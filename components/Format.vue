<script lang="ts" setup>
const model: any = defineModel()
</script>

<template>
  <UDivider :label="$t('formatAndImage')" />
  <USelectMenu
    :options="socialSizes"
    v-model="model"
    v-slot="{ open }"
  >
    <UButton block >
      {{ model.label + ' (' + model.x + 'x' + model.y + ')' }}
      <UIcon name="i-heroicons-chevron-right-20-solid" class="w-5 h-5 transition-transform" :class="[open && 'transform rotate-90']" />
    </UButton>
  </USelectMenu>
</template>