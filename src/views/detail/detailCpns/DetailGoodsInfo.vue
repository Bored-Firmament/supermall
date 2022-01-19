<template>
  <div class="detail-goods-info" v-if="Object.keys(goodsInfo).length !== 0">
    <div class="info-desc" v-if="goodsInfo.desc !== ''">
      <div class="start"></div>
      <div class="desc">{{goodsInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div v-for="(itemInfo,itemIndex) in goodsInfo.detailImage">
      <div class="info-key">{{itemInfo.key}}</div>
      <div class="info-list">
        <img :src="item" v-for="item in itemInfo.list" @load="imgLoadFull(itemIndex)"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      goodsInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        imgCount: [],
        imgLoadFullCount: [],
      }
    },
    updated() {
      // 避免重复赋值~
      if(this.imgCount && this.imgCount.length == 0) {
        // 记录 图片列表 的图片数量 的数组;
        // 添加 图片列表 对应的 已完成加载 的图片 的数组;
        for(let index in this.goodsInfo.detailImage){
          this.imgCount[index] = this.goodsInfo.detailImage[index].list.length;
          this.imgLoadFullCount.push(0);
        }
      }
    },
    methods: {
      imgLoadFull(itemIndex) {
        if(++this.imgLoadFullCount[itemIndex] === this.imgCount[itemIndex]) this.$emit('imgLoadFull');
      }
    }
  }
</script>

<style scoped>
  .detail-goods-info{
    padding: 10px 0;
    border-bottom: 3px solid #f2f5f8;
  }

  .info-desc{
    padding: 0 10px;
  }
  .start,.end{
    border-top: 1px solid #000;
    width: 100px;
    position: relative;
  }
  .start::after,.end::after{
    content: "";
    display: block;
    width: 5px;
    height: 5px;
    background-color: #000;

    position: absolute;
    bottom: 0;
  }
  .start{
    float: left;
  }
  .desc{
    padding: 15px 0px;
    font-size: 12px;
  }
  .end{
    float: right;
  }
  .end::after{
    right: 0;
  }

  .info-key{
    padding: 5px 10px;
  }

  .info-list img{
    width: 100%;
  }
</style>
