<template>
  <div class="toast" :class="{isShow: !isShow}">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: '',
      isShow: false,
      toastTimeout: null
    },
    methods: {
      show(message='提示', duration=2000) {
        clearTimeout(this.toastTimeout);  // 避免连续触发弹窗后,后续的弹窗没有存在足够的时间就被隐藏了;每次触发都会重置弹窗存在时间;
        this.message = message;
        this.isShow = true;

        this.toastTimeout = setTimeout(() =>{
          this.isShow = false;
          this.message = '';
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;

    transform: translate(-50%, -50%);

    white-space: nowrap;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 10px;
    border-radius: 10px;
  }

  .isShow {
    display: none;
  }
</style>
