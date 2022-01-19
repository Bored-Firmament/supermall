<template>
  <nav-bar class="shopcart-nav-bar">
    <template v-slot:center>购物车({{$store.getters.cartLength}})</template>
  </nav-bar>
</template>

<script>
  import NavBar from "@/components/common/navBar/NavBar";

  export default {
    name: "CartNavBar",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .shopcart-nav-bar{
    background-color: #ff8198;
    color: #fff;
  }
</style>
