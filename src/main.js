import Vue from 'vue';
// 配置
import App from '@/App.vue';
import router from "@/router";
import store from "@/store";
// 第三方插件
import VueLazyload from "vue-lazyload"; // 图片懒加载
import FastClick from "fastclick";      // 解决 移动端 点击300ms延迟 问题
// 自定义插件
import Toast from "components/common/toast";

// 开发时可以启用的提示(针对一些常见的错误)~生产环境可以关闭~
Vue.config.productionTip = false

// 添加 事件总线 对象 - 事件总线: 与 Vuex 类似,但管理的是 事件;
Vue.prototype.$bus = new Vue();
// 使用插件
// 有内置 install 函数
Vue.use(Toast);
Vue.use(VueLazyload, {
  loading: require('assets/img/common/placeholder.png'),
  error: require('assets/img/common/error.png')
});
// 无内置 install 函数
FastClick.attach(document.body);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
