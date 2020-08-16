<template>
  <nav class="navbar">
    <ul class="start">
      <li>
        <a class="menu" @click="setExpand">
          <img :src="require('@/assets/menu.svg')" width="24" height="24" />
        </a>
      </li>
      <li>
        <router-link class="logo" :to="{ name: 'Home' }">
          <img :src="require('@/assets/YouTube_logo.svg')" />
        </router-link>
        <span>TW</span>
      </li>
    </ul>
    <div class="center">
      <div class="search-box">
        <input class="search-input" type="text" placeholder="搜尋" />
        <button class="search-btn">
          <i class="search-icon"></i>
        </button>
      </div>
    </div>
    <ul class="end">
      <li>
        <button class="avatar" @click="showDialog">
          <img :src="require('@/assets/avatar.jpg')" alt="avatar" />
        </button>
      </li>
    </ul>
    <y-dialog :show="show" @close="closeDialog"/>
  </nav>
</template>
<script>
import { mapMutations } from 'vuex'
import YDialog from '@/components/YDialog.vue'
export default {
  name: 'YHeader',
  components: {
    YDialog
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    ...mapMutations(['setExpand']),
    showDialog () {
      this.show = true
    },
    closeDialog () {
      this.show = false
    }
  }
}
</script>
<style lang="scss">
.navbar {
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: #212121;
  height: 56px;
  width: 100%;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul {
    display: flex;
    align-items: center;
    li {
      list-style: none;
    }
  }
}

button {
  border: none;
  background: none;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.start {
  flex: 1;
  li {
    &:first-child {
      margin-right: 16px;
    }
    &:last-child {
      display: flex;
      span {
        color: #aaaaaa;
        margin-left: 2px;
        font-size: 10px;
      }
    }
  }
  .logo,
  .menu {
    @extend button;
  }
  .logo {
    img {
      width: 80px;
      height: 24px;
    }
  }
  .menu {
    padding: 8px;
    object-fit: contain;
    &:active {
      background-color: #525252;
      border-radius: 50%;
    }
  }
}

.center {
  max-width: 728px;
  flex: 1;
  .search-box {
    margin-left: 40px;
    display: flex;
    .search-input {
      padding: 3px 6px 3px 8px;
      border: 1px solid #303030;
      border-right: none;
      border-radius: 2px 0 0 2px;
      width: 100%;
      font-family: "Roboto", "Noto", sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      background-color: #000000;
      color: #525252;
      &:focus {
        outline: none;
        border: 2px solid #065fd4;
      }
      &::placeholder {
        color: #757575;
        opacity: 0.9;
      }
    }
    .search-btn {
      width: 65px;
      border: 1px solid #303030;
      border-radius: 0 2px 2px 0;
      margin: 0;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.08);
      cursor: pointer;
      .search-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-size: contain;
        transform: rotate(270deg);
        background-image: url("../assets/search.svg");
        opacity: 0.6;
      }
      &:hover {
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
        .search-icon {
          opacity: 1;
        }
      }
    }
  }
}

.end {
  flex: 1;
  justify-content: flex-end;
  .avatar {
    cursor: pointer;
    img {
      width: 32px;
      height: 32px;
      border-radius: 50px;
    }
  }
}
@media (max-width: 600px) {
  .navbar {
    background-color: #000000;
    height: 48px;
  }
  .start {
    li {
      &:first-child {
        margin-right: 0;
      }
    }
    .menu {
      display: none;
    }
    .logo {
      img {
        width: 89px;
        height: 20px;
      }
    }
  }
  .center {
    .search-box {
      margin: 0;
      justify-content: flex-end;
      .search-input {
        display: none;
      }
      .search-btn {
        width: 24px;
        border: none;
        background: none;
        .search-icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          transform: none;
          background-size: contain;
          background-image: url("../assets/search-xs.svg");
          opacity: 1;
        }
      }
    }
  }
  .end {
    flex: 0;
    li {
      margin-left: 30px;
    }
    .avatar {
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
