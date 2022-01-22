import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
  // 1.创建组件构造器;
  const toastConstructor = Vue.extend(Toast);
  // 2.new 的方式,根据组件的构造器,可以创建出一个组件对象;
  const toast = new toastConstructor();
  // 3.将组件对象,手动挂载到一个元素上;
  toast.$mount(document.createElement('div'));
  // 4.将 toast.$el(也就是第三部挂载到的 div) 添加到页面中;
  document.body.appendChild(toast.$el);
  // 5.将 toast 添加到 Vue实例 的原型上,以便可以在 Vue应用 中的任何组件中使用 Toast;
  Vue.prototype.$toast = toast;
}

export default obj
