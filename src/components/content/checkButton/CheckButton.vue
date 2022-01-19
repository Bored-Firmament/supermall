<template>
  <div class="check-button" :class="{checked: isCheck}">
    <img src="~assets/img/cart/tick.svg"/>
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isCheck: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #aaa;
    overflow: hidden;
  }

  .checked{
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>
