import store from '@/store'

export default (to, from, next) => {
  if (store.getters.video) {
    next()
  } else {
    next('/')
  }
}
