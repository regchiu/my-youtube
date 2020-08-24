<template>
  <div class="card">
    <div class="card__header" @click="click">
      <img :src="img" style="width:100%"/>
      <div class="duration">
        <span>{{ duration | formatDuration }}</span>
      </div>
    </div>
    <div class="card__body" @click="click">
      <h3 class="title">{{ title }}</h3>
      <div class="description">{{ description }}</div>
    </div>
    <div class="card__footer">
      <button v-if="isFavorites(id)" @click="remove">
        <img
          :src="require('@/assets/favorite-white.svg')"
          width="24"
          height="24"
        />
      </button>
      <button v-else @click="add">
        <img
          :src="require('@/assets/favorite_border-white.svg')"
          width="24"
          height="24"
        />
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'YVideoCard',
  props: {
    id: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: false,
      default: ''
    },
    duration: {
      type: String,
      required: false,
      default: '00:00'
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['isFavorites'])
  },
  methods: {
    add () {
      this.$emit('add')
    },
    remove () {
      this.$emit('remove')
    },
    click () {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss">
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 322.23px;
  text-align: center;
  cursor: pointer;
  .card__header {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    .duration {
      position: absolute;
      background-color: #000000cc;
      border-radius: 2px;
      margin: 4px;
      letter-spacing: 0.5px;
      span {
        padding: 3px 4px;
        font-size: 12px;
        color: #ffffff;
      }
    }
  }
  .card__body {
    margin: 20px 24px 0 0;
    .title {
      margin: 12px 0 4px 0;
      font-size: 14px;
      text-align: left;
    }
    .description {
      font-size: 13px;
      color: #aaaaaa;
      overflow: hidden;
      position: relative;
      font-style: normal;
      line-height: 1.2em;
      max-height: 3.6em;
      text-align: justify;
      padding-right: 2em;
      &:before {
        content: "......";
        position: absolute;
        right: 0;
        bottom: 0;
      }
      &:after {
        content: "";
        position: absolute;
        right: 0;
        width: 2em;
        height: 1em;
        margin-top: 0.2em;
        background: #ffffff;
      }
    }
  }
  .card__footer {
    margin-top: 10px;
    button {
      border: none;
      display: flex;
      align-items: center;
      background: none;
      cursor: pointer;
      float: right;
    }
  }
}
@media (max-width: 600px) {
  .card {
    max-width: 100%;
    .card__body{
      padding: 0 10px;
    }
    .card__footer{
      padding: 0 10px;
    }
  }
}
</style>
