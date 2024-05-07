<script lang="ts" setup>
const model: any = defineModel()
const blendmodes = [[
  { label:"Normal",       mode:"normal",       click: () => { blendMode(0)  } },
  { label:"Multiply",     mode:"multiply",     click: () => { blendMode(1)  } },
  { label:"Screen",       mode:"screen",       click: () => { blendMode(2)  } },
  { label:"Overlay",      mode:"overlay",      click: () => { blendMode(3)  } },
  { label:"Darken",       mode:"darken",       click: () => { blendMode(4)  } },
  { label:"Lighten",      mode:"lighten",      click: () => { blendMode(5)  } },
  { label:"Color-dodge",  mode:"color-dodge",  click: () => { blendMode(6)  } },
  { label:"Color-burn",   mode:"color-burn",   click: () => { blendMode(7)  } },
  { label:"Hard-light",   mode:"hard-light",   click: () => { blendMode(8)  } },
  { label:"Soft-light",   mode:"soft-light",   click: () => { blendMode(9)  } },
  { label:"Difference",   mode:"difference",   click: () => { blendMode(10) } },
  { label:"Exclusion",    mode:"exclusion",    click: () => { blendMode(11) } },
  { label:"Hue",          mode:"hue",          click: () => { blendMode(12) } },
  { label:"Saturation",   mode:"saturation",   click: () => { blendMode(13) } },
  { label:"Color",        mode:"color",        click: () => { blendMode(14) } },
  { label:"Luminosity",   mode:"luminosity",   click: () => { blendMode(15) } },
  { label:"Plus-darker",  mode:"plus-darker",  click: () => { blendMode(16) } },
  { label:"Plus-lighter", mode:"plus-lighter", click: () => { blendMode(17) } },
]]

function blendMode(mode: number) {
  model.value = blendmodes[0][mode].mode
}
</script>

<template>
  <UFormGroup label="Blend Mode" size="xs">
    <UDropdown :items="blendmodes" :ui="{ wrapper: 'w-full', width: 'w-auto', item: { size: 'text-xs' } }">
      <UButton :label="model?.label || 'Ninguno'" color="white" block :ui="{ rounded: 'rounded-l-none' }" />
      <template #item="{ item }">
        <span class="truncate" :class="{ 'text-primary': model === item.mode }">{{ item.label }}</span>
      </template>
    </UDropdown>
  </UFormGroup>
</template>