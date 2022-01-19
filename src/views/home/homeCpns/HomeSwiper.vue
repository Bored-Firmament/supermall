<template>
  <div id="home-swiper">
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" :alt="item.title" :title="item.title" @load="imgLoadFull"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad: false,
    }
  },
  props: {
    banners: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    imgLoadFull() {
      if(!this.isLoad) {
        this.isLoad = !this.isLoad;
        this.$emit('imgLoadFull');
      }
    }
  }
}
</script>

<style scoped>

</style>
