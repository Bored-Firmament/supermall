<template>
  <tab-bar>
    <tab-bar-item link="/home">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/home.svg" alt="首页"/>
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/home_active.svg" alt="选中首页"/>
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item link="/category">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/category.svg" alt="分类"/>
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/category_active.svg" alt="选中分类"/>
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item link="/shopcart">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/cart.svg" alt="购物车"/>
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/cart_active.svg" alt="选中购物车"/>
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item link="/profile">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/profile.svg" alt="我的"/>
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/profile_active.svg" alt="选中我的"/>
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "@/components/common/tabbar/TabBar";
  import TabBarItem from "@/components/common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem,
    },
  }
</script>

<style scoped>

</style>
