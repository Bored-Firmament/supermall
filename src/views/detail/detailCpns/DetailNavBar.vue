<template>
  <nav-bar class="detail-nav-bar">
    <template v-slot:left>
      <div class="back" @click="clickBack">
        <img src="~assets/img/common/back.svg">
      </div>
    </template>
    <template v-slot:center>
      <div class="title">
        <div
          class="title-item"
          v-for="(item,index) in titles"
          @click="itemClick(index)"
          :class="{active: currentIndex === index}">
          {{item}}
        </div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      clickBack() {
        this.$router.back();
      },
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('clickItem', index);
      }
    }
  }
</script>

<style scoped>
  .detail-nav-bar{
    color: var(--color-text);
  }

  .back{
    text-align: center;
  }
  .back img{
    margin-top: 8px;
    width: 25px;
  }

  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
    font-size: 13px;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
