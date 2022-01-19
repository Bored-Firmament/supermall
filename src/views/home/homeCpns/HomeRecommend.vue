<template>
  <div id="home-recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" :title="item.title" @load="imgLoadFull"/>
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
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
  #home-recommend{
    display: flex;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eeeeee;
  }

  .recommend-item{
    flex: 1;
    text-align: center;
  }
  .recommend-item a{
    display: inline-block;
  }

  .recommend-item img{
    width: 65px;
    vertical-align:top;
  }
</style>
