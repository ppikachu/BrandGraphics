<script lang="ts" setup>
const model = defineModel()
const open = ref(false)
const { t } = useI18n()

const props = defineProps({
  base64 : { type: String },
  position: { type: Number, default: 50 },
  frameSize: { type: Object, default: { x: 1920, y: 1080 } },
  flip: { type: Boolean, default: false },
})

const filtrosBase = [
{ label: t("none"), class: "" },
{ label: "1977", class: "_1977" },
{ label: "Aden", class: "aden" },
{ label: "Brannan", class: "brannan" },
{ label: "Brooklyn", class: "brooklyn" },
{ label: "Clarendon", class: "clarendon" },
{ label: "Earlybird", class: "earlybird" },
{ label: "Gingham", class: "gingham" },
{ label: "Hudson", class: "hudson" },
{ label: "Inkwell", class: "inkwell" },
{ label: "Kelvin", class: "kelvin" },
{ label: "Lark", class: "lark" },
{ label: "Lo-Fi", class: "lofi" },
{ label: "Maven", class: "maven" },
{ label: "Mayfair", class: "mayfair" },
{ label: "Moon", class: "moon" },
{ label: "Nashville", class: "nashville" },
{ label: "Perpetua", class: "perpetua" },
{ label: "Reyes", class: "reyes" },
{ label: "Rise", class: "rise" },
{ label: "Slumber", class: "slumber" },
{ label: "Stinson", class: "stinson" },
{ label: "Toaster", class: "toaster" },
{ label: "Valencia", class: "valencia" },
{ label: "Walden", class: "walden" },
{ label: "Willow", class: "willow" },
{ label: "X-pro II", class: "xpro2" }
]

const filtros = extraFiltros.concat(filtrosBase)
</script>

<template>
  <UFormGroup :label="$t('filter')" size="xs">
    <UButton
      icon="i-ri-camera-lens-fill"
      :label="filtros.find(f => f.class === model)?.label || $t('none')"
      block
      @click="open = true"
    />
    <UModal v-model="open" :ui="{ width: 'sm:max-w-4xl' }" >
      <UCard>
        <div class="flex justify-end container mx-auto mb-4 app-font">
          <UButton @click="open = false" icon="i-mdi-close" :label="$t('close')" variant="soft"/>
        </div>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-4 app-font">
          <UButton
            v-for="f, i in filtros"
            :key="i"
            :color="model === filtros[i].class ? 'primary' : 'black'"
            @click="model = filtros[i].class, open = false"
            :ui="{ inline: 'flex flex-col gap-2', padding: { xs: 'px-0 pt-0 pb-0.5' } }"
          >
            <figure :class="f.class" class="rounded overflow-hidden w-full">
              <img
                :src="base64"
                :alt="f.label"
                class="object-cover w-full"
                :style="`
                  aspect-ratio: ${props.frameSize.x} / ${props.frameSize.y};
                  object-position: ${position}% ${position}%;
                  transform: ${props.flip ? 'scaleX(-1)' : 'scaleX(1)'};
                `"
              />
            </figure>
            <div class="text-sm px-0.5 pb-1">{{ f.label }}</div>
          </UButton>
        </div>
      </UCard>
    </UModal>
  </UFormGroup>
</template>