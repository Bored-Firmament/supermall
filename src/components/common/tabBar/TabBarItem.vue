<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-show="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-show="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="ActiveStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      link: String,
      activeColor: {
        type: String,
        default: '#ff5777'
      }
    },
    computed: {
      isActive() {
        return this.$route.path === this.link;
      },
      ActiveStyle() {
        return this.isActive ? {color: this.activeColor} : {};
      }
    },
    methods: {
      itemClick() {
        this.$router.push(this.link);
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
  .active{
    color: #ff5777;
  }
</style>
