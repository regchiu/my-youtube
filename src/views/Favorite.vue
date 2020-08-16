<template>
  <y-container class="favorite">
    <span class="title">收藏的影片</span>
    <div class="videos-container">
      <y-video-card
        style="margin-bottom: 20px;"
        v-for="video in favorites"
        :key="video.id"
        :id="video.id"
        :img="video.snippet.thumbnails.medium.url"
        :duration="video.contentDetails.duration"
        :title="video.snippet.title"
        :description="video.snippet.description"
        @add="addFavorites(video)"
        @remove="removeFavorites(video)"
        @click="watchVideo(video)"
      />
    </div>
  </y-container>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import YVideoCard from '@/components/YVideoCard.vue'
export default {
  components: {
    YVideoCard
  },
  computed: {
    ...mapGetters(['favorites'])
  },
  methods: {
    ...mapMutations(['addFavorites', 'removeFavorites', 'setVideo']),
    watchVideo (video) {
      this.setVideo({ title: video.snippet.title, description: video.snippet.description })
      this.$router.push({ name: 'Video' })
    }
  }
}
</script>
<style lang="scss" scoped>
.favorite {
  .title {
    font-size: 20px;
    font-weight: 500;
    line-height: 2.4rem;
  }
  .videos-container {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
  }
}
@media (max-width: 600px) {
  .favorite {
    .title {
      font-size: 16px;
      font-weight: 500;
      line-height: 2.4rem;
      margin-left: 10px;
    }
    .videos-container {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
}
</style>
