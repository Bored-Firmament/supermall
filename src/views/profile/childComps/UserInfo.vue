<template>
  <div class="user-info">
    <div class="user-icon">
      <slot name="user-icon">
          <img src="~assets/img/common/portrait.svg" alt="头像图标"/>
      </slot>
    </div>

    <div class="login-info">
      <div class="login-or-name">
        <slot name="login-or-name">
          <span>登录/注册</span>
        </slot>
      </div>
      <div class="user-phone-box">
        <span>
          <img src="~assets/img/common/phone.svg" alt="手机图标"/>
        </span>
        <div class="user-phone">
          <slot name="user-phone">
            <span>暂无绑定手机号</span>
          </slot>
        </div>
      </div>
    </div>

    <div class="user-detail">
      <a href="#">
        <slot name="user-detail">
          <span>&gt;</span>
        </slot>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo"
}
</script>

<style scoped>
.user-info {
  width: 100%;
  height: 90px;

  background-color: var(--color-tint);
  color: var(--color-background);

  padding: 15px;

  display: flex;
  justify-content: space-between;
}
/* 用户头像 */
.user-icon {
  width: 60px;
  height: 60px;

  background-color: var(--color-background);
  border-radius: 50%;
}
.user-info img {
  width: 60px;
  height: 60px;
}

/* 用户(注册/登录)/基本信息 */
.login-info {
  flex: 1;
  padding: 10px;
}

.login-or-name {
  font-size: 16px;
}
.user-phone-box {
  margin-top: 5px;
  font-weight: 100;
  font-size: 14px;
  height: 18px;
  line-height: 14px;
}
.user-phone-box img {
  width: 12px;
  height: 18px;

  vertical-align: top;
  margin-right: 5px;
}
.user-phone-box div {
  display: inline-block;
}

/* 用户详情按钮 */
.user-detail {
  width: 20px;
  height: 60px;
  line-height: 60px;
  text-align: center;

  font-family: "宋体";
  font-weight: 700;
}
.user-detail span {
  display: block;
  width: 20px;
  color: var(--color-background);
}
</style>
