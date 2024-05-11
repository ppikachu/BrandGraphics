<script lang="ts" setup>
const color = defineModel('color')
const opacity = defineModel('opacity')
const open = ref(false)
const props = defineProps({ position: { type: String, default: 'left' } })
interface Color {
  label: string;
  color: string;
}
const colores = [
  { label: "Fucsia",   color: "fuchsia" },
  { label: "Rosa",     color: "pink" },
  { label: "Rojo",     color: "red" },
  { label: "Naranja",  color: "orange" },
  { label: "Amarillo", color: "yellow" },
  { label: "Lima",     color: "lime" },
  { label: "Verde",    color: "green" },
  { label: "Turquesa", color: "teal" },
  { label: "Cyan",     color: "cyan" },
  { label: "Azul",     color: "blue" },
  { label: "Indigo",   color: "indigo" },
  { label: "Púrpura",  color: "purple" },
  { label: "Violeta",  color: "violet" },
  { label: "Blanco",   color: "white" },
  { label: "Negro",    color: "black" },
]

function leftorright() {
  if (props.position === 'center') return 'rounded-md'
  return props.position === 'left' ? 'rounded-l-md' : 'rounded-r-md'
}

function bgColor(c: Color) {
  const estilo = []
  const theColor = c.color
  // fix tailwind bg color
  if (theColor === 'white') estilo.push('bg-white')
  if (theColor === 'black') estilo.push('bg-black')
  // normal tailwind bg
  estilo.push('bg-' + c.color + '-400')
  // selected:
  if (color.value === c.color) estilo.push('border-2')
  return estilo
}

const fixcolor = (c: Color) => {
  const whiteColor = colores.find(color => color.color === "white")
  const blackColor = colores.find(color => color.color === "black")
  if (c === whiteColor) return blackColor
  if (c === blackColor) return whiteColor
  return c
}
</script>

<template>
  <UFormGroup label="Color" size="xs">
    <UPopover v-model:open="open" :popper="{ placement: 'top-start' }">
      <UButton
        icon="i-mdi-format-color-fill"
        block
        variant="solid"
        :color="color"
        :ui="{ rounded: leftorright }"
        :class="leftorright()"
      />
      <template #panel>
        <UCard :ui="{ body: { padding: 'sm:p-2' } }">
          <div class="grid grid-cols-5 gap-2 mb-4">
            <div
              v-for="c, i in colores"
              :label="c.label"
              :color="fixcolor(c)?.color"
              block
              class="flex items-center justify-center w-full h-8 rounded-md cursor-pointer"
              :class="bgColor(c)"
              @click="color = colores[i].color"
            ><span class="text-xs text-gray-900 px-1" :class="{ 'text-white': c.color === 'black'}">{{ c.label }}</span>
            </div>
          </div>
          <Opacity v-model="opacity" />
        </UCard>
      </template>
    </UPopover>
  </UFormGroup>
</template>

<style>
.fuchsia { filter: invert(36%) sepia(71%) saturate(2022%) hue-rotate(268deg) brightness(96%) contrast(95%); }
.pink    { filter: invert(17%) sepia(92%) saturate(3000%) hue-rotate(321deg) brightness(97%) contrast(100%); }
.red     { filter: invert(37%) sepia(48%) saturate(2924%) hue-rotate(339deg) brightness(102%) contrast(88%); }
.yellow  { filter: invert(65%) sepia(36%) saturate(3103%) hue-rotate(11deg) brightness(109%) contrast(94%); }
.lime    { filter: invert(76%) sepia(84%) saturate(4291%) hue-rotate(46deg) brightness(117%) contrast(83%); }
.green   { }
.teal    { }
.cyan    { }
.blue    { }
.indigo  { }
.purple  { }
.violet  { }
.white   { }
.black   { }
</style>