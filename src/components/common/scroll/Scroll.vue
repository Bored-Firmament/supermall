<template>
  <div class="scroll" ref="wraper">
    <div class="sc-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0,
      },
      pullUpLoad: {
        type: Boolean,
        default: false,
      }
    },
    mounted() {
      // 创建 BScroll 实例,并添加配置信息;
      this.scroll = new BScroll(this.$refs.wraper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      })

      // 实时监听 scroll 事件时, 发出【scroll】事件;
      if(this.probeType == 2 || this.probeType || 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position);
        })
      }

      // 实时监听 pullingUp 事件时, 发出【pullingUp】事件;
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp');
        })
      }
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh();
      },
      getScrollY() {
        return (this.scroll && this.scroll.y) ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>

</style>
