<template>
  <nav-bar id="shopcart-nav-bar">
    <template v-slot:center>购物车({{$store.getters.cartLength}})</template>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";

  export default {
    name: "CartNavBar",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  #shopcart-nav-bar{
    background-color: var(--color-tint);
    color: var(--color-background);
  }
</style>
