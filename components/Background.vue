<script lang="ts" setup>
const ismobile = useDevice()
const file = shallowRef()
const filename = ref('test')
const isOpen = ref(false)
const dropZoneRef = ref<HTMLDivElement>()
const { isOverDropZone } = useDropZone(dropZoneRef, { onDrop, dataTypes: ['image/jpeg', 'image/png'] })

/**
 * Reset the photo position to the center.
 */
function resetPhoto() {
  settings!.photoPosition = 50
}

/**
 * Handle file input event to set the base64 value in settings and reset the photo position.
 *
 * @param {Event} e - The event object containing file input details.
 * @return {void} This function does not return anything.
 */
function onFileInput(e: Event): void {
  const { base64: fileBase64 } = useBase64((e.target as HTMLInputElement).files![0])
  settings!.startbase64 = fileBase64 as unknown as string
  resetPhoto()
}

/**
 * Handle the drop event when files are dropped on the zone.
 *
 * @param {File[] | null} files - The array of files dropped or null.
 * @return {void} This function does not return anything.
 */
function onDrop(files: File[] | null): void {
  if (files) {
    file.value = files[0]
    filename.value = file.value.name
    const { base64: fileBase64 } = useBase64(files[0] )
    settings!.startbase64 = fileBase64 as unknown as string
    resetPhoto()
  }
}

function close() {
  isOpen.value = false
}
</script>

<template>
  <section class="relative">
    <!-- BIG PREVIEW -->
    <UModal v-if="!ismobile.isMobileOrTablet" v-model="isOpen" :ui="{ container: 'items-center', width: 'sm:max-w-full', padding: 'px-4 sm:px-16', }">
      <UButton class="absolute top-2 right-2 z-10" @click="isOpen = false" icon="i-mdi-close" :label="$t('close')" variant="soft"/>
      <OverPhoto @close="close"/>
    </UModal>

    <div class="mx-auto max-w-96 relative group">
      <UButton v-if="!ismobile.isMobileOrTablet" class="absolute invisible group-hover:visible group/preview top-2 right-2 z-10" @click="isOpen = true" icon="i-mdi-eye" variant="soft" :label="$t('preview')"/>
      <OverPhoto />
      <!-- INPUT IMAGE -->
      <div class="absolute top-0 left-0 w-full h-full">
        <input id="image_uploads"
          type="file"
          name="image_uploads"
          accept=".jpg, .jpeg, .png"
          @change="onFileInput"
          class="hidden"
        >
        <label
          ref="dropZoneRef"
          for="image_uploads"
          class="absolute flex w-full h-full cursor-pointer items-center justify-center opacity-0 hover:opacity-100 outline-dashed outline-offset-4 outline-2 rounded transition-opacity"
          :class="isOverDropZone ? 'outline-green-500' : 'outline-primary'"
        >
          <UButton icon="i-heroicons-arrow-up-on-square" :label="$t('uploadPhoto')" size="lg" class="invisible group-hover:visible uppercase max-w-80 pointer-events-none"/>
        </label>
      </div>
    </div>

  </section>
</template>