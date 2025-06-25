<template>
  <div id="LoginTab">
    <div class="LoginLeft">
      <img src="@/assets/images/LoginBackground.png" alt="">
    </div>
    <div class="LoginRight">
      <div class="LoginRightTitle">
        <section style="flex:0 0 auto">
          <div class="LoginRightTab">
            <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect"
              active-text-color="rgb(219, 57, 56)">
              <el-menu-item index="1">用户登录</el-menu-item>
             
              <el-menu-item index="2">管理员登录</el-menu-item>
            </el-menu>
          </div>
        </section>
        <div style="height:100px;margin-top:2%;margin-left: 8%;cursor: pointer;">
          <img src="@/assets/images/JiMa.png" alt="" style="height: 100%;" @click.prevent="GoToIndex">
        </div>
      </div>
      <div class="LoginRightIndexBackground">
        <div class="LoginRightIndex">
          <div class="LoginRightIndexRouter">
            <div class="LoginRightIndexForm">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginTab',
  data() {
    return {
      LoginRouter: ['LoginAthlete', 'LoginAdmin'],
      name: '',
      phone: '',
      idNumber: '',
      password: '',
      adminKey: '',
      role: ''
    }
  },
  methods: {
    handleSelect(key) {
      this.$router.push({ name: this.LoginRouter[key - 1] })
    },
    GoToRegister() {
      this.$router.push({ name: 'Register' })
    },
    GoToIndex() {
      location.href = "index.html"
    }
  },
  mounted() {
    this.$router.push({ name: 'LoginAthlete' })
  }
}
</script>

<style scoped>
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/Base.css";
@import "@/assets/css/LoginTab.css";
</style>