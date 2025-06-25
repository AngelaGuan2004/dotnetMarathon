<template>
  <div id="EventDetail" :key="$route.fullPath">
    <div style="margin-left: 6%;margin-top: 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/EventList' }">赛历</el-breadcrumb-item>
        <el-breadcrumb-item>赛事详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="EventDetailContainer" v-if="event">
      <div style="display: flex;justify-content: space-between;">
        <div class="EventDetailTitle">
          {{ event.Name }}
        </div>
        <div class="EventDetailStatistic">
          <el-statistic ref="statistic" @finish="hilarity" format="DD天HH小时mm分钟ss秒" :value="EventCount" title="距离报名结束还有："
            time-indices>
          </el-statistic>
        </div>
      </div>
      <div class="EventDetailContainerInfo">
        <div class="EventDetailContainerInfoOne">
          <div class="EventDetailContainerInfoItem">
            <img src="@/assets/images/location.png" alt="Event Image" class="EventDetailContainerIcon">
            <span><span>赛事名称：</span>{{ event.name }}</span>
          </div>
          <div class="EventDetailContainerInfoItem">
            <img src="@/assets/images/location.png" alt="Event Image" class="EventDetailContainerIcon">
            <span><span>赛事类型：</span>{{ event.category }}</span>
          </div>
          <div class="EventDetailContainerInfoItem">
            <img src="@/assets/images/location.png" alt="Event Image" class="EventDetailContainerIcon">
            <span><span>报名开始时间：</span>{{ event.startDate }}</span>
          </div>
          <div class="EventDetailContainerInfoItem">
            <img src="@/assets/images/location.png" alt="Event Image" class="EventDetailContainerIcon">
            <span><span>报名结束时间：</span>{{ event.endDate }}</span>
          </div>
          <div class="EventDetailContainerInfoItem">
            <img src="@/assets/images/location.png" alt="Event Image" class="EventDetailContainerIcon">
            <span><span>正式比赛时间：</span>{{ event.eventDate }}</span>
          </div>
          <div class="EventDetailContainerInfoItem">
            <img src="@/assets/images/location.png" alt="Event Image" class="EventDetailContainerIcon">
            <span><span>赛事规模：</span>{{ event.scale }}</span>
          </div>
        </div>
        <div class="EventDetailContainerInfoTwo">
          <div class="EventDetailContainerInfoItem">
            <img src="@/assets/images/location.png" alt="Event Image" class="EventDetailContainerIcon">
            <span>
              <span>天气：</span>
              <a @click="openWeatherModal">详情>></a>
            </span>
          </div>
        </div>
      </div>
      <div class="EventDetailContainerButton">
        <el-button @click="GoToEventRegistration" :disabled="Disabled">选手报名</el-button>
      </div>
      <!-- 详情弹窗 -->
      <WeatherDetailsModal v-if="showWeatherModal" :eventId="this.eventId" @close="closeWeatherModal" />
    </div>
  </div>

</template>

<script>
import { fetchEventById } from '@/api/Event';
import WeatherDetailsModal from './WeatherDetail.vue';

export default {
  name: 'EventDetail',
  data() {
    return {
      event: null,
      eventId: '',
      showWeatherModal: false,
      
      EventCount: 0,
      Disabled: false
    };
  },
  components: {
    WeatherDetailsModal,
  },
  watch: {
    '$route.params.id': {
      handler: 'loadEvent',
      immediate: true
    }
  },
  mounted() {
    this.loadEvent();
  },
  methods: {
    async loadEvent() {
      this.eventId = this.$route.params.event_id;
      try {
        const res = await fetchEventById(this.eventId);
        console.log('接口响应:', res);

        if (res) {
          this.event = res.data; // 获取赛事详情
          
          this.EventCount = Date.now() + (new Date(this.event.endDate) - Date.now())
        } else {
          this.$message.error('未收到有效响应数据')
          throw new Error('未收到有效响应数据');
        }
      } catch (error) {
        console.error('加载赛事详情失败:', error);
        this.$message.error('加载赛事详情失败');
      }
    },
    openWeatherModal() {
      this.showWeatherModal = true;
    },
    closeWeatherModal() {
      this.showWeatherModal = false;
    },
    GoToEventRegistration() {
      this.$router.push({ name: 'EventRegistration', params: { event_id: this.eventId } });
    },
    hilarity() {
      this.$message.warning({
        title: "提示",
        message: "报名已结束",
      });
      this.Disabled = true
    },
  },
}
</script>

<style scoped>
@import "@/assets/css/Base.css";
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/EventDetail.css";
</style>