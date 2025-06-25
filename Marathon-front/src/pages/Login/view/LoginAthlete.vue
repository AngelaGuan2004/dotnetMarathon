<template>
  <div id="LoginAthlete">
    <div class="LoginRightIndexFormTitle">
      欢迎用户登录
    </div>
    <div class="LoginRightIndexFormInput">
      <form @submit.prevent="LoginAthlete">
        <div style="margin-top: 50px;text-align: center;">
          <el-input v-model="name" placeholder="请输入姓名"></el-input>
        </div>
        <div style="margin-top: 25px;text-align: center;">
          <el-input v-model="idNumber" placeholder="请输入身份证号"></el-input>
        </div>
        <div style="margin-top: 25px; margin-bottom: 50px;text-align: center;">
          <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
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
import { loginPlayer } from '@/api/player';

export default {
  name: 'LoginAthlete',
  data() {
    return {
      name: '',
      idNumber: '',
      password: '',
      errorMessage: '' // 用于显示错误信息
    }
  },
  methods: {
    GoToRegister() {
      this.$router.push({ name: 'Register' })
    },
    async LoginAthlete() {
      // 组织要发送的数据
      const data = {
        name: this.name,
        idNumber: this.idNumber,
        password: this.password
      };

      // 调用API进行登录
      try {
        const response = await loginPlayer(data);
        if (response.msg === '未注册') {
          this.$message.warning('该用户未注册')
        }
        else if (response.msg === '错误') {
          this.$message.warning('登录失败，请检查用户名、身份证号和密码')
          this.errorMessage = '登录失败，请检查用户名、身份证号和密码';
        }
        else if (response.code == 1) {
          this.$message.success('登录成功！')
          localStorage.setItem('UserRole', 'Athlete');
          localStorage.setItem('UserId', response.data.id);
          localStorage.setItem('token', response.data.jwt);
          setTimeout(() => {
            location.href = 'index.html'; // 登录成功后跳转到首页
          }, 1000)
        }
      } catch (error) {
        this.$message.error('登录失败，请重试')
        this.errorMessage = '登录失败，请检查用户名、身份证号和密码';
      }
    }
  }
}
</script>

<style scoped>
@import "@/assets/css/Base.css";
@import "@/assets/css/LoginTab.css";
</style>