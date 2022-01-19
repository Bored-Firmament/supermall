import {debounce} from "common/utils";

import BackTop from "components/content/backTop/BackTop";

// 图片加载刷新
export const imageLoadRefreshMixin = {
  data() {
    return {
      refresh: null,
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh);
    // 因为 解除事件监听 需要传入某个具体的事件,所以 事件 应作为变量保存;
    this.itemImageLoadListener = () => {
      this.refresh();
    }
    this.busAddListener();
  },
  methods: {
    busAddListener(){
      this.$bus.$on('imgLoadFull', this.itemImageLoadListener);
    },
    busRemoveListener(){
      this.$bus.$off('imgLoadFull', this.itemImageLoadListener);
    }
  }
}

// 回到顶部
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
      showBackTopSize: 1000,
    }
  },
  methods: {
    backTop(){
      this.$refs.scroll.scrollTo(0, 0);
    },
    isShowBack(position){
      this.isShowBackTop = position > this.showBackTopSize;
    }
  }
}
