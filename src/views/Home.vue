<template>
  <y-container class="home">
    <span class="title">推薦影片</span>
    <y-loader v-if="loading" />
    <div v-else class="videos-container">
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
    <y-pagination
      v-if="!loading"
      :length="length"
      :total-visible="3"
      @input="changePage"
      @first="firstPage"
      @last="lastPage"
      @next="nextPage"
      @previous="previousPage"
    />
  </y-container>
</template>

<script>
import { mapMutations } from 'vuex'
import YVideoCard from '@/components/YVideoCard.vue'
import YPagination from '@/components/YPagination.vue'
export default {
  components: {
    YVideoCard,
    YPagination
  },
  data () {
    return {
      loading: true,
      videos: [],
      prevPageToken: [],
      nextPageToken: [null],
      total: 100,
      perPage: 12
    }
  },
  created () {
    this.init()
  },
  computed: {
    length () {
      return Math.ceil(this.total / this.perPage)
    }
  },
  methods: {
    ...mapMutations(['addFavorites', 'removeFavorites', 'setVideo']),
    async fetchVideos (payload, setVideos = true, isInit = false) {
      try {
        const response = await this.$youtubeApi.get('/videos', {
          params: {
            part: 'snippet,contentDetails',
            chart: 'mostPopular',
            regionCode: 'TW',
            videoCategoryId: 10,
            key: process.env.VUE_APP_YOUTUBE_API_KEY,
            ...payload
          }
        })
        if (isInit) {
          this.nextPageToken.push(response.data.nextPageToken || null)
          this.prevPageToken.push(response.data.prevPageToken || null)
        }
        if (setVideos) {
          this.videos = response.data.items
        }
      } catch (error) {
        console.log(error)
      }
    },
    async init () {
      if (this.total % this.perPage === 0) {
        for (let i = 0; i < this.length; i++) {
          await this.fetchVideos(
            {
              maxResults: this.perPage,
              pageToken: this.nextPageToken[i]
            },
            i === 0,
            true
          )
        }
      } else {
        for (let i = 0; i < this.length; i++) {
          await this.fetchVideos(
            {
              maxResults:
                i === this.length - 1
                  ? this.total % this.perPage
                  : this.perPage,
              pageToken: this.nextPageToken[i]
            },
            i === 0,
            true
          )
        }
      }
      this.loading = false
    },
    changePage (value) {
      if (value < this.length) {
        this.fetchVideos({
          maxResults: this.perPage,
          pageToken: this.nextPageToken[value - 1]
        })
      } else {
        this.fetchVideos({
          maxResults: this.total % this.perPage,
          pageToken: this.nextPageToken[this.length - 1]
        })
      }
    },
    firstPage (value) {
      this.fetchVideos({
        maxResults: this.perPage
      })
    },
    lastPage (value) {
      this.fetchVideos({
        maxResults: this.total % this.perPage,
        pageToken: this.nextPageToken[this.length - 1]
      })
    },
    previousPage (value) {
      if (value > 0) {
        this.fetchVideos({
          maxResults: this.perPage,
          pageToken: this.prevPageToken[value]
        })
      }
    },
    nextPage (value) {
      if (value < this.length) {
        this.fetchVideos({
          maxResults: this.perPage,
          pageToken: this.nextPageToken[value - 1]
        })
      } else {
        this.fetchVideos({
          maxResults: this.total % this.perPage,
          pageToken: this.nextPageToken[this.length - 1]
        })
      }
    },
    watchVideo (video) {
      this.setVideo({ title: video.snippet.title, description: video.snippet.description })
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
  .pagination {
    margin-top: 10px;
    align-self: center;
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
