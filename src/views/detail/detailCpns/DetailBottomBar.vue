<template>
  <div class="detail-bottom-bar">
    <div class="bar-left">
      <div class="bar-left-item service">
        <i></i>
        <span>客服</span>
      </div>
      <div class="bar-left-item shop">
        <i></i>
        <span>店铺</span>
      </div>
      <div class="bar-left-item favorite" :class="{'add-favorite': addFav}" @click="clickFav">
        <i></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-right">
      <div class="bar-right-item add-shopcart-button" @click="addGoods()">
        <span>加入购物车</span>
      </div>
      <div class="bar-right-item buy-button" @click="buyGoods()">
        <span>购买</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    data(){
      return {
        addFav: false
      }
    },
    methods: {
      clickFav(){
        this.addFav = !this.addFav;
      },
      addGoods(){
        this.$emit('addGoods');
      },
      buyGoods(){
        this.$toast.show('后台暂未提供该功能')
      }
    }
  }
</script>

<style scoped>
  .detail-bottom-bar{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    height: 49px;
    box-shadow: 0 -1px 1px rgba(0,0,0,0.05);

    display: flex;
  }

  .bar-left,.bar-right{
    display: flex;
  }
  .bar-left-item{
    width: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .bar-left-item i{
    display: block;
    width: 22px;
    height: 22px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100% no-repeat;
  }
  .bar-left .service i{
    background-position-y: -53px;
  }
  .bar-left .shop i{
    background-position-y: -98px;
  }
  .bar-left .add-favorite i{
    background-position-y: -27px;
  }

  .bar-left-item span{
    font-size: 12px;
    line-height: 20px;
  }

  .bar-right{
    flex: 1;
  }
  .bar-right-item{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bar-right-item span{
    font-size: 12px;
  }

  .add-shopcart-button{
    background-color: #ffe817;
    color: #000;
  }
  .buy-button{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
