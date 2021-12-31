<template>
  <div class="nav-bar">
    <div class="nav-bar-item">
      <slot name="left"></slot>
    </div>
    <div class="nav-bar-item">
      <slot name="center"></slot>
    </div>
    <div class="nav-bar-item">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
name: "NavBar"
}
</script>

<style scoped>
.nav-bar{
  line-height: 44px;
  height: 44px;
  background-color: var(--color-tint);
  color: var(--color-background);
  display: flex;

  box-shadow: 0 1px 1px rgba(100, 100, 100, .2);
}

.nav-bar-item{
  width: 60px;
}
.nav-bar-item:nth-child(2){
  flex: 1;
  text-align: center;
  font-size: 18px;
}

</style>
