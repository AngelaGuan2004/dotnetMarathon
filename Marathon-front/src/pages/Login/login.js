import Vue from 'vue'
import LoginTab from './LoginTab.vue'
//引入elm组件
import ElementUI from 'element-ui';
//引入store
//import store from './store'
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
//引入全局css
import '@/assets/css/Base.css'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter)

// 消除el-radio-group组件报错
Vue.directive('removeAriaHidden', {
  bind(el, binding) {
    let ariaEls = el.querySelectorAll('.el-radio__original');
    ariaEls.forEach((item) => {
      item.removeAttribute('aria-hidden');
    });
  }
});

new Vue({
  render: h => h(LoginTab),
  //store,
  router,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#logintab')
