<template>
  <div id="app">
    <y-header></y-header>
    <y-content>
      <router-view></router-view>
    </y-content>
  </div>
</template>
<script>
import YHeader from '@/components/YHeader.vue'
import YContent from '@/components/YContent.vue'
export default {
  components: {
    YHeader,
    YContent
  }
}
</script>
