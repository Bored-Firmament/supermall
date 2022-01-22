<template>
  <div id="profile">
    <!-- 档案页(个人页)-导航栏 -->
    <nav-bar class="profile-nav-bar">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <!-- 档案页(个人页)-用户基础信息/(登录/注册) -->
    <user-info/>
    <!-- 档案页(个人页)-显示的特定信息 -->
    <user-special-info/>

    <!-- 档案页(个人页)-菜单列表1 -->
    <menu-list-view :menu-list="menuList1"/>
    <!-- 档案页(个人页)-菜单列表2 -->
    <menu-list-view :menu-list="menuList2"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";

  import UserInfo from "views/profile/childComps/UserInfo";
  import UserSpecialInfo from "views/profile/childComps/UserSpecialInfo";
  import MenuListView from "views/profile/childComps/MenuListView";

  export default {
    name: "Profile",
    components: {
      MenuListView,
      UserSpecialInfo,
      UserInfo,
      NavBar
    },
    data() {
      return {
        menuList1: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        menuList2: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    }
  }
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
  width: 100%;
}

.profile-nav-bar {
  background-color: var(--color-tint);
  color: var(--color-background);
}
</style>
