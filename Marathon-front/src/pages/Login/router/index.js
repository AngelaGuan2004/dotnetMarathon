// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
import LoginAthlete from '../view/LoginAthlete.vue'

import LoginAdmin from '../view/LoginAdmin.vue'
import Register from '../view/Register.vue'
//创建并暴露一个路由器
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/LoginAthlete',
      name: 'LoginAthlete',
      component: LoginAthlete
    },
   
    {
      path: '/LoginAdmin',
      name: 'LoginAdmin',
      component: LoginAdmin
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
  ],
})

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
//一般用于鉴权
// router.beforeEach((to, from, next) => {

// })

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
//一般用于跳转后修改页面标题
// router.afterEach((to, from) => {

// })