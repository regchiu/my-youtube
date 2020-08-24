<template>
  <div class="overlay" v-show="show">
    <div class="overlay__header">
      <a class="close-btn" @click.prevent="close">&times;</a>
      <h1>帳戶</h1>
    </div>
    <div class="overlay__account">
      <a class="account-photo">
        <img class="avatar" :src="require('@/assets/avatar.jpg')" />
      </a>
      <div class="account-information">
        <div class="name">Reg Chiu</div>
        <div class="email">regx1385@gmail.com</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.overlay {
  display: block;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  background-color: #282828;
  a {
    padding: 8px;
    text-decoration: none;
    font-size: 36px;
    color: #eeeeee99;
    display: block;
    cursor: pointer;
    &:active,
    &:hover {
      color: #f1f1f1;
    }
  }
  .overlay__header {
    padding: 6px 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.2);
    .close-btn {
      margin: 0 24px 0 0;
      width: 40px;
      height: 40px;
      font-size: 24px;
    }
    h1 {
      font-size: 16px;
      font-weight: 500;
      color: #eeeeee;
    }
  }
  .overlay__account {
    margin: 12px 0;
    display: flex;
    flex-direction: row;
    .account-photo {
      width: 72px;
      height: 72px;
      padding: 12px;
      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    .account-information {
      padding: 8px 0;
      .name,
      .email {
        font-size: 16px;
        color: #eeeeee;
      }
      .email {
        margin-top: 5px;
      }
    }
  }
}
</style>
