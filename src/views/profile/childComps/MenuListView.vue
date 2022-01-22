<template>
  <div class="menu-list-view">
    <div v-for="item in menuList" class="menu-item">
      <span class="icon">
        <svg :fill="item.iconColor">
          <use :xlink:href="item.icon"></use>
        </svg>
      </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuListView",
  props: {
    menuList: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
.menu-list-view {
  margin-top: 10px;
  background-color: var(--color-background);
}
.menu-item {
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  height: 40px;
  line-height: 20px;
  padding: 10px;
}
.menu-item:last-child {
  border-bottom: none;
}

.menu-item svg {
  width: 20px;
  height: 20px;
  margin: 0 10px;
}
</style>
