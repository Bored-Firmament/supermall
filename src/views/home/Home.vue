<template>
  <div>
    <nav-bar>
      <template v-slot:center>购物街</template>
    </nav-bar>

    <home-swiper :banners="banners"/>
    <home-recommend :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwiper from "@/views/home/homeCpns/HomeSwiper";
  import HomeRecommend from "@/views/home/homeCpns/HomeRecommend";

  import { getHomeMultidata } from "@/network/home";

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    components: {
      HomeRecommend,
      NavBar,
      HomeSwiper,
    },
    created() {
      getHomeMultidata()
        .then(res => {
          console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        }).catch(err => {
          console.log('请求首页基本资源出错啦！', err);
        });
    }
  }
</script>

<style scoped>

</style>
