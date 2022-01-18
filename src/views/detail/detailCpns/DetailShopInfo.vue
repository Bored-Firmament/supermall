<template>
  <div class="detail-shop-info" v-if="Object.keys(shopInfo).length !== 0">
    <div class="shop-logo">
      <img :src="shopInfo.logo" :alt="shopInfo.name" :title="shopInfo.name"/>
      <span>{{shopInfo.name}}</span>
    </div>
    <div class="shop-message">
      <div class="shop-m-left">
        <div class="info-sells">
          <span class="info-value">{{shopInfo.sells | sellCouontFilter}}</span>
          <span>总销量</span>
        </div>
        <div class="info-count">
          <span class="info-value">{{shopInfo.goodsCount}}</span>
          <span>全部宝贝</span>
        </div>
      </div>
      <div class="shop-m-right">
        <table>
          <tr v-for="(item, index) in shopInfo.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
            <td class="score-text" :class="{'score-text-better':item.isBetter}">
              <span>{{item.isBetter ? '高' : '低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-button">
      <span class="enter-shop">进店逛逛</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    sellCouontFilter(sells) {
      let finishSells = 0;
      if(sells >= 10000) {
        finishSells = (sells / 10000).toFixed(1) + '万';
      }
      return finishSells;
    }
  }
}
</script>

<style scoped>
  span{
    font-size: 12px;
  }

  .detail-shop-info{
    padding: 20px 10px;
    border-bottom: 3px solid #f2f5f8;
  }

  .shop-logo{
    display: flex;
  }
  .shop-logo img{
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .shop-logo span{
    line-height: 40px;
  }

  .shop-message{
    display: flex;
    text-align: center;
    margin: 10px 0;
    line-height: 20px;
  }
  .shop-m-left{
    flex: 1;
    display: flex;
    margin: 16px 0;
    border-right: 1px solid #f2f5f8;
  }
  .info-sells,.info-count{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .info-value{
    font-size: 16px;
  }
  .shop-m-right{
    flex: 1;
  }
  .shop-m-right table{
    margin-left: 20px;
    flex-direction: column;
  }
  .shop-m-right td{
    text-align: left;
    font-size: 12px;
    height: 10px;
    padding-right: 10px;
  }
  .score{
    color: #5ea732;
  }
  .score-text span{
    background-color: #5ea732;
    color: var(--color-background);
  }
  .score-better{
    color: #f13e3a;
  }
  .score-text-better span{
    background-color: #f13e3a;
    color: var(--color-background);
  }

  .shop-button{
    text-align: center;
  }
  .enter-shop{
    display: block;
    background-color: #f2f5f8;
    width: 120px;
    height: 25px;
    line-height: 25px;
    border-radius: 10px;
    margin: auto;
  }

</style>
