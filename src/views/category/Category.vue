<template>
  <div id="category">
    <category-nav-bar></category-nav-bar>

    <div class="category-main">
      <scroll ref="scrollTheme" class="category-main-left">
        <category-menu :category="category" @clickMenuItem="clickMenuItem"></category-menu>
      </scroll>

      <div class="category-main-right">
        <tab-control
          :list="['流行','新款','精选']"
          @clickTabControlItem="clickTabControlItem"
          ref="tabControl1"
          class="tab-control-1"
          v-show="isShowTabControl"></tab-control>
        <scroll
          ref="scroll"
          id="category-scroll"
          :probe-type="3"
          @scroll="contentScroll"
        >
          <category-sub-menu :sub-category="subCategory"@imgLoadFull="getTbaControlTop()"></category-sub-menu>

          <tab-control
            :list="['流行','新款','精选']"
            @clickTabControlItem="clickTabControlItem"
            ref="tabControl2"
          ></tab-control>

          <goods-list :goods="showGoods" ref="goods" id="category-goods-list"></goods-list>
        </scroll>

        <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import CategoryNavBar from "views/category/categoryCpns/CategoryNavBar";
  import CategoryMenu from "views/category/categoryCpns/CategoryMenu";
  import CategorySubMenu from "views/category/categoryCpns/CategorySubMenu";

  import { getCategory,getSubcategory,getCategoryDetail } from "network/category";

  import { imageLoadRefreshMixin,backTopMixin } from "@/common/mixin";

  export default {
    name: "Category",
    components: {
      Scroll,
      TabControl,
      GoodsList,
      CategoryNavBar,
      CategoryMenu,
      CategorySubMenu
    },
    mixins: [
      imageLoadRefreshMixin,
      backTopMixin
    ],
    data() {
      return {
        category: [],
        subCategory: [],
        miniWallkey: null,
        currentType: 'pop',
        goods: {  // 事实上,下面的page属性可以删除,因为接口目前不提供更多数据
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        isShowTabControl: false,
        tabControlTop: null,
        pageY1: 0,
        pageY2: 0
      }
    },
    created() {
      this.getCategory();
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      },
      getGoodsTabY() {
        return this.goods[this.currentType].scrollY;
      }
    },
    methods: {
      clickMenuItem(event) {
        this.getSubAndList(event);
      },
      clickTabControlItem(event) {
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
        this.$refs.scroll.scrollTo(0,0,0);
        this.isShowTabControl = false;

        // 是否显示回到顶部;
        this.isShowBack(-this.getGoodsTabY);

        this.getCategoryDetail(this.miniWallkey, this.currentType);
      },
      contentScroll(position) {
        this.getTbaControlTop();
        const positionY = - position.y;
        // 1. 返回顶部 是否显示
        this.isShowBack(positionY);
        // 2. 商品tab栏 是否吸顶
        this.isShowTabControl = positionY >= this.tabControlTop;
      },
      getTbaControlTop() {
        // 获取 tab-control 的位置,
        this.tabControlTop = this.$refs.tabControl2.$el.offsetTop;
      },

      // 获取屏幕右边信息(二级列表,商品列表)
      getSubAndList(event) {
        this.currentType = 'pop';
        this.$refs.tabControl1.currentIndex = 0;
        this.$refs.tabControl2.currentIndex = 0;
        this.$refs.scroll.scrollTo(0,0,0);
        this.isShowTabControl = false;

        this.miniWallkey = event.miniWallkey;
        this.getSubcategory(event.maitKey);
        this.getCategoryDetail(event.miniWallkey, this.currentType);
      },

      /**
       * 网络请求相关
       * */
      getCategory() {
        getCategory().then(res => {
          // 保存 一级列表 数据
          this.category = res.data.category.list;
          // 记录 当前选中的 一级列表 的id
          this.miniWallkey = this.category[0].miniWallkey;

          // 默认 展示
          // 调用 获取 二级列表 数据 的方法;
          this.getSubcategory(this.category[0].maitKey);
          // 调用 获取 商品列表 数据 的方法;
          this.getCategoryDetail(this.miniWallkey, this.currentType);
        }).catch(err => {
          console.log('请求商品分类页一级列表出错了-', err);
        })
      },
      getSubcategory(maitKey) {
        getSubcategory(maitKey).then(res => {
          this.subCategory = res.data.list;
        }).catch(err => {
          console.log('请求商品分类页二级列表出错了-', err);
        })
      },
      getCategoryDetail(miniWallkey, type) {
        getCategoryDetail(miniWallkey, type).then(res => {
          let selectType = Object.keys(this.goods).find(item => item === type);

          this.goods[selectType].page=0;
          this.goods[selectType].list=[];
          res.forEach(item => {
            this.goods[selectType].list.push(item);
          })
          ++this.goods[selectType].page;
        }).catch(err => {
          console.log('请求商品分类页商品列表出错了-', err);
        })
      }
    },
    activated() {
      if(this.pageY1 || this.pageY2) {
        this.$refs.scrollTheme.scrollTo(0, this.pageY1, 0);
        this.$refs.scroll.scrollTo(0, this.pageY2, 0);
      }

      this.$refs.scrollTheme.refresh();
      this.$refs.scroll.refresh();

      // 添加该页面的 $bus 的 某个事件; 当然要先 解绑 一下以防重复 绑定
      this.busRemoveListener();
      this.busAddListener();
    },
    deactivated() {
      // 记录离开当前页面时的 Y值;
      this.pageY1 = this.$refs.scrollTheme.getScrollY();
      this.pageY2 = this.$refs.scroll.getScrollY();
      // 移除该页面的 $bus 的 某个事件;
      this.busRemoveListener();
    }
  }
</script>

<style scoped>
  #category{
    position: relative;
    height: calc(100% - 49px);
  }

  .category-main{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
  }
  .category-main-left,category-main-right{
    overflow: hidden;
    height: 100%;
  }
  .category-main-left{
    width: 100px;
    flex: none;
    background-color: #f6f6f6;
  }
  .category-main-right{
    flex: 1;
    overflow: hidden;

    position: relative;
  }
  #category-scroll{
    height: 100%;
  }

  .tab-control-1{
    position: absolute;
    background-color: var(--color-background);
    left: 0;
    right: 0;
    z-index: 9;
  }
</style>
