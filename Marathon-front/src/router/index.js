// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

import Home from '@/view/Home/Home.vue'

import UserTab from '@/components/UserTab.vue'
import UserRegistrations from '@/view/User/UserRegistrations.vue'
import UserInfo from '@/view/User/UserInfo.vue'
import UserVolunteering from '@/view/User/UserVolunteering.vue'
import UserResults from '@/view/User/UserResults.vue'

import EventManagementTab from '@/components/EventManagementTab.vue'
import LeaderBoard from '@/view/EventDetail/LeaderBoard.vue'

import EventList from '@/components/EventList.vue'

import EventDetail from '@/view/EventDetail/EventDetail.vue'
import EventRegistration from '@/view/EventDetail/EventRegistration.vue'

import ParticipantLottery from '@/view/EventManagement/ParticipantLottery.vue'
import PacerSelection from '@/view/EventManagement/PacerSelection.vue'
import EmergencyRunnerSelection from '@/view/EventManagement/EmergencyRunnerSelection.vue'
import UpdateScores from '@/view/EventManagement/UpdateScores.vue'

//创建并暴露一个路由器
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    }, {
      path: '/EventList',
      name: 'EventList',
      component: EventList
    }, {
      path: '/EventDetail/:event_id',
      name: 'EventDetail',
      component: EventDetail,
    },
    {
      path: '/EventRegistration/:event_id',
      name: 'EventRegistration',
      component: EventRegistration
    },  {
      path: '/LeaderBoard/:event_id:name',
      name: 'LeaderBoard',
      component: LeaderBoard
    },
    {
      path: '/EventManagementTab:event_id:name',
      name: 'EventManagementTab',
      component: EventManagementTab,
      children: [
        {
          path: 'ParticipantLottery',
          name: 'ParticipantLottery',
          component: ParticipantLottery
        }, {
          path: 'PacerSelection',
          name: 'PacerSelection',
          component: PacerSelection
        }, {
          path: 'EmergencyRunnerSelection',
          name: 'EmergencyRunnerSelection',
          component: EmergencyRunnerSelection
        }, 
        {
          path: 'UpdateScores',
          name: 'UpdateScores',
          component: UpdateScores
        }, 
      ]
    }, 
    {
      path: '/UserTab',
      name: 'UserTab',
      component: UserTab,
      children: [
        {
          path: 'UserRegistrations',
          name: 'UserRegistrations',
          component: UserRegistrations
        },
        {
          path: 'UserInfo',
          name: 'UserInfo',
          component: UserInfo
        }, {
          path: 'UserVolunteering',
          name: 'UserVolunteering',
          component: UserVolunteering,
        }, {
          path: 'UserResults',
          name: 'UserResults',
          component: UserResults
        }, 
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果路由中保存了滚动位置，则返回该位置（例如浏览器前进、后退按钮）
    if (savedPosition) {
      return savedPosition;
    } else {
      // 否则，返回顶部
      return { x: 0, y: 0 };
    }
  }
})

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
//一般用于鉴权
// router.beforeEach((to, from, next) => {

// })

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
//一般用于跳转后修改页面标题
// router.afterEach((to, from) => {

// })