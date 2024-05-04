<script lang="ts" setup>
const model: any = defineModel()

const open = ref(false)
function update(c: number) {
  model.value = sushiFonts[c]
  open.value = false
}
const sushiFonts = [
  { id: 'Montserrat', label: 'Moderna', weight: '700' },
  // { id: 'UnifrakturMaguntia', label: 'Germánica' },
  { id: 'Abril Fatface', label: 'Elegante' },
  { id: 'Alfa Slab One', label: 'Pesada' },
  { id: 'Permanent Marker', label: 'Marcador' },
  { id: 'Special Elite', label: 'X-files' },
  { id: 'Vast Shadow', label: 'Sombra' },
  // { id: 'Bungee Shade', label: 'Retro' },
  // { id: 'Lobster Two', label: 'Caracol' },
  // { id: 'Pacifico', label: 'Pacifico' },
  // { id: 'Bungee Spice', label: 'Bungee Spice' },
  // { id: 'Nabla', label: 'Nabla' },
  // { id: 'Honk', label: 'Honk' },
  // { id: 'FontFamilyStyleBitter', label: 'Western' },
  // { id: 'Amatic SC', label: 'Amatic SC' },
  // { id: 'Press Start 2P', label: 'Arcade' },
]
</script>

<template>
  <UFormGroup label="Tipografía" size="xs">
    <UPopover v-model:open="open" :popper="{ placement: 'top-start' }">
      <UButton
        :label="model.label"
        color="white"
        trailing-icon="i-heroicons-chevron-up-16-solid"
        :class="model.id.replace(/\s+/g, '')"
        block
      /> 
      <template #panel>
        <UCard>
          <div class="grid grid-cols-2 gap-2">
            <UButton
              v-for="c, i in sushiFonts"
              :key="i"
              :label="c.label"
              :color="model.id===c.id ? 'red' : 'black'"
              :variant="model.id===c.id ? 'solid' : 'outline'"
              :class="c.id.replace(/\s+/g, '')"
              size="md"
              @click="update(i)"
            />
          </div>
        </UCard>
      </template>
    </UPopover>
  </UFormGroup>
</template>

<style>
.Montserrat {
  font-family: "Montserrat";
  font-weight: 700;
}
/* .UnifrakturMaguntia {
  font-family: "UnifrakturMaguntia";
} */
.AbrilFatface {
  font-family: "Abril Fatface";
}
.AlfaSlabOne {
  font-family: "Alfa Slab One";
}
.PermanentMarker {
  font-family: "Permanent Marker";
}
.SpecialElite {
  font-family: "Special Elite";
}
.VastShadow {
  font-family: "Vast Shadow";
}
/* .BungeeShade {
  font-family: "Bungee Shade";
}
.Lobster {
  font-family: "Lobster Two";
} */
/* .Pacifico {
  font-family: "Pacifico";
} */
/* .BungeeSpice {
  font-family: "Bungee Spice";
}
.Nabla {
  font-family: "Nabla";
}
.Honk {
  font-family: "Honk";
} */
/* .Nosifer {
  font-family: "Nosifer";
} */
/* .PlayfairDisplay {
  font-family: "Playfair Display";
} */
/* .PressStart2P {
  font-family: "Press Start 2P";
} */
/* .Codystar {
  font-family: "Codystar";
} */
/* .FontFamilyStyleBitter {
  font-family: "FontFamily Style Bitter";
} */
</style>