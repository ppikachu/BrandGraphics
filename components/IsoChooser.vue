<script lang="ts" setup>
const model: any = defineModel()

const blendmodes = [[
  { label:"Words 1",    svg:"i_words1" },
  { label:"Words 2",    svg:"i_words2" },
  { label:"Words 3",    svg:"i_words3" },
  { label:"Emotions 1", svg:"i_emotions1" },
  { label:"Emotions 2", svg:"i_emotions2" },
  { label:"Emotions 3", svg:"i_emotions3" },
  { label:"Behavior 1", svg:"i_behavior1" },
  { label:"Behavior 2", svg:"i_behavior2" },
  { label:"Behavior 3", svg:"i_behavior3" },
]]
</script>

<template>
  <UFormGroup label="Logo" size="xs">
    <UDropdown :items="blendmodes" :popper="{ placement: 'top' }" :ui="{ wrapper: 'w-full', width: 'w-auto', item: { size: 'text-xs' } }">
      <UButton :label="model?.label || 'Ninguno'" color="white" class="truncate" block >
        <nuxt-icon :name="model.svg" filled class="w-4" />
        <span class="truncate">{{ model?.label }}</span>
      </UButton>

      <template #item="{ item }">
        <nuxt-icon :name="item.svg" class="w-4" filled />
        <span
          class="truncate"
          :class="{ 'text-primary': model.label === item.label }"
          @click="model = item"
        >
          {{ item.label }}
        </span>
      </template>
    </UDropdown>
  </UFormGroup>
</template>

<style>
.nuxt-icon svg {
  width:  100%;
  height: auto;
  margin-bottom: 0;
}
</style>