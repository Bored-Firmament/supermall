<template>
  <div id="shopcart">
    <cart-nav-bar></cart-nav-bar>

    <scroll
      id="shopcart-scroll"
      ref="scroll">
      <cart-list></cart-list>
    </scroll>

    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartNavBar from "views/shopcart/shopcartCpns/CartNavBar";
  import CartList from "views/shopcart/shopcartCpns/CartList";
  import CartBottomBar from "views/shopcart/shopcartCpns/CartBottomBar";

  import { imageLoadRefreshMixin } from "common/mixin";

  export default {
    name: "Shopcart",
    components: {
      Scroll,
      CartList,
      CartBottomBar,
      CartNavBar
    },
    mixins: [
      imageLoadRefreshMixin
    ],
    deactivated() {
      // 移除该页面的 $bus 的 某个事件;
      this.busRemoveListener();
    },
    activated() {
      this.$refs.scroll.refresh();
      // 添加该页面的 $bus 的 某个事件; 当然要先 解绑 一下以防重复 绑定
      this.busRemoveListener();
      this.busAddListener();
    }
  }
</script>

<style scoped>
  #shopcart{
    position: relative;
    height: calc(100% - 49px);
  }

  #shopcart-scroll{
    overflow: hidden;

    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 30px;
  }
</style>
