<script lang="ts" setup>
const model = defineModel() as unknown as string
function label(svg : string) { return graphics.find(x => x.svg === svg)?.label }
</script>

<template>
  <UFormGroup label="Logo" size="xs">
    <USelectMenu
      v-model="model"
      value-attribute="svg"
      :options="graphics"
    >
      <template #default="{ option: person }">
        <UButton block >
          <nuxt-icon v-if="model" :name="model" filled class="w-4" />
          {{ model ? label(model) : $t('none') }}
          <!-- <UIcon name="i-heroicons-chevron-down-20-solid" class="w-5 h-5 transition-transform" :class="[person && 'transform rotate-90']" /> -->
        </UButton>
      </template>
      <template #option="{ option: iso }">
        <nuxt-icon :name="iso.svg" filled class="w-4" />
        <span class="truncate">{{ iso.label }}</span>
      </template>
    </USelectMenu>
  </UFormGroup>
</template>
