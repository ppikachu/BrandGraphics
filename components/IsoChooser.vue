<script lang="ts" setup>
const model = defineModel() as unknown as string
</script>

<template>
  <UFormGroup label="Logo" size="xs">
    <USelectMenu
      v-model="model"
      value-attribute="svg"
      selected-icon="i-ci-dot-03-m"
      :options="graphics"
    >
      <template #default="{ option: person }">
        <UButton block >
          <nuxt-icon v-if="model" :name="model" filled class="w-4" />
          {{ model ? graphics.find(f => f.svg === model)?.label : $t('none') }}
        </UButton>
      </template>
      <template #option="{ option: iso }">
        <nuxt-icon :name="iso.svg" filled class="w-4" />
        <span class="truncate">{{ iso.label }}</span>
      </template>
    </USelectMenu>
  </UFormGroup>
</template>
