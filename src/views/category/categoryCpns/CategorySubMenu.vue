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
    max-width: 70px;
    flex: 1;

    display: flex;
    flex-direction: column;
    margin: 8px;
    text-align: center;
  }
  .sub-menu-item img{
    max-height: 70px;
  }
  .sub-menu-item span{
    margin-top: 5px;
  }
</style>
