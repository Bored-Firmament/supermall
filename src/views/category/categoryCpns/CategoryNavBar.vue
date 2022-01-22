<template>
  <nav-bar id="category-nav-bar">
    <template v-slot:center>商品分类</template>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";

  export default {
    name: "CategoryNavBar",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  #category-nav-bar{
    background-color: var(--color-tint);
    color: var(--color-background);
  }
</style>
