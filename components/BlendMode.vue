<script lang="ts" setup>
const model: any = defineModel()
const blendmodes = [[
  { label:"Normal",       mode:"normal",       click: () => { blendMode("normal")  } },
  { label:"Multiply",     mode:"multiply",     click: () => { blendMode("multiply")  } },
  { label:"Screen",       mode:"screen",       click: () => { blendMode("screen")  } },
  { label:"Overlay",      mode:"overlay",      click: () => { blendMode("overlay")  } },
  { label:"Darken",       mode:"darken",       click: () => { blendMode("darken")  } },
  { label:"Lighten",      mode:"lighten",      click: () => { blendMode("lighten")  } },
  { label:"Color-Dodge",  mode:"color-dodge",  click: () => { blendMode("color-dodge")  } },
  { label:"Color-Burn",   mode:"color-burn",   click: () => { blendMode("color-burn")  } },
  { label:"Hard-Light",   mode:"hard-light",   click: () => { blendMode("hard-light")  } },
  { label:"Soft-Light",   mode:"soft-light",   click: () => { blendMode("soft-light")  } },
  // { label:"Difference",   mode:"difference",   click: () => { blendMode("difference") } },
  // { label:"Exclusion",    mode:"exclusion",    click: () => { blendMode("exclusion") } },
  { label:"Hue",          mode:"hue",          click: () => { blendMode("hue") } },
  { label:"Saturation",   mode:"saturation",   click: () => { blendMode("saturation") } },
  { label:"Color",        mode:"color",        click: () => { blendMode("color") } },
  { label:"Luminosity",   mode:"luminosity",   click: () => { blendMode("luminosity") } },
  // { label:"Plus-darker",  mode:"plus-darker",  click: () => { blendMode("plus-darker") } },
  // { label:"Plus-lighter", mode:"plus-lighter", click: () => { blendMode("plus-lighter") } },
]]

function blendMode(mode: string) {
  model.value = mode
}
</script>

<template>
  <UFormGroup label="Blend Mode" size="xs">
    <UDropdown :items="blendmodes" :ui="{ wrapper: 'w-full', width: 'w-auto', item: { size: 'text-xs' } }">
      <UButton :label="model || 'Ninguno'" color="white" block class="truncate capitalize" :ui="{ rounded: 'rounded-l-none' }" />
      <template #item="{ item }">
        <span :class="{ 'text-primary': model === item.mode }">{{ item.label }}</span>
      </template>
    </UDropdown>
  </UFormGroup>
</template>