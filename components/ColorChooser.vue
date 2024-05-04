<script lang="ts" setup>
const model: any = defineModel()
const open = ref(false)

const props = defineProps({
  position: { type: String, default: 'left' },
})

function leftorright() {
  if (props.position === 'center') return ''
  return props.position === 'left' ? 'rounded-l-md' : 'rounded-r-md'
}
function update(c: number) {
  model.value = colores[c]
  open.value = false
}

const colores = [
  { label: "Fucsia", color: "fuchsia" },
  { label: "Rosa", color: "pink" },
  { label: "Rojo", color: "red" },
  { label: "Naranja", color: "red" },
  { label: "Amarillo", color: "yellow" },
  { label: "Lima", color: "lime" },
  { label: "Verde", color: "green" },
  { label: "Turquesa", color: "teal" },
  { label: "Cyan", color: "cyan" },
  { label: "Azul", color: "blue" },
  { label: "Indigo", color: "indigo" },
  { label: "Púrpura", color: "purple" },
  { label: "Violeta", color: "violet" },
  { label: "Blanco", color: "white" },
  { label: "Negro", color: "black" },
]

const fixcolor = (c: string) => {
  if (c === 'white') return 'black'
  if (c === 'black') return 'white'
  return c
}
</script>

<template>
  <UFormGroup label="Color" size="xs">
    <UPopover v-model:open="open" :popper="{ placement: 'top-start' }">
      <UButton
        block
        icon="i-mdi-format-color-fill"
        :color="fixcolor(model.color)"
        :ui="{ rounded: leftorright }"
        :class="leftorright()"
      />
      <template #panel>
        <UCard :ui="{ body: { padding: 'sm:p-2' } }">
          <div class="grid grid-cols-4 gap-2">
            <UButton
              v-for="c, i in colores"
              @click="update(i)"
              square
              :color="fixcolor(c.color)"
              class = "w-6 h-6"
              :class="{ 'ring-2 ring-white' : model.color===c.color }"
            />
          </div>
        </UCard>
      </template>
    </UPopover>
  </UFormGroup>
</template>