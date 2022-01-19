<template>
  <div class="home-feature">
    <a href="http://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" alt="" @load="$emit('imgLoadFull')"/>
    </a>
  </div>
</template>

<script>
  export default {
    name: "HomeFeature"
  }
</script>

<style scoped>
  .home-feature img{
    width: 100%;
  }
</style>
