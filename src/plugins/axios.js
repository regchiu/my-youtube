import axios from 'axios'
const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3'
})

export { youtubeApi }
