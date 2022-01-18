<template>
  <div class="detail-recommend">
    <div class="info-header">热门推荐</div>
    <goods-list :goods="recommends"></goods-list>
  </div>
</template>

<script>
  import GoodsList from "components/content/goods/GoodsList";

  export default {
    name: "DetailRecommend",
    components: {
      GoodsList
    },
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .info-header{
    padding: 0 10px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f2f5f8;
    margin-bottom: 10px;
  }
</style>
