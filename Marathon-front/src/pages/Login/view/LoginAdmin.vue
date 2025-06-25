<template>
  <div id="LoginAdmin">
    <div class="LoginRightIndexFormTitle">
      欢迎管理员登录
    </div>
    <div class="LoginRightIndexFormInput">
      <form @submit.prevent="LoginAdmin">
        <div style="margin-top: 50px;margin-bottom: 25px;text-align: center;">
          <el-input v-model="adminKey" placeholder="请输入管理秘钥"></el-input>
          <p v-if="errorMessage" style="color: red; font-size: 14px; margin-top: 10px;height: 25px;">
            {{ errorMessage }}
          </p>
          <p v-else style="height: 20px;width: 1px;"></p>
        </div>
        <div>
          <span style="margin-left: 12%;width: 73%;text-align: center;display: inline-block;">
            <button class="LoginRightIndexFormButton">
              <span>登录</span>
            </button>
          </span>
          <span class="LoginRightIndexRegister" @click="GoToRegister">立即注册 </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { loginAdmin } from '@/api/player';

export default {
  name: 'LoginAdmin',
  data() {
    return {
      adminKey: '',
      errorMessage: '', // 存储错误信息
    }
  },
  methods: {
    GoToRegister() {
      this.$router.push({ name: 'Register' })
    },
    LoginAdmin() {
      if (this.adminKey === 'admin') {
        this.$message.success('登录成功！')
        localStorage.setItem('UserRole', 'Admin')
        loginAdmin().then((response) => {
          localStorage.setItem('token', response.data);
        })
        setTimeout(() => {
          location.href = 'index.html'; // 登录成功后跳转到首页
        }, 1000)
      } else {
        this.$message.error('密钥错误，请重新输入')
      }
    }
  }
}
</script>

<style scoped>
@import "@/assets/css/Base.css";
@import "@/assets/css/LoginTab.css";
</style>