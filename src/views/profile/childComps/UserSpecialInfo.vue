<template>
  <div class="user-special-info">
    <div class="special-info-item">
      <div>
        <span>0.00</span>元
      </div>
      <div>我的余额</div>
    </div>
    <div class="special-info-item">
      <div>
        <span>0</span>个
      </div>
      <div>我的优惠</div>
    </div>
    <div class="special-info-item last">
      <div>
        <span>0</span>分
      </div>
      <div>我的积分</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSpecialInfo"
}
</script>

<style scoped>
.user-special-info {
  display: flex;
  font-size: 14px;
}
.special-info-item {
  height: 80px;
  flex: 1;
  text-align: center;

  padding: 20px;
  background-color: var(--color-background);
}
.special-info-item:nth-child(2) {
  margin: 0 1px;
}

span {
  font-size: 22px;
  font-weight: 700;
  color: #ff5f3e;
}
</style>
