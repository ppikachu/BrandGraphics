<template>
	<!-- {{ $i18n.localeProperties.code }} > {{ shortLocale() }} -->
	<div class="flex items-center gap-2">
		<UToggle
			v-model="localeState"
			on-icon="i-circle-flags-us"
			off-icon="i-circle-flags-es"
			size="lg"
			@click="functionSwitchLocale()"
			:ui="{
				active: 'bg-gray-200 dark:bg-gray-900',
				inactive: 'dark:bg-gray-900',
				icon: {
					on: 'dark:text-gray-400',
				}
			}"
		/>
		<!-- {{ shortLocale() === 'en' ? 'English' : 'Español' }} -->
	</div>
</template>

<script lang="ts" setup>
const { setLocale } = useI18n()
const localeState = ref(shortLocale() === 'en' ? true : false)
const shlocale = ref(shortLocale())

function functionSwitchLocale() {
	setLocale(shlocale.value === 'en' ? 'es' : 'en')
	shlocale.value = shlocale.value === 'en' ? 'es' : 'en'
}

function shortLocale() {
  if (useI18n().locale.value.length>2)
    return useI18n().locale.value.split('-')[0]
  else
    return useI18n().locale.value
}
</script>