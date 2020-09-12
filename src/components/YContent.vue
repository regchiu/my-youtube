<template>
  <div class="content">
    <div :class="[expand ? 'side-navbar--expand' : 'side-navbar']">
      <router-link
        :class="[$route.name === 'Home' ? 'active' : '']"
        :to="{ name: 'Home' }"
      >
        <img :src="require('@/assets/home.svg')" width="24" height="24" />
        <span>首頁</span>
      </router-link>
      <router-link
        :class="[$route.name === 'Favorite' ? 'active' : '']"
        :to="{ name: 'Favorite' }"
      >
        <img
          :src="require('@/assets/favorite-white.svg')"
          width="24"
          height="24"
        />
        <span>收藏</span>
      </router-link>
    </div>
    <div class="bottom-navbar">
      <router-link
        :class="[$route.name === 'Home' ? 'active' : '']"
        :to="{ name: 'Home' }"
      >
        <img :src="require('@/assets/home.svg')" width="24" height="24" />
        <span>首頁</span>
      </router-link>
      <router-link
        :class="[$route.name === 'Favorite' ? 'active' : '']"
        :to="{ name: 'Favorite' }"
      >
        <img
          :src="require('@/assets/favorite-white.svg')"
          width="24"
          height="24"
        />
        <span>收藏</span>
      </router-link>
    </div>
    <div :class="[expand ? 'main--expand' : 'main']">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'YContent',
  computed: {
    ...mapGetters(['expand'])
  }
}
</script>
<style lang="scss">
.bottom-navbar {
  display: none;
}
.side-navbar {
  height: 100%;
  width: 72px;
  position: fixed;
  top: 56px;
  left: 0;
  background-color: #212121;
  overflow-x: hidden;
  z-index: 1;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 14px;
    text-decoration: none;
    color: #ffffff;
    &:hover {
      background-color: #ffffff3a;
    }
    img {
      margin: 0 0 6px 0;
    }
    span {
      font-size: 10px;
    }
  }
  a.active {
    background-color: #ffffff1a;
  }
}

.side-navbar--expand {
  height: 100%;
  width: 240px;
  position: fixed;
  top: 56px;
  left: 0;
  background-color: #212121;
  overflow-x: hidden;
  padding: 10px 0;
  z-index: 1;
  a {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    padding: 16px 24px;
    color: #ffffff;
    height: 40px;
    &:hover {
      background-color: #ffffff3a;
    }
    img {
      margin: 0 24px 0 0;
    }
    span {
      font-size: 14px;
    }
  }
  a.active {
    background-color: #ffffff1a;
  }
}

.main {
  margin-left: 72px;
  padding: 0px 20px;
}
.main--expand {
  margin-left: 240px;
  padding: 0px 20px;
}

@media (max-width: 600px) {
  .bottom-navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    overflow: hidden;
    background-color: #000000;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1;
    height: 48px;
    border-top: 1px solid #88888866;
    background: #111111;
    color: #eeeeee99;
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ffffff;
      text-decoration: none;
      padding: 4px 0;
      opacity: 0.7;
      width: 100%;
      span {
        font-size: 12px;
      }
    }
    a.active {
      opacity: 1;
    }
  }
  .side-navbar,
  .side-navbar--expand {
    display: none;
  }
  .main,
  .main--expand {
    margin-left: 0;
    padding: 0;
  }
}
</style>
