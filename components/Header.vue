<template>
  <section class="absolute top-0 w-full">
    <div class="h-16 px-2 max-w-96 lg:max-w-[800px] mx-auto flex flex-row justify-between items-center">
      <div id="title" class="slide-enter-content flex items-center space-x-1">
        <img src="/favicon-32x32.png" class="w-5 h-5">
        <span class="uppercase mt-0.5">{{ runtimeConfig.public.NAME }}</span>
      </div>
      <div id="switches" class="flex flex-row gap-1 h-fit">
        <LocaleToggle />
        <LightDarkSwitch />
        <!-- <LocaleSwitch /> -->
        <!-- HELP: -->
        <UButton icon="i-heroicons-question-mark-circle-16-solid" color="gray" variant="link" size="lg" @click="isOpen = true"/>
        <UModal v-model="isOpen" :ui="{ container: 'items-center sm:items-center' }" >
          <UContainer class="flex flex-col justify-center items-center">
            <h3 class="text-center text-primary my-4">Help</h3>
            <div class="text-sm prose dark:prose-invert mb-4">
              <p>This is an application to generate images compatible with LinkedIn formats.</p>
            </div>
            <UAccordion :items="items" color="primary" variant="solid" size="md">
              <template #caracteristicas>
                <div class="text-sm prose dark:prose-invert">
                  <ol>
                    <li>Personalization Options: Text overlays to make your image stand out.</li>
                    <li>Consistent appearance: Ensure a professional and visually appealing presentation that reflects your brand or personal style.</li>
                    <li>High-quality output: Enjoy crisp, high-resolution results.</li>
                    <li>Easy sharing: Save to your device for future use.</li>
                  </ol>
                </div>
              </template>
              <template #ideal-para>
                <div class="text-sm prose dark:prose-invert">
                  <ul>
                    <li>Companies that want to show products or services in a unique way.</li>
                    <li>Creatives who want to experiment with innovative visual stories.</li>
                    <li>Influencers looking to improve their content.</li>
                  </ul>
                </div>
              </template>
              <template #next-level>
                <div class="text-sm prose dark:prose-invert">
                  <ol>
                    <li>Drag an image to the photo area (desktop) or click on it (mobile and desktop) to choose an image*. You will see the preview of the image.</li>
                    <li>Choose the format according to what you need. Change the text and adjust the parameters until you're happy with what you see in the preview.</li>
                    <li>When you are satisfied, click "Download".</li>
                  </ol>
                </div>
              </template>
              <template #reset>
                <div class="text-sm prose dark:prose-invert">
                  <p>Reset settings to default values.</p>
                  <UButton icon="i-mdi-refresh" label="Reset" @click="resetSettings" :block="ismobile.isMobileOrTablet" />
                </div>
              </template>
            </UAccordion>

            <UAlert icon="i-mdi-alert-circle" color="green" class="my-4">
              <template #description>
                <span class="italic text-xs">This tool works with the images on your device. They are not uploaded to a server to be processed </span>😎
              </template>
            </UAlert />

            <UButton icon="i-mdi-close" label="Close" @click="isOpen = false" :block="ismobile.isMobileOrTablet" class="mb-8"/>
            <a href="https://toyos.vercel.app" target="_blank" class="text-xs mb-4 text-gray-500">Developed by TOYOS - {{ new Date().getFullYear() }}</a>
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
    label: 'Key Features',
    icon: 'i-mdi-star-face',
    slot: 'caracteristicas'
  },
  {
    label: 'Ideal for',
    icon: 'i-mdi-hand-okay',
    slot: 'ideal-para'
  },
  {
    label: 'How it works',
    icon: 'i-ic-baseline-rocket-launch',
    slot: 'next-level'
  },
  {
    label: 'Reset to default',
    icon: 'i-mdi-refresh',
    slot: 'reset'
  }
]
async function resetSettings() {
  localStorage.clear()
  console.log('clearing local storage');
  window.location.reload()
}
</script>