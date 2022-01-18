<template>
  <div id="detail-swiper">
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <img :src="item">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { Swiper,SwiperItem } from "components/common/swiper";
  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  #detail-swiper{
    height: 300px;
  }
</style>
