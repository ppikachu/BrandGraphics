<script lang="ts" setup>
const model = defineModel({ type: String })
function label(svg : string) { return blendmodes[0].find(x => x.svg === svg)?.label }

const blendmodes = [[
  { label:"None",       svg:"" },
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
    <UDropdown
      :items="blendmodes"
      :popper="{ placement: 'top' }"
      :ui="{ wrapper: 'w-full', width: 'w-auto', item: { size: 'text-sm' } }"
    >
      <UButton :label="blendmodes[0].find(x => x.svg === model)?.label" block >
        <nuxt-icon v-if="model" :name="model" filled class="w-4" />
        <span class="truncate">{{ model ? label(model) : 'None' }}</span>
      </UButton>

      <template #item="{ item }">
        <div class="flex items-center gap-1.5">
          <nuxt-icon :name="item.svg" class="w-4" filled />
          <span
            class="truncate pr-1"
          :class="{ 'text-primary': model === item.svg }"
            @click="model = item.svg"
          >
            {{ item.label }}
          </span>
        </div>
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