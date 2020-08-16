<template>
  <div class="pagination">
    <a @click.prevent="first">&laquo;</a>
    <a @click.prevent="previous">&lt;</a>
    <template v-for="i in length">
      <template v-if="totalVisible">
        <a
          v-if="i >= min && i <= max"
          :key="i"
          :class="[i === current ? 'active' : '']"
          @click.prevent="input(i)"
          >{{ i }}</a
        >
        <a v-else-if="i === max + 1" :key="i" class="ellipsis">...</a>
      </template>
      <template v-else>
        <a
          :key="i"
          :class="[i === current ? 'active' : '']"
          @click.prevent="input(i)"
          >{{ i }}</a
        >
      </template>
    </template>
    <a @click.prevent="next">&gt;</a>
    <a @click.prevent="last">&raquo;</a>
  </div>
</template>
<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: false,
      default: 1
    },
    length: {
      type: Number,
      required: false,
      default: 0
    },
    totalVisible: {
      type: Number,
      require: false,
      default: 0
    }
  },
  data () {
    return {
      current: this.currentPage
    }
  },
  computed: {
    min () {
      return (
        (Math.ceil(this.current / this.totalVisible) - 1) * this.totalVisible +
        1
      )
    },
    max () {
      return Math.ceil(this.current / this.totalVisible) * this.totalVisible
    }
  },
  methods: {
    first () {
      this.current = 1
      this.$emit('first', this.current)
    },
    last () {
      this.current = this.length
      this.$emit('last', this.current)
    },
    input (i) {
      this.current = i
      this.$emit('input', this.current)
    },
    previous () {
      if (this.current > 1) {
        this.current = this.current - 1
      }
      this.$emit('previous', this.current)
    },
    next () {
      if (this.current < this.length) {
        this.current = this.current + 1
      }
      this.$emit('next', this.current)
    }
  }
}
</script>
<style lang="scss">
.pagination {
  a {
    color: #ffffff;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color 0.3s;
    cursor: pointer;
    &:hover:not(.active):not(.ellipsis) {
      background-color: #ffffff4a;
    }
  }
  a.active {
    background-color: #ffffff2a;
  }
}
@media (max-width: 600px) {
  .pagination {
    a {
      padding: 4px 8px;
    }
  }
}
</style>
