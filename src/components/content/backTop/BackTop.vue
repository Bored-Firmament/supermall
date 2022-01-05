<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="回到顶部" title="回到顶部"/>
  </div>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    bottom: 49px;
    right: 0px;
  }
  .back-top img {
    vertical-align: top;
    width: 50px;
    height: 50px;
  }
</style>
