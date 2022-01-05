<template>
  <div class="goods-item" @click="clickGoodsItem">
    <img :src="goodsItem.show.img" @load="imgLoadFull"/>
    <div class="goods-item-text">
      <p class="goods-item-title">{{goodsItem.title}}</p>
      <span class="goods-item-price">{{goodsItem.price}}</span>
      <span class="goods-item-favorite">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoadFull() {
      this.$bus.$emit('imgLoadFull');
    },
    clickGoodsItem() {
      this.$router.push('/detail/' + this.goodsItem.iid);
    }
  }
}
</script>

<style scoped>
  .goods-item{
    width: 47%;
  }

  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }

  .goods-item-text{
    text-align: center;
  }

  .goods-item-text p,
  .goods-item-text span{
    font-size: 12px;
  }

  .goods-item-title{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .goods-item-price{
    color: var(--color-high-text);
  }
  .goods-item-favorite{
    padding-left: 20px;
    background: url("~assets/img/common/collect.svg") 5px -1px/14px 14px no-repeat;
  }
</style>
