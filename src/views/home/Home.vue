<template>
  <div id="home">
    <nav-bar id="home-nav-bar">
      <template v-slot:center>购物街</template>
    </nav-bar>

    <tab-control
      :list="['流行','新款','精选']"
      @clickTabControlItem="clickTabControlItem"
      ref="tabControl1"
      class="tab-control-1"
      v-show="isShowTabControl"></tab-control>
    <scroll
      id="home-scroll"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @imgLoadFull="bigImgLoadFull"></home-swiper>
      <home-recommend :recommends="recommends" @imgLoadFull="bigImgLoadFull"></home-recommend>
      <home-feature @imgLoadFull="bigImgLoadFull"></home-feature>

      <tab-control
        :list="['流行','新款','精选']"
        @clickTabControlItem="clickTabControlItem"
        ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods" ref="goods"></goods-list>
    </scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import HomeSwiper from "views/home/homeCpns/HomeSwiper";
  import HomeRecommend from "views/home/homeCpns/HomeRecommend";
  import HomeFeature from "views/home/homeCpns/HomeFeature";

  import { getHomeMultidata,getHomeGoods } from "network/home";

  import { imageLoadRefreshMixin,backTopMixin } from "common/mixin";

  export default {
    name: "Home",
    components: {
      Scroll,
      GoodsList,
      TabControl,
      HomeFeature,
      HomeRecommend,
      NavBar,
      HomeSwiper,
    },
    mixins:[
      imageLoadRefreshMixin,
      backTopMixin
    ],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0,list: [],scrollY:null},
          new: {page: 0,list: [],scrollY:null},
          sell: {page: 0,list: [],scrollY:null}
        },
        currentType: 'pop',
        isShowTabControl: false,
        tabControlTop: null,
        goodsTop: null,
        scrollY: null,
      }
    },
    created() {
      // 获取 轮播图 及 推荐商品 数据;
      this.getHomeMultidata();
      // 获取 商品列表 数据;
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      },
      getGoodsTabY: {
        set(newValue) {
          this.goods[this.currentType].scrollY = newValue;
        },
        get() {
          return this.goods[this.currentType].scrollY;
        }
      }
    },
    methods: {
      /**
       * 事件监听相关
       * */
      clickTabControlItem(event) {
        // 获取 当前 商品类型 时所在的 y 值;
        this.getGoodsTabY = this.$refs.scroll.getScrollY();
        // 修改 当前 商品类型;
        switch (event){
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = event;
        this.$refs.tabControl2.currentIndex = event;
        // 滚动到 当前 商品类型 所在的 y 值;如果有的话;
        if(this.getGoodsTabY && -this.getGoodsTabY >= this.goodsTop) {
          this.$refs.scroll.scrollTo(0, this.getGoodsTabY, 0);
        }else if(-this.getGoodsTabY < this.goodsTop) {
          this.$refs.scroll.scrollTo(0, -this.goodsTop, 100);
        }
        // 是否显示回到顶部;
        this.isShowBack(-this.getGoodsTabY);
      },
      // scroll 滚动时实时触发;
      contentScroll(position) {
        const positionY = - position.y;
        // 1. 返回顶部 是否显示
        this.isShowBack(positionY);
        // 2. 商品tab栏 是否吸顶
        this.isShowTabControl = positionY >= this.tabControlTop;
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
      },
      // 商品选项卡之上的图片 加载完成后触发该函数(否则图片未加载的位置不正确);
      bigImgLoadFull() {
        // 获取 tab-control 的位置,
        this.tabControlTop = this.$refs.tabControl2.$el.offsetTop;
        // 获取 商品列表 的位置,
        this.goodsTop = this.$refs.goods.$el.offsetTop - this.$refs.tabControl2.$el.offsetHeight;
      },

      /**
      * 网络请求相关
      * */
      getHomeMultidata() {
        getHomeMultidata()
          .then(res => {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          }).catch(err => {
            console.log('请求首页基本资源出错了-', err);
          });
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page)
          .then(res => {
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1;

            // 完成上拉;
            this.$refs.scroll.finishPullUp();
          }).catch(err => {
            console.log('请求首页商品资源出错了-', err);
          });
      }
    },
    deactivated() {
      // 记录离开当前页面时的 Y值;
      this.scrollY = this.$refs.scroll.getScrollY();
      // 移除该页面的 $bus 的 某个事件;
      this.busRemoveListener();
    },
    activated() {
      if(this.scrollY) {
        this.$refs.scroll.scrollTo(0, this.scrollY, 0);
        this.$refs.scroll.refresh();
      }
      // 添加该页面的 $bus 的 某个事件; 当然要先 解绑 一下以防重复 绑定
      this.busRemoveListener();
      this.busAddListener();
    }
  }
</script>

<style scoped>
  #home{
    position: relative;
    height: calc(100% - 49px);
  }

  #home-nav-bar{
    background-color: var(--color-tint);
    color: var(--color-background);
  }

  #home-scroll{
    overflow: hidden;

    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 0;
  }
  .tab-control-1{
    position: absolute;
    background-color: var(--color-background);
    left: 0;
    right: 0;
    z-index: 9;
  }
</style>
