<template>
	<!-- //HACK: mode="hover"? -->
	<UDropdown
		:items="items"
		:ui="{ width: 'w-fit' }"
	>
		<UButton
			color="gray"
			class="h-fit uppercase"
			square
			:label="shlocale"
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
		click: () => { SwitchLanguage('es') }
	}, {
		label: 'English',
		click: () => { SwitchLanguage('en') }
	}]
]
</script>