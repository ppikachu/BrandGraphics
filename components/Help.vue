<script lang="ts" setup>
const ismobile = useDevice()
const { t } = useI18n()
const isOpen = ref(false)

const items = computed(() =>{
  return [
    {
      label: t('key_features.title'),
      icon: 'i-mdi-star-face',
      content: t('key_features.content')
    },
    {
      label: t('ideal_for.title'),
      icon: 'i-mdi-hand-okay',
      content: t('ideal_for.content')
    },
    {
      label: t('next_level.title'),
      icon: 'i-ic-baseline-rocket-launch',
      content: t('next_level.content')
    },
    {
      label: t('demo.title'),
      icon: 'i-mdi-video',
      slot: t('demo.slot')
    },
    {
      label: t('reset_to_default'),
      icon: 'i-mdi-refresh',
      slot: 'reset'
    }
  ]
})

async function resetSettings() {
  localStorage.clear()
  console.log('clearing local storage');
  window.location.reload()
}
</script>

<template>
  <div>
    <UButton icon="i-heroicons-question-mark-circle-16-solid" :label="$t('help')" color="gray" variant="link" size="lg" @click="isOpen = true"/>
    <UModal v-model="isOpen" :ui="{ container: 'items-center sm:items-center' }" >
      <UCard>
        <section class="app-font">
          <h3 class="text-center text-primary mb-4 text-xl">{{ $t('help') }}</h3>
          <p class="prose dark:prose-invert mb-4">{{ $t('description') }}</p>
          <UButton icon="i-mdi-close" @click="isOpen = false" class="mb-8 absolute top-2 sm:top-4 right-2 sm:right-4"/>

          <UAccordion :items="items" size="lg">

            <template #item="{ item }">
              <div v-html="item.content" class="prose dark:prose-invert prose-sm"/>
            </template>

            <template #demo>
              <Youtube video="9efS0N2X5Kc" />
            </template>

            <template #reset>
              <div class="text-sm prose dark:prose-invert">
                <p>{{ $t('reset_to_default') }}</p>
                <UButton icon="i-mdi-refresh" label="Reset" @click="resetSettings" :block="ismobile.isMobileOrTablet" />
              </div>
            </template>

          </UAccordion>

          <UAlert icon="i-mdi-alert-circle" color="green" class="my-4">
            <template #description>
              <span class="italic text-xs">{{ $t('disclosure') }}</span>😎
            </template>
          </UAlert>

          <MyCopyright />
        </section>
      </UCard>
    </UModal>
  </div>
</template>