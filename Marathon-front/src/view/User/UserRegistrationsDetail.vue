<template>
  <div id="UserRegistrationsDetail">
    <el-dialog title="赛事报名详情" :visible.sync="dialogTableVisible" :before-close="handleClose" width="35%">
      <div class="AidStation" v-if="event">
        <div class="AidStationContent">
          <div style="width: 100%;">
            <div class="AidStationItem">
              <span style="width: 3cm;font-weight: bold;">赛事名称：</span><span>
                {{ event.name }}</span>
            </div>
            <div class="AidStationItem">
              <span style="width: 30%;font-weight: bold;">赛事类型：</span><span>
                {{ event.category }}</span>
            </div>
            <div class="AidStationItem">
              <span style="width: 30%;font-weight: bold;">开赛时间：</span><span>
                {{ formatDate(event.eventDate) }}</span>
            </div>
            <div class="AidStationItem">
              <span style="width: 30%;font-weight: bold;">赛事规模：</span>
              <span>{{ event.scale || '暂无数据' }}</span>
            </div>
            <div class="AidStationItem" style="width: 250px;">
              <span style="width: 100%;font-weight: bold;">参赛号码：
                <span v-if="event.result && event.result.response === '已中签'" 
                      style="margin-left: 15px;color: #c81623;">
                  {{ event.result.eventNumber }}
                </span>
                <span v-else style="margin-left: 15px;color: rgb(175,175,175);">
                  {{ event.result ? event.result.eventNumber : '暂无号码' }}
                </span>
              </span>
            </div>
            <div class="AidStationItem">
              <span style="width: 60%;font-weight: bold;">是否被选拔为配速员：</span><span>
                {{ event.pacer_Is_Chosen }}</span>
            </div>
            <div class="AidStationItem">
              <span style="width: 60%;font-weight: bold;">是否被选拔为急救跑者：</span><span>
                {{ event.aid_Is_Chosen }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserRegistrationsDetail',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogTableVisible: true
    };
  },
  created() {
    // 添加日志来查看传入的数据
    console.log('接收到的赛事数据:', this.event);
  },
  methods: {
    handleClose() {
      this.$emit('close');
      this.dialogTableVisible = false;
    },
    formatDate(date) {
      if (!date) return '暂无日期';
      // 如果需要，这里可以添加日期格式化逻辑
      return date;
    },
    formatPacerStatus(status) {
      if (status === true || status === 1) return '是';
      if (status === false || status === 0) return '否';
      return '未知';
    },
    formatAidStatus(status) {
      if (status === true || status === 1) return '是';
      if (status === false || status === 0) return '否';
      return '未知';
    }
  },
  watch: {
    event: {
      immediate: true,
      handler(newVal) {
        console.log('event 数据变化:', newVal);
      }
    }
  }
}
</script>

<style scoped>
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/Base.css";
@import "@/assets/css/VolunteerDetailForAddStation.css";
</style>
