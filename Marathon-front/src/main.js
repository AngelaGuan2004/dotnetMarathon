import Vue from 'vue'
import App from './App.vue'
//引入elm组件
import ElementUI from 'element-ui';
Vue.use(ElementUI);
//引入路由器
import router from './router'
//引入VueRouter
import VueRouter from 'vue-router'
// 防止连续跳转同一路由时的错误
let push = VueRouter.prototype.push;
let replace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location) {
  push.call(this, location, () => { }, () => { });
}
VueRouter.prototype.replace = function (location) {
  replace.apply(this, [location, () => { }, () => { }]);
}
Vue.use(VueRouter)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
