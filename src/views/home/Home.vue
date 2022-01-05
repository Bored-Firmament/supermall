<template>
  <div id="home">
    <nav-bar>
      <template v-slot:center>购物街</template>
    </nav-bar>

    <tab-control
      :list="['流行','新款','精选']"
      @clickTabControlItem="clickTabControlItem"
      ref="tabControl1"
      class="tab-control-1"
      v-show="isShowTabControl"/>
    <scroll
      id="home-scroll"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @imgLoadFull="swiperImgLoadFull"/>
      <home-recommend :recommends="recommends"/>
      <home-feature/>

      <tab-control
        :list="['流行','新款','精选']"
        @clickTabControlItem="clickTabControlItem"
        ref="tabControl2"/>
      <goods-list :goods="showGoods" ref="goods"></goods-list>
    </scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop";

  import HomeSwiper from "views/home/homeCpns/HomeSwiper";
  import HomeRecommend from "views/home/homeCpns/HomeRecommend";
  import HomeFeature from "views/home/homeCpns/HomeFeature";

  import { getHomeMultidata,getHomeGoods } from "network/home";

  import { debounce } from "common/utils.js";

  export default {
    name: "Home",
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
        refresh: null,
        isShowBackTop: false,
        isShowTabControl: false,
        tabControlTop: null,
        goodsTop: null,
        scrollY: null,
      }
    },
    components: {
      BackTop,
      Scroll,
      GoodsList,
      TabControl,
      HomeFeature,
      HomeRecommend,
      NavBar,
      HomeSwiper,
    },
    created() {
      // 获取 轮播图 及 推荐商品 数据;
      this.getHomeMultidata();
      // 获取 商品列表 数据;
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      // 事件总线 管理 图片加载完成 事件; 事件触发 使用 scroll 的 refresh() 刷新 scroll 的 可滚动高度;
      this.refresh = debounce(this.$refs.scroll.refresh);
      this.$bus.$on('imgLoadFull', () => {
        this.refresh();
      })
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
      },
      // scroll 滚动时实时触发;
      contentScroll(position) {
        // 1. 返回顶部 是否显示
        this.isShowBackTop = (- position.y) > 1000;
        // 2. 商品tab栏 是否吸顶
        this.isShowTabControl = (- position.y) >= this.tabControlTop;
      },
      backTop() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
      },
      // 轮播图加载完成后触发该函数(否则图片未加载的位置不正确);
      swiperImgLoadFull() {
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
            console.log('请求首页基本资源出错啦！', err);
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
            console.log('请求首页商品资源出错啦！', err);
          });
      }
    },
    deactivated() {
      this.scrollY = this.$refs.scroll.getScrollY();
    },
    activated() {
      if(this.scrollY) {
        this.$refs.scroll.scrollTo(0, this.scrollY, 0);
        this.$refs.scroll.refresh();
      }
    }
  }
</script>

<style scoped>
  #home{
    position: relative;
    height: calc(100% - 49px);
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
