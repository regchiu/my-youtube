<template>
  <y-container class="home">
    <span class="title">推薦影片</span>
    <div
      class="videos-container"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <y-video-card
        style="margin-bottom: 20px;"
        v-for="video in videos"
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
import { mapMutations } from 'vuex'
import YVideoCard from '@/components/YVideoCard.vue'
export default {
  components: {
    YVideoCard
  },
  data () {
    return {
      videos: [],
      nextPageToken: null,
      busy: false,
      isEnd: false
    }
  },
  methods: {
    ...mapMutations(['addFavorites', 'removeFavorites', 'setVideo']),
    async fetchVideos (payload) {
      try {
        const response = await this.$youtubeApi.get('/videos', {
          params: {
            part: 'snippet,contentDetails',
            chart: 'mostPopular',
            regionCode: 'TW',
            videoCategoryId: 10,
            key: process.env.VUE_APP_YOUTUBE_API_KEY,
            maxResults: 12,
            ...payload
          }
        })
        if (!response.data.nextPageToken) {
          this.isEnd = true
        } else {
          this.nextPageToken = response.data.nextPageToken
        }
        this.videos.push(...response.data.items)
      } catch (error) {
        console.log(error)
      }
    },
    async loadMore () {
      if (this.isEnd) {
        return
      }
      this.busy = true
      try {
        await this.fetchVideos({
          pageToken: this.nextPageToken
        })
        this.busy = false
      } catch (error) {
        this.busy = false
        console.log(error)
      }
    },
    watchVideo (video) {
      this.setVideo({
        title: video.snippet.title,
        description: video.snippet.description
      })
      this.$router.push({ name: 'Video' })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
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
  .home {
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
