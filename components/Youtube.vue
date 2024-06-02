<script setup lang="ts">
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'
const props = defineProps({	video: { type: String } })
</script>

<template>
  <section class="w-full">
    <LiteYouTubeEmbed
       v-if="props.video"
      :id=props.video
      title="Video"
    />
    <UAlert v-else icon="i-mdi-alert-circle" color="yellow" :title="$t('missing_video_id')" />
  </section>
</template>