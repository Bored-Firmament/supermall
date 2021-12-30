<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- v-show 和 slot 不能在同一标签,否则 v-show 无法生效,若要写在同一标签那就用 v-if -->
    <div v-show="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-show="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <!-- class 不要写在 slot 标签上, vue 的标签在编译成 dom 输出时,会替换成原生标签,若原生属性写在 vue 标签会被替换掉导致无法生效 -->
    <!--<div :class="{active : isActive}">-->
    <!--  <slot name="item-text"></slot>-->
    <!--</div>-->
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
    data() {
      return {
        // isActive: false
      }
    },
    computed: {
      isActive() {
        // this.$route.path 当前活跃(选中)的路由
        // this.link 传入的 link 参数(路由的路径)
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