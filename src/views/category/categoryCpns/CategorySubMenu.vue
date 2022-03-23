<template>
  <div class="category-sub-menu">
    <a
      v-for="item in subCategory"
      class="sub-menu-item"
      :href="item.link">
      <img :src="item.image" alt="title" @load="imgLoadFull()"/>
      <span>{{item.title}}</span>
    </a>
  </div>
</template>

<script>
  export default {
    name: "CategorySubMenu",
    props: {
      subCategory: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imgLoadFull(){
        this.$emit('imgLoadFull');
      }
    }
  }
</script>

<style scoped>
  .category-sub-menu{
    display: flex;
    flex-wrap: wrap;
  }
  .sub-menu-item{
    width: 33%;
    margin: 8px 0;

    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .sub-menu-item:nth-child(3n+1),
  .sub-menu-item:nth-child(3n+2) {
    margin-right: 0.5%;
  }
  .sub-menu-item img{
    width: 70px;
    height: 70px;
    margin: auto;
  }
  .sub-menu-item span{
    margin-top: 5px;
  }
</style>
