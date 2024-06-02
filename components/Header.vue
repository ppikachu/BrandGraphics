<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <section class="absolute top-0 w-full">
    <div class="h-16 px-2 max-w-96 lg:max-w-[800px] mx-auto flex flex-row justify-between items-center">
      <div id="title" class="slide-enter-content flex items-center space-x-1">
        <img src="/favicon-32x32.png" class="w-5 h-5">
        <span class="uppercase mt-0.5">{{ runtimeConfig.public.NAME }}</span>
      </div>
      <div id="switches" class="flex flex-row gap-1 items-center">
        <LocaleSwitch />
        <LightDarkSwitch/>
        <!-- HELP: -->
        <Help />
      </div>
    </div>
  </section>
</template>
