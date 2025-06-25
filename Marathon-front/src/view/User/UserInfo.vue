<template>
  <div id="UserInfo">
    <div class="UserInfo">
      <div class="UserInfoUpper">
        <div class="UserInfoTitle">基本信息</div>
        <button class="relative-button" @click="changeButton">{{ buttonText }}</button>
      </div>
      <hr class="line" />
      <div class="UserInfoText">
        <div class="UserInfoTextRow">
          <p class="UserInfoTextTitle">姓名</p>
          <p class="UserInfoTextContent">{{ name }}</p>
        </div>
        <div class="UserInfoTextRow">
          <p class="UserInfoTextTitle">手机号</p>
          <p class="UserInfoTextContent" v-if="!isEdit">{{ newTelephone }}</p>
          <el-input v-model="newTelephone" placeholder="请输入您的电话" v-if="isEdit" class="UserInfoTextContent"></el-input>
          <p class='UserInfoTextError' v-if="isEdit && !isTelephone">输入有误</p>
        </div>
        <div class="UserInfoTextRow">
          <p class="UserInfoTextTitle">证件</p>
          <p class="UserInfoTextContent">{{ ID_number }}</p>
        </div>
        <div class="UserInfoTextRow">
          <p class="UserInfoTextTitle">ID</p>
          <p class="UserInfoTextContent">{{ ID }}</p>
        </div>
        <div class="UserInfoTextRow">
          <p class="UserInfoTextTitle">性别</p>
          <p class="UserInfoTextContent">{{ gender }}</p>
        </div>
        <div class="UserInfoTextRow">
          <p class="UserInfoTextTitle">年龄</p>
          <p class="UserInfoTextContent" v-if="!isEdit && newAge !== ''">{{ newAge }}</p>
          <el-input v-model="newAge" placeholder="请输入您的年龄" v-if="isEdit" class="UserInfoTextContent"></el-input>
          <p class='UserInfoTextError' v-if="isEdit && !isAge">输入有误</p>
        </div>
        <div class="UserInfoTextRow" style="height: 75px;">
          <p class="UserInfoTextTitle">地区</p>
          <p class="UserInfoTextContent" v-if="!isEdit && newRegion !== ''">{{ newRegion }}</p>
          <div class="UserInfoTextContent" v-if="isEdit">
            <div style="margin: 10px 0;">
              <el-select v-model="selectedProvince" placeholder="请选择" size="mini">
                <el-option v-for="province in provinces" :key="province" :value="province"></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="UserInfoImg">
      <img src="@/assets/images/KeepRunning.jpg" alt="">
    </div>
  </div>
</template>

