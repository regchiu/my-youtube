import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import VideoRequired from '@/utils/VideoRequired'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: () => import('@/views/Favorite.vue')
  },
  {
    path: '/video',
    name: 'Video',
    beforeEnter: VideoRequired,
    component: () => import('@/views/Video.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    return { x: 0, y: 0 }
  }
})

export default router
