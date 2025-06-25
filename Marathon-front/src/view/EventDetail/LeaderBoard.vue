<template>
  <div id="LeaderBoard">
    <!-- 面包屑导航 -->
    <div style="margin-left: 6%; margin-bottom: 50px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/EventList' }">赛历</el-breadcrumb-item>
        <el-breadcrumb-item>赛事成绩</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 内容区域 -->
    <div class="LeaderBoardContent">
      <div>
        <div style="margin-bottom: 35px;">
          <div style="font-size: 28px; font-weight: bold; margin: 25px;">
            {{ this.$route.params.name }}
          </div>
        </div>

        <!-- 筛选和排序 -->
        <el-row :gutter="20" class="filter-container">
          <el-col :span="6">
            <el-select v-model="selectedGender" placeholder="性别" @change="fetchRaceResults">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="sortType" placeholder="排序方式" @change="fetchRaceResults">
              <el-option label="顺序排列" value="顺序排列"></el-option>
              <el-option label="逆序排列" value="逆序排列"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <!-- 成绩排行榜表格 -->
        <el-table :data="paginatedResults" :style="{ width: '100%' }" max-height="45vh" v-if="results.length">
          <el-table-column label="姓名" header-align="center" align="center">
            <template v-slot:default="scope">
              <span>{{ scope.row.name || '加载中...' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别" header-align="center" align="center">
            <template v-slot:default="scope">
              <span>{{ scope.row.gender || '加载中...' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="比赛成绩" header-align="center" align="center">
            <template v-slot:default="scope">
              <span style="font-weight: bold;">{{ formatSeconds(scope.row.netResult) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="比赛排名" header-align="center" align="center">
            <template v-slot:default="scope">
              <span style="color: rgb(168, 27, 31); font-weight: bold;">{{ scope.row.playerRank }}</span>
            </template>
          </el-table-column>
        </el-table>

        <!-- 空数据提示 -->
        <div v-else class="Empty" style="height: 50vh; text-align: center;">
          <el-empty description="暂无数据"></el-empty>
        </div>

        <!-- 分页组件 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="filteredResults.length"
          :page-size="10"
          @current-change="handlePageChange"
          class="Pagination"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getRank } from '@/api/rank'; // 获取成绩接口
import { getParticipantInfo } from '@/api/EventRegistration'; // 获取选手姓名和性别接口

export default {
  name: 'LeaderBoard',
  data() {
    return {
      selectedGender: '全部', // 性别筛选
      sortType: '顺序排列', // 排序方式
      currentPage: 1, // 当前页码
      results: [], // 原始数据
      filteredResults: [], // 筛选后的数据
      itemsPerPage: 10, // 每页显示的数量
    };
  },
  created() {
    this.fetchRaceResults(); // 页面加载时获取数据
  },
  computed: {
    // 分页数据
    paginatedResults() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredResults.slice(startIndex, endIndex);
    },
  },
  methods: {
    // 获取比赛数据并填充姓名和性别
    async fetchRaceResults() {
      try {
        const eventId = this.$route.params.event_id;
        const topN = 50;
        const gender = this.selectedGender === '全部' ? null : this.selectedGender;
        const sortOrder = this.sortType === '顺序排列' ? 'asc' : 'desc';

        // 调用成绩接口
        const response = await getRank(eventId, topN, gender, sortOrder);
        if (response.code === 1 && Array.isArray(response.data)) {
          this.results = response.data;

          // 遍历 results，调用接口填充姓名和性别
          for (let player of this.results) {
            const info = await getParticipantInfo(player.playerId);
            if (info.code === 1 && info.data) {
              player.name = info.data.name;
              player.gender = info.data.gender;
            }
          }
          this.filteredResults = this.results;
        } else {
          console.error('获取成绩失败:', response.msg);
          this.results = [];
        }
      } catch (error) {
        console.error('获取比赛成绩失败:', error);
        this.results = [];
      }
    },

    // 分页切换
    handlePageChange(page) {
      this.currentPage = page;
    },

    // 格式化时间
    formatSeconds(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },
  },
};
</script>





<style scoped>
@import "@/assets/css/Base.css";
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/LeaderBoard.css";
</style>