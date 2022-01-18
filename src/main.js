import Vue from 'vue'
import App from '@/App.vue'
import router from "@/router";
import store from "@/store";

Vue.config.productionTip = false

// 添加 事件总线 对象 - 事件总线: 与 Vuex 类似,但管理的是 事件;
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
