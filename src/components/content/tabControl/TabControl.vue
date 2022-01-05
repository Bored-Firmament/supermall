<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      :class="{'tab-control-active': currentIndex === index}"
      @click="clickTabControlItem(index)"
      v-for="(item, index) in list">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      list: {
        type: Array,
        default() {
          return  []
        }
      }
    },
    methods: {
      clickTabControlItem(index) {
        this.currentIndex = index;
        this.$emit('clickTabControlItem',index);
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-active span{
    padding: 5px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>
