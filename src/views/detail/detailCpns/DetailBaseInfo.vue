<template>
  <div class="detail-base-info" v-if="Object.keys(baseInfo).length !== 0">
    <div class="info-title">{{baseInfo.title}}</div>
    <div class="info-price">
      <span class="n-price">{{baseInfo.newPrice}}</span>
      <span class="o-price">{{baseInfo.oldPrice}}</span>
      <span
        class="discount"
        v-if="baseInfo.discount"
        :style="{'background-color':baseInfo.discountBG}">{{baseInfo.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{baseInfo.columns[0]}}</span>
      <span>{{baseInfo.columns[1]}}</span>
      <span>{{baseInfo.services[baseInfo.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <!-- v-for="index in (Number)" 中index将是从1-Number的数~ -->
      <span class="info-service-item" v-for="index in baseInfo.services.length-1" :key="index">
        <img :src="baseInfo.services[index-1].icon"/>
        <span>{{baseInfo.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      baseInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  span{
    font-size: 12px;
  }

  .detail-base-info{
    padding: 15px 10px;
    border-bottom: 3px solid #f2f5f8;
  }

  .info-price{
    display: flex;
    align-items: flex-end;
    margin: 10px 0;
  }

  .n-price{
    margin-right: 5px;
    font-size: 20px;
    color: var(--color-high-text);
  }
  .o-price{
    margin-right: 5px;
    font-size: 12px;
    text-decoration: line-through;
    color: #999999;
  }
  .discount{
    border-radius: 5px;
    padding: 2px 5px;
    color: var(--color-background);
    height: 15px;

    position: relative;
    bottom: 5px;
  }

  .info-other{
    display: flex;
    justify-content: space-between;
    color: #999999;
    padding: 5px 0;
    border-bottom: 1px solid #f2f5f8;
  }

  .info-service{
    display: flex;
    justify-content: space-between;
    padding: 20px 0 0;
  }
  .info-service img{
    width: 10px;
  }
</style>
