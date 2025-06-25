<template>
  <div id="Register">
    <div class="LoginRightIndexFormTitle">
      欢迎注册
    </div>
    <div class="LoginRightIndexFormInput">
      <el-form :model="LoginIndexForm" @submit.prevent="register" :rules="rules" ref="LoginRightIndexForm">
        <el-form-item style="margin-top: 50px;" prop="name">
          <el-input v-model="LoginIndexForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 25px; margin-bottom: 25px;" prop="idNumber">
          <el-input v-model="LoginIndexForm.idNumber" placeholder="请输入身份证号"></el-input>
          <div v-if="idNumberError" class="ErrorMessage">{{ idNumberError }}</div>
        </el-form-item>
        <el-form-item style="margin-top: 25px; margin-bottom: 25px;" prop="password">
          <el-input v-model="LoginIndexForm.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 25px; margin-bottom: 20px;" prop="confirmPassword">
          <el-input v-model="LoginIndexForm.confirmPassword" placeholder="请确认输入密码" show-password></el-input>
          <div v-if="passwordMismatch" class="ErrorMessage">密码与确认密码不一致</div>
        </el-form-item>
        <div class="RegistGender">
          <div style="display:flex;margin-left: 15px;font-size: 16px;margin-top: 10px;">
            请选择性别：
          </div>
          <el-form-item style="display:flex;margin-left: 20px;" prop="gender">
            <el-radio-group v-removeAriaHidden v-model="LoginIndexForm.gender">
              <el-radio label="男" style="float: left;margin-left: 25px;">男</el-radio>
              <el-radio label="女" style="float: right;margin-right: 25px;">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="RegisterReturn">
          <div class="RegisterReturnLogin" @click="ReturnLogin">
            返回登录
          </div>
          <div style="display: inline-block;width: 75%;margin-top: 7%;
          text-align: right;">
            <button class="LoginRightIndexFormButton" @click.prevent="register" style="width: 80%;">
              <span>注册</span>
            </button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerPlayer } from '@/api/player';

export default {
  name: 'Register',
  data() {
    return {
      LoginIndexForm: {
        name: '',
        idNumber: '',
        password: '',
        confirmPassword: '',
        gender: '',
      },
      age: null,
      passwordMismatch: false,
      idNumberError: '', // 表示身份证号是否有错误
      rules: {
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        idNumber: [
          { required: true, message: '请输入身份证号', trigger: 'number' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    validateIdNumber() {
      const idNumberPattern = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
      if (!idNumberPattern.test(this.LoginIndexForm.idNumber)) {
        this.idNumberError = '身份证格式不正确';
        setTimeout(() => {
          this.idNumberError = ''
        }, 2000)
        return;
      }
      this.idNumberError = '';
      this.calculateAge();
    },
    validatePassword() {
      if (this.LoginIndexForm.password !== this.LoginIndexForm.confirmPassword) {
        this.passwordMismatch = true;
        setTimeout(() => {
          this.passwordMismatch = false;
        }, 2000)
      } else {
        this.passwordMismatch = false;
      }
    },
    calculateAge() {
      const currentYear = 2024;
      const birthYear = parseInt(this.LoginIndexForm.idNumber.slice(6, 10));
      if (!isNaN(birthYear)) {
        this.LoginIndexForm.age = currentYear - birthYear;
      }
    },
    async register() {
      const valid = await new Promise((resolve) => {
        this.$refs.LoginRightIndexForm.validate((valid) => {
          resolve(valid);
        });
      });

      // 如果验证不通过，直接返回 false，阻止后续的代码执行
      if (!valid) {
        this.$message.warning('注册信息不完整')
        return false;
      }

      this.validateIdNumber()
      this.validatePassword()

      if (this.passwordMismatch || this.idNumberError) {
        this.$message.warning('输入数据有误，请修改');
        return; // 如果有错误，不进行注册
      }

      const data = this.LoginIndexForm;

      registerPlayer(data).then((response) => {
        if (response.code==1) {
          this.$message.success('注册成功');
          setTimeout(() => {
            location.href = 'login.html'
          }, 1000)
        }
        else if(response.code==0) {
          this.$message.warning('该用户已注册')
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('注册失败，请重试');
      })
    },

    ReturnLogin() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/Base.css";
@import "@/assets/css/Register.css";
</style>
