<template>
  <UFormGroup label="Logo" size="xs">
    <USelectMenu
      v-model="settings.iso"
      value-attribute="id"
      selected-icon="i-ci-dot-03-m"
      :options="graphics"
    >
      <template #default>
        <UButton block >
          <nuxt-icon v-if="settings.iso != 1" :name="graphics.find((f: Graphic) => f.id === settings.iso)?.svg || ''" filled class="w-4" />
            {{ settings.iso !== 1 ? graphics.find((f: Graphic) => f.id === settings.iso)?.label : $t('none') }}
        </UButton>
      </template>
      <template #option="{ option: iso }">
        <nuxt-icon v-if="iso.svg != ''" :name="iso.svg" filled class="w-4" />
        <span v-else class="w-4"></span>
        <span class="truncate">{{ iso.label }}</span>
      </template>
    </USelectMenu>
  </UFormGroup>
</template>
