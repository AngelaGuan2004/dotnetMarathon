<template>
  <div id="VolunteerSignup">
    <el-dialog title="志愿者报名" :visible.sync="dialogVisible" width="55%">
      <div class="RegistrationContainerWrapper">
        <!-- 添加 logo 图片 -->
        <img class="VolunteerSignupLogo" src="@/assets/images/JiMa.png" alt="Logo">
        <div class="RegistrationContainer">
          <h1 style="margin-bottom: 30px;">志愿者报名</h1>
          <div class="RegistrationInformation">
            <div><b> 姓名：</b><span> {{ this.volunteer.playerName }}</span></div>
            <div><b style="margin-right: 5px;"> 手机号：</b><span>{{ this.volunteer.playerPhone }}</span> </div>
          </div>
          <div class="button-group">
            <el-button type="primary" @click="modifyInfo">修改信息</el-button>
            <el-button type="success" @click="submitRegistration">提交报名</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { registerVolunteer } from '@/api/volunteer';
import { getPlayerById } from '@/api/player';

export default {
  name: 'VolunteerSignup',
  data() {
    return {
      volunteer: {
        playerName: '',
        playerPhone: ''
      },
      dialogVisible: true
    };
  },
  props: ['eventId'],
  mounted() {
    this.loadPlayerInfo();
  },
  methods: {
    async loadPlayerInfo() {
      try {
        const userId = localStorage.getItem('UserId');
        if (userId) {
          const response = await getPlayerById(userId);
          console.log(response)
          if (response) {
            this.volunteer.playerName = response.Name;
            this.volunteer.playerPhone = response.Telephone_Number;
          } else {
            this.$message.error('未找到该跑者的信息');
          }
        } else {
          this.$message.error('用户ID未找到');
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
        this.$message.error('加载跑者信息失败');
      }
    },
    async submitRegistration() {
      try {
        const volunteerId = localStorage.getItem('UserId'); // 假设志愿者ID存储在localStorage中
        const eventId = this.eventId; // 假设活动ID存储在localStorage中

        if (!volunteerId || !eventId) {
          this.$message.error('信息缺失，请重试');
          return;
        }

        // 发送包含 Event_Id 和 Volunteer_Id 的请求到后端
        const res = await registerVolunteer({
          Event_Id: eventId,
          Volunteer_Id: volunteerId
        });
        if (res === 2) {
          this.$message.warning('您已为该比赛选手，无法报名志愿者');
        }
        else if (res === 3) {
          this.$message.warning('您已报名该比赛志愿者');
        }
        else if (res) {
          this.$message.success('报名成功');
          this.$router.back()
        }
      } catch (error) {
        console.error('Error submitting registration:', error);
        this.$message.error('报名失败');
      }
    },
    modifyInfo() {
      this.$router.push({ name: 'UserInfo' })
      this.$bus.$emit('updateActiveIndex', '4');
    }
  },
};
</script>

<style scoped>
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/Base.css";
@import "@/assets/css/VolunteerSignup.css";
</style>
