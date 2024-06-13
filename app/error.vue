<script setup lang="ts">
defineProps({
  error: Object
})

const handleError = () => {
  localStorage.clear()
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center w-full bg-gradient-to-b from-blue-950 to-black">
    <div class="max-w-2xl text-center text-white space-y-8 px-4">
      <h1 class="text-8xl font-bold">😰</h1>
      <h2 class="text-xl">My fault!</h2>
      <UButton @click="handleError" icon="i-mdi-refresh" label="Reset" variant="solid" />
    </div>
  </div>
</template>
