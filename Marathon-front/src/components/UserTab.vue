<template>
  <div id="UserTab">
    <div class="User">
      <div style="margin-bottom: 50px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>我的</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="TabRight">
        <div class="TabFlex" v-if="GetRole() === 'Athlete'">
          <div class="Tab">
            <el-menu ref="UserMenu" :default-active="ActiveIndexForUserTab" class="el-menu-vertical-demo"
              @select="ActiveIndex" active-text-color="rgb(168, 27, 31)">
              <el-menu-item index="1">
                <span>个人信息</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span>我的成绩</span>
              </el-menu-item>
              <el-menu-item index="3">
                <span>我的报名</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'UserTab',
  data() {
    return {
      UserTabTitle: ['UserInfo', 'UserResults', 'UserRegistrations'],
      ActiveIndexForUserTab: ""
    }
  },
  methods: {
    ActiveIndex(index) {
      this.ActiveIndexForUserTab = index; // 设置当前激活的菜单项
      this.$refs.UserMenu.activeIndex = index;
      if (index === '1') {
        if (localStorage.getItem('UserRole') === 'Athlete')
          this.$router.push({ name: 'UserInfo' })
       
      }
      this.$router.push({ name: this.UserTabTitle[index - 1] });
    },
    GetRole() {
      return localStorage.getItem('UserRole')
    }
  },
  mounted() {
    this.$bus.$on('ActiveIndexForUserTab', this.ActiveIndex);
  },
  beforeDestroy() {
    this.$bus.$off('ActiveIndexForUserTab', this.ActiveIndex);
  },
  beforeRouteEnter(to, from, next) {
    console.log(Message)
    let role = localStorage.getItem('UserRole') || 'Visitor';
    if (role === 'Visitor') {
      Message({
        type: 'warning',
        message: '请先登录'
      });
      setTimeout(() => {
        location.href = 'login.html';
      }, 1500)
    } else if (role === 'Admin') {
      Message({
        type: 'warning',
        message: '您是管理者，没有身份信息'
      });
    }
    else {
      next(); // 允许进入
    }
  },
}
</script>

<style scoped>
@import "../assets/css/Base.css";
@import 'element-ui/lib/theme-chalk/index.css';
@import "../assets/css/LeftTab.css";

.User {
  width: 100%;
  height: max(100%, 750px);
  background-color: rgb(244, 244, 244);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 100px;
  padding-top: 20px;
  margin-top: 100px;
}
</style>