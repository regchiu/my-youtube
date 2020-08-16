<template>
  <y-container class="video">
    <y-video-player :options="videoOptions" />
    <h1 class="video__title">{{ video.title }}</h1>
    <article class="video__description">{{ video.description }}</article>
  </y-container>
</template>
<script>
import { mapGetters } from 'vuex'
import YVideoPlayer from '@/components/YVideoPlayer.vue'
export default {
  components: {
    YVideoPlayer
  },
  data () {
    return {
      videoOptions: {
        autoplay: false,
        controls: true,
        fluid: true,
        preload: 'none',
        crossorigin: true,
        playbackRates: [1, 1.5, 2],
        sources: [
          {
            src:
              'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
            type: 'application/x-mpegURL'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['video'])
  }
}
</script>
<style lang="scss" scoped>
.video {
  .video__title {
    max-width: 70%;
    margin: 30px 0;
    font-size: 18px;
  }
  .video__description {
    max-width: 70%;
    font-size: 14px;
  }
}
@media (max-width: 600px) {
  .video {
    .video__title {
      max-width: 100%;
      margin: 5px 10px;
      font-size: 16px;
      font-weight: 500;
    }
    .video__description {
      margin: 0 10px;
      max-width: 100%;
      font-size: 12px;
    }
  }
}
</style>
