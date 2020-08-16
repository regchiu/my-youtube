import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    expand: false,
    favorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [],
    video: localStorage.getItem('video') ? JSON.parse(localStorage.getItem('video')) : null
  },
  mutations: {
    setExpand (state) {
      state.expand = !state.expand
    },
    addFavorites (state, payload) {
      state.favorites.push(payload)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    removeFavorites (state, payload) {
      state.favorites = state.favorites.filter(item => item.id !== payload.id)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    setVideo (state, payload) {
      state.video = payload
      localStorage.setItem('video', JSON.stringify(payload))
    }
  },
  getters: {
    expand: state => state.expand,
    favorites: state => state.favorites,
    isFavorites: state => id => state.favorites.filter(item => item.id === id).length > 0,
    video: state => state.video
  }
})
