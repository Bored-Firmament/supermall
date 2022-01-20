<template>
  <div class="category-menu">
    <div
      v-for="(item, index) in category"
      :key="item.maitKey"
      class="category-menu-item"
      :class="{'select-item': currentIndex === index}"
      @click="itemClick(index)">
      <span>{{item.title}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CategoryMenu",
    props: {
      category: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('clickMenuItem', this.category[this.currentIndex]);
      }
    }
  }
</script>

<style scoped>
  .category-menu-item{
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .select-item{
    font-weight: bold;
    color: var(--color-high-text);
    border-left: 2px solid var(--color-high-text);
  }
</style>