<script>
import { completeInfor, getInfor } from '@/api/UserCenter.js'
export default {
  name: 'UserInfo',
  data() {
    return {
      buttonText: "编辑",
      isEdit: false,
      isTelephone: true,
      isAge: true,
      name: '',
      oldTelephone: '',
      newTelephone: '',
      ID_number: '',
      ID: '',
      gender: '',
      oldAge: '',
      newAge: '',
      oldRegion: '',
      newRegion: '',
      Password: '',
      provinces: [
        '北京市', '天津市', '上海市', '重庆市', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省',
        '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省',
        '广东省', '海南省', '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省',
        '内蒙古自治区', '广西壮族自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区'
      ],
      selectedProvince: ''
    }
  },
  mounted() {
    const userId = localStorage.getItem('UserId');
    if (!userId) {
      this.$message.error('未找到用户ID');
      return;
    }
    this.ID = parseInt(userId);
    
    getInfor(this.ID)
      .then(res => {
        if (res.code === 1 && res.data) {
          const data = res.data;
          this.name = data.name;
          this.oldTelephone = data.telephoneNumber;
          this.newTelephone = data.telephoneNumber;
          this.ID_number = data.idNumber;
          this.gender = data.gender;
          this.oldAge = data.age;
          this.newAge = data.age;
          this.oldRegion = data.region;
          this.newRegion = data.region;
          this.Password = data.password;
          
          if (data.region) {
            this.selectedProvince = data.region;
          }
        } else {
          console.error('响应数据格式错误:', res);
          this.$message.error(res.msg || '获取用户数据失败');
        }
      })
      .catch(error => {
        console.error('查询失败:', error);
        this.$message.error(error.message || '查询失败');
      });
  },
  methods: {
    changeButton() {
      //一层：现在是展示状态
      if (!this.isEdit) {
        this.buttonText = '保存'
        this.isEdit = true
      }
      //一层：现在是编辑状态
      else if (this.isEdit) {
        //二层：编辑的内容合规
        if (this.isTelephone && this.isAge) {
          //三层：没有改变数据
          if (this.oldTelephone === this.newTelephone && this.oldRegion === this.newRegion && this.oldAge === this.newAge) {
            this.buttonText = '编辑'
            this.isEdit = false
          }
          //三层：改变了数据
          else {
            this.$confirm("是否保存数据?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消 ",
              type: "warning",
              distinguishCancelAndClose: true,
              closeOnClickModal: false
            }).then(() => {
              // 确认通过执行逻辑
              this.oldTelephone = this.newTelephone;
              this.oldRegion = this.newRegion;
              this.oldAge = this.newAge;
              /* 调用js */
              this.submit();
              this.buttonText = '编辑'
              this.isEdit = false
            }).catch((e) => {
              if (e == 'cancel') {
                // 确认不通过执行逻辑
              } else if (e == 'close') {
                // 右上角X的执行逻辑 
              }
            })
          }
        }
        //二层：编辑的内容不合规
        else {
          this.$confirm("数据有误", "提示", {
            confirmButtonText: "返回更改",
            cancelButtonText: "取消",
            type: "warning",
            distinguishCancelAndClose: true,
            closeOnClickModal: false
          }).then(() => {
            // 确认通过执行逻辑
            // 保存当前编辑的数据
            this.newTelephone = this.oldTelephone;
            this.newRegion = this.oldRegion;
            this.newAge = this.oldAge;
            this.buttonText = '编辑'
            this.isEdit = false
          }).catch((e) => {
            if (e == 'cancel') {
              // 确认不通过执行逻辑
            } else if (e == 'close') {
              // 右上角X的执行逻辑 
            }
          })
        }
      }
    },
    submit() {
      this.loading = true;
      const submitData = {
        id: parseInt(this.ID),
        name: this.name,
        gender: this.gender,
        age: parseInt(this.newAge),
        id_number: this.ID_number,
        region: this.newRegion,
        telephone_number: this.newTelephone,
        password: this.Password
      };
      
      if (!submitData.id) {
        this.$message.error('用户ID不能为空');
        this.loading = false;
        return;
      }
      
      console.log('提交到后端的数据:', submitData);
      
      completeInfor(submitData).then((res) => {
        if (res.code === 1) {
          console.log('后端响应:', res);
          this.$message.success("提交成功");
          this.oldTelephone = this.newTelephone;
          this.oldAge = this.newAge;
          this.oldRegion = this.newRegion;
        } else {
          this.$message.error(res.msg || '提交失败');
        }
      }).catch(error => {
        console.error('提交失败:', error);
        this.$message.error(error.message || '提交失败');
      }).finally(() => {
        this.loading = false;
      });
    },
  },
  computed: {
  },
  watch: {
    newTelephone(telephone) {
      var reg = /^1\d{10}$/;
      this.isTelephone = reg.test(telephone);
    },
    newAge(age) {
      if (this.age != '') {
        // 检查每一位是否为数字
        if (/^\d+$/.test(age)) {
          const ageNum = parseInt(age, 10);
          if (ageNum >= 18 && ageNum <= 100)
            this.isAge = true;
          else
            this.isAge = false;
        }
        else
          this.isAge = false;
      }
      else
        this.isAge = true;
    },
    selectedProvince() {
      this.newRegion = this.selectedProvince;
    }
  },
}
</script>

<style scoped>
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/Base.css";
@import "@/assets/css/UserInfo.css";
</style>