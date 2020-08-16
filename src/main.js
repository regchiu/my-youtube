import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { youtubeApi } from '@/plugins/axios'
import formatDuration from '@/filters/formatDuration'
import YContainer from '@/components/base/YContainer.vue'
import YLoader from '@/components/base/YLoader.vue'
import '@/styles/global.scss'

Vue.prototype.$youtubeApi = youtubeApi

Vue.config.productionTip = false

Vue.filter('formatDuration', formatDuration)

Vue.component('y-container', YContainer)
Vue.component('y-loader', YLoader)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
