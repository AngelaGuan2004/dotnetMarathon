<template>
  <div id="VolunteerDetailForAddStation">
    <el-dialog title="赛事志愿详情" :visible.sync="dialogTableVisible" :before-close="handleClose" width="35%">
      <div class="AidStation" v-if="aidStation">
        <div class="AidStationContent">
          <div style="width: 100%;">
            <div class="AidStationItem">
              <span style="width: 40%;font-weight: bold;">志愿者状态：</span><span>
                {{ aidStationChange(aidStation.status) }}</span>
            </div>
            <div class="AidStationItem">
              <span style="width: 40%;font-weight: bold;">工作种类：</span><span>
                {{ jobCategoryChange(aidStation.job_category) }}</span>
            </div>
            <div class="AidStationItem">
              <span style="width: 40%;font-weight: bold;">是否排班：</span><span>
                {{ isScheduledChange(aidStation.is_scheduled) }}</span>
            </div>
            <div class="AidStationItem">
              <span style="width: 40%;font-weight: bold;">搭档：</span>
              <span v-if="!aidStation.partners.length">无</span>
              <span><span v-for="partner in aidStation.partners" :key="partner.id">{{ partner.name }}</span></span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { acquireVolunteerInformation } from '@/api/detail';

export default {
  name: 'VolunteerDetailForAddStation',
  data() {
    return {
      aidStation: null,
      dialogTableVisible: true
    };
  },
  created() {
    this.loadVolunteerInformation();
  },
  watch: {
    'this.$route.params.event_id': 'loadAidStation'
  },
  methods: {
    reset() {
      this.aidStation = null;  // 重置 aidStation 数据
    },
    loadVolunteerInformation() {
      this.reset();  // 调用重置方法
      const volunteerId = localStorage.getItem('UserId');
      const eventId = this.$route.params.event_id;

      acquireVolunteerInformation(eventId, volunteerId)
        .then(response => {
          console.log(response)
          this.aidStation = response;  // 将后端返回的数据赋值给 aidStation
        })
        .catch(error => {
          console.error('Error loading volunteer info:', error);
          this.$message.error('加载志愿者信息失败');
        });
    },
    handleClose() {
      this.dialogTableVisible = false
    },
    aidStationChange(res) {
      if (res === 1)
        return "已分工"
      else
        return "未分工"
    },
    isScheduledChange(res) {
      if (res)
        return '已排班'
      else
        return '未排班'
    },
    jobCategoryChange(res) {
      if (res === '未排班')
        return '未分配'
      else
        return res
    }
  }
}
</script>

<style scoped>
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/Base.css";
@import "@/assets/css/VolunteerDetailForAddStation.css";
</style>
