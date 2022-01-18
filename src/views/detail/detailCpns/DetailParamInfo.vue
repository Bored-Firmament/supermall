<template>
  <div class="detail-param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table v-for="(table,tIndex) in paramInfo.sizes" class="info-sizes" :key="tIndex">
      <tr v-for="(sizes,sIndex) in table" class="info-item" :key="sIndex">
        <td v-for="(size,index) in sizes" :key="index">{{size}}</td>
      </tr>
    </table>

    <table class="info-infos">
      <tr v-for="info in paramInfo.infos" class="info-item">
        <td>{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>

    <div class="info-imgs" v-if="paramInfo.image">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailParamInfo",
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  table{
    width: 100%;
    border-collapse: collapse;
  }
  td{
    font-size: 12px;
  }

  .detail-param-info{
    padding: 10px;
    border-bottom: 3px solid #f2f5f8;
  }

  .info-item{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f2f5f8;
  }
  .info-item td:first-child{
    width: 65px;
  }

  .info-infos{
    border-top: 3px solid #f2f5f8;
  }
  .param-value{
    color: var(--color-high-text);
  }

  .info-imgs img{
    width: 100%;
  }
</style>
