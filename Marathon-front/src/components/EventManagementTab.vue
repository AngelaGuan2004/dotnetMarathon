<template>
  <div id="EventManagementTab">
    <div class="Event">
      <div style="margin-bottom: 50px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/EventList' }">赛历</el-breadcrumb-item>
          <el-breadcrumb-item>赛事管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="TabRight" style="margin-right: 15%;">
        <div class="TabFlex">
          <div class="Tab" style="margin-top: 0;">
            <el-menu ref="EventManagementTab" :default-active="ActiveIndexForEventManagementTab"
              class="el-menu-vertical-demo" @select="ActiveIndex" active-text-color="rgb(168, 27, 31)">
              <el-menu-item index="1">
                <span>选手抽签</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span>配速员选拔</span>
              </el-menu-item>
              <el-menu-item index="3">
                <span>急救跑者选拔</span>
              </el-menu-item>
              <el-menu-item index="4">
                <span>上传成绩</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        <router-view :eventId="eventId" :isDrawn.sync="IsLottery" :pacerIsChosen.sync="PacerIsChosen" :aidIsChosen.sync="AidIsChosen"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchEventById } from '@/api/Event';


export default {
  name: 'EventManagementTab',
  data() {
    return {
      ActiveIndexForEventManagementTab: '1',
      IsLottery: false, // 是否已抽签状态
      PacerIsChosen: false, // 是否已选择配速员
      AidIsChosen: false, // 是否已选择急救跑者
      eventId: this.$route.params.event_id, // 当前赛事ID
      EventManagementTabTitle: ['ParticipantLottery', 'PacerSelection', 'EmergencyRunnerSelection','UpdateScores'],
    };
  },
  methods: {
    async loadEventStatus() {
      try {
        console.log(this.eventId)
        const response = await fetchEventById(this.eventId);
        console.log(this.eventId)
        this.IsLottery = response.data.isDrawn === true;
        this.PacerIsChosen = response.data.pacerIsChosen === true;
        this.AidIsChosen = response.data.aidIsChosen === true;
      } catch (error) {
        console.error('获取赛事状态失败:', error);
      }
    },
    ActiveIndex(index) {
      if (!this.IsLottery && index !== '1' ) {
        this.$message.warning('请先完成抽签');
        this.ActiveIndexForEventManagementTab = '1';
        this.$router.push({ name: 'ParticipantLottery', params: { event_id: this.eventId } });
      }
      else if(index == '4' && (!this.PacerIsChosen || !this.AidIsChosen)){
        this.$message.warning('请先完成选拔');
        this.ActiveIndexForEventManagementTab = '2';
        this.$router.push({ name: 'PacerSelection', params: { event_id: this.eventId } });
      } 
      else {
        this.ActiveIndexForEventManagementTab = index;
        this.$router.push({ name: this.EventManagementTabTitle[index - 1], params: { event_id: this.eventId } });
      }
    },
  },
  created() {
    this.loadEventStatus();
    console.log(1);
    this.ActiveIndex(this.ActiveIndexForEventManagementTab);
  },
};
</script>

<style>
@import 'element-ui/lib/theme-chalk/index.css';
@import "../assets/css/Base.css";
@import "../assets/css/LeftTab.css";

.Event {
  width: 100%;
  height: 100%;
  background-color: rgb(244, 244, 244);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 100px;
  padding-top: 20px;
  margin-top: 100px;
}
</style>
