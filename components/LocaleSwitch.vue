<template>
	<!-- //HACK: mode="hover"? -->
	<UDropdown
		:items="items"
		:ui="{ width: 'w-fit' }"
	>
		<UButton
			color="white"
			class="h-fit"
			size="xs"
			variant="ghost"
			:trailing-icon="shlocale === 'en' ? 'i-circle-flags-us' : 'i-circle-flags-es'"
			:ui="{ rounded: 'rounded-full' }"
		/>
	</UDropdown>
</template>

<script lang="ts" setup>
const { setLocale } = useI18n()
const shlocale = ref(shortLocale())

function SwitchLanguage(lang: string) {
	setLocale(lang)
	shlocale.value = lang
}

function shortLocale() {
  if (useI18n().locale.value.length>2)
    return useI18n().locale.value.split('-')[0]
  else
    return useI18n().locale.value
}

const items = [
	[{
		label: 'Español',
		icon: 'i-circle-flags-es',
		click: () => { SwitchLanguage('es') }
	}, {
		label: 'English',
		icon: 'i-circle-flags-us',
		click: () => { SwitchLanguage('en') }
	}]
]
</script>