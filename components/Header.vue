<template>
  <section class="absolute top-0 w-full">
    <div class="h-16 px-2 max-w-96 md:max-w-[800px] lg:max-w-[990px] mx-auto flex flex-row justify-between items-center">
      <div id="title" class="slide-enter-content flex items-center space-x-1">
        <img src="/favicon-32x32.png" class="w-5 h-5">
        <span class="uppercase mt-0.5">{{ runtimeConfig.public.NAME }}</span>
      </div>
      <div id="switches" class="flex flex-row gap-1 h-fit">
        <LightDarkSwitch />
        <!-- <LocaleToggle /> -->
        <!-- <LocaleSwitch /> -->
        <!-- HELP: -->
        <UButton icon="i-heroicons-question-mark-circle-16-solid" color="gray" variant="link" size="lg" @click="isOpen = true"/>
        <UModal v-model="isOpen" :ui="{ container: 'items-center sm:items-center' }" >
          <UContainer class="flex flex-col justify-center items-center">
            <h3 class="text-center text-primary my-4">Ayuda</h3>
            <div class="text-sm prose dark:prose-invert mb-4">
              <p>Esta es una aplicación para generar imagen compatibles con los formatos de LinkedIn.</p>
            </div>
            
            <UAccordion :items="items" color="primary" variant="solid" size="md">
              <template #caracteristicas>
                <div class="text-sm prose dark:prose-invert">
                  <ol>
                    <li>Opciones de personalización: Sobreimpresiones de texto para que su imagen se destaque.</li>
                    <li>Aspecto consistente: Asegúrate de una presentación profesional y visualmente atractiva que refleje tu marca o estilo personal.</li>
                    <li>Salida de alta calidad: Disfruta resultados crujientes y de alta resolución.</li>
                    <li>Compartir fácilmente: Guarda en tu dispositivo para uso futuro.</li>
                  </ol>
                </div>
              </template>
              <template #ideal-para>
                <div class="text-sm prose dark:prose-invert">
                  <ul>
                    <li>Empresas que desean mostrar productos o servicios de manera única.</li>
                    <li>Creativos que quieren experimentar con historias visuales innovadoras.</li>
                    <li>Influencers que buscan mejorar su contenido.</li>
                  </ul>
                </div>
              </template>
              <template #next-level>
                <div class="text-sm prose dark:prose-invert">
                  <ol>
                    <li>Arrastra una imagen al area de la foto (desktop) o clickealo (en móviles y desktop) para elegir una imagen*. Verás la vista previa de la imagen.</li>
                    <li>Elije el formato según lo que necesites. Cambia el texto y ajusta los parámetros hasta que estés conforme con lo que ves en la vista previa.</li>
                    <li>Cuando estés conforme, dale clic a "Descargar".</li>
                  </ol>
                </div>
              </template>
            </UAccordion>

            <UAlert icon="i-mdi-asterisk" class="my-4">
              <template #description>
                <span class="italic text-xs">Esta herramienta trabaja con las imágenes que tienes guardadas en tu dispositivo. No son guardadas en ningún sitio o subidas a ningún servidor para ser procesadas</span> 😎
              </template>
            </UAlert />

            <UButton icon="i-mdi-close" label="Cerrar" @click="isOpen = false" :block="ismobile.isMobileOrTablet" class="mb-4"/>
          </UContainer>
        </UModal>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const ismobile = useDevice()
const isOpen = ref(false)
const items = [
  {
    label: 'Características clave',
    icon: 'i-mdi-star-face',
    slot: 'caracteristicas'
  },
  {
    label: 'Ideal para',
    icon: 'i-mdi-hand-okay',
    slot: 'ideal-para'
  },
  {
    label: 'Cómo funciona',
    icon: 'i-ic-baseline-rocket-launch',
    slot: 'next-level'
  }
]
</script>