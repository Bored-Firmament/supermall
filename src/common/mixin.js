import {debounce} from "common/utils";

import BackTop from "components/content/backTop/BackTop";

// 图片列表加载刷新
export const itemImageLoadRefreshMixin = {
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

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
}
