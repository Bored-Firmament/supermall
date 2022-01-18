<template>
  <div class="goods-list">
    <goods-list-item
      v-for="(item, index) in goods"
      :goods-item="item"
      :key="(item.iid || item.item_id) + index"
    ></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "@/components/content/goods/GoodsListItem";
  export default {
    name: "GoodsList",
    components: {GoodsListItem},
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      getId(item, index) {
        return (item.iid || item.item_id) + index;
      }
    }
  }
</script>

<style scoped>
  .goods-list {
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
