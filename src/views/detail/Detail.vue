<template>
  <div id="detail">
    <detail-nav-bar ref="detailNavBar" @clickItem="clickItem"></detail-nav-bar>
    <scroll
      id="detail-scroll"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="touchEnd">
      <detail-swiper :banners="topImages"></detail-swiper>
      <detail-base-info :base-info="goods"></detail-base-info>
      <detail-shop-info :shop-info="shop"></detail-shop-info>
      <detail-goods-info :goods-info="detailInfo" @imgLoadFull="imgLoadFull"></detail-goods-info>
      <detail-param-info ref="detailParamInfo" :param-info="paramInfo"></detail-param-info>
      <detail-comment ref="detailComment" :comments="comments"></detail-comment>
      <detail-recommend ref="detailRecommend" :recommends="recommends"></detail-recommend>
    </scroll>
    <detail-bottom-bar @addGoods="addGoods()"></detail-bottom-bar>

    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import DetailNavBar from "views/detail/detailCpns/DetailNavBar";
  import DetailSwiper from "views/detail/detailCpns/DetailSwiper";
  import DetailBaseInfo from "views/detail/detailCpns/DetailBaseInfo";
  import DetailShopInfo from "views/detail/detailCpns/DetailShopInfo";
  import DetailGoodsInfo from "views/detail/detailCpns/DetailGoodsInfo";
  import DetailParamInfo from "views/detail/detailCpns/DetailParamInfo";
  import DetailComment from "views/detail/detailCpns/DetailComment";
  import DetailRecommend from "views/detail/detailCpns/DetailRecommend";
  import DetailBottomBar from "@/views/detail/detailCpns/DetailBottomBar";

  import { getDetail,getDetailRecommend,Goods,Shop,GoodsParam } from "network/detail";

  import { imageLoadRefreshMixin,backTopMixin } from "common/mixin";

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComment,
      DetailRecommend,
      DetailBottomBar
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        comments: [],
        recommends: [],
        themeTopYs: [],
        currentIndex: 0
      }
    },
    mixins:[
      imageLoadRefreshMixin,
      backTopMixin
    ],
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.query.iid;
      // 2.根据iid请求详情数据
      this.getDetail(this.iid);
      // 3.获取推荐商品数据
      this.getDetailRecommend();
    },
    updated() {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.detailParamInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.detailRecommend.$el.offsetTop);
    },
    destroyed() {
      this.busRemoveListener();
    },
    methods: {
      /**
       * 事件监听
       * */
      imgLoadFull() {
        this.refresh();
      },
      clickItem(index){
        this.currentIndex = index;
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 0);
        // 滚动时间为0 可以避免 顶部导航栏 选中闪烁;产生新问题——回到顶部 不显示;
        this.isShowBack(this.themeTopYs[index]);
      },
      addGoods(){
        // 后台提供的接口无法更好的完成,只能这样了;
        let product = {};
        product.iid = this.iid;
        product.title = this.goods.title;
        product.image = this.topImages[0];
        product.price = this.goods.realPrice;
        product.desc = this.detailInfo.desc;
        this.$store.dispatch('addGoods',product).then(res => {
          this.$toast.show(res);
        });
      },
      contentScroll(position) {
        const positionY = -position.y;
        // 1. 返回顶部 是否显示
        this.isShowBack(positionY);
        // 2. 关联 内容滚动 和 顶部导航栏 的选中;
        const length = this.themeTopYs.length;
        for(let i = 0; i < length; i++){
          if((this.currentIndex !== i)
            && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
              || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i;
            this.$refs.detailNavBar.currentIndex = this.currentIndex;
          }
        }
      },
      touchEnd() {
        this.$toast.show("已经触底啦,目前没有更多的推荐商品~");
        // 完成上拉;
        this.$refs.scroll.finishPullUp();
      },

      /**
       * 网络请求相关
       * */
      getDetail(iid) {
        getDetail(iid)
          .then(res => {
            const data = res.result;
            // 2.1 获取顶部的图片轮播数据
            this.topImages = data.itemInfo.topImages;
            // 2.2 获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
            // 2.3 获取店铺信息
            this.shop = new Shop(data.shopInfo);
            // 2.4 获取商品详情
            this.detailInfo = data.detailInfo;
            // 2.5 获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
            // 2.6 获取评论信息
            if (data.rate.list) {
              this.comments = data.rate.list;
            }
          }).catch(err => {
            console.log('请求商品详情资源出错啦！', err);
          })
      },
      getDetailRecommend() {
        getDetailRecommend()
          .then(res => {
            this.recommends = res.data.list;
          }).catch(err => {
            console.log('请求推荐商品资源出错啦！', err);
          })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    height: calc(100%);
  }

  #detail-scroll{
    overflow: hidden;

    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }
</style>
