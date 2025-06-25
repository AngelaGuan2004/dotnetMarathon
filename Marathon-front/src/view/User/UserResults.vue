<template>
  <div id="UserResults">
    <div class='NotTable' v-if="this.loading && !this.Flag">
      <div style=" display: table-cell;vertical-align: middle;width: 100vh;height: 300px;">
        未查询到志愿活动！
      </div>
    </div>
    <div class="UserResultsContent">
      <div>
        <!-- 筛选和最佳成绩栏目 -->
        <div class="UserResultsRaceType">
          <!-- 搜索框 -->
          <div class="UserResultsSearch">
            <el-input v-model="searchQuery" placeholder="搜索比赛..." class="search_input" @keyup.enter.native="search" />
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </div>
        </div>

        <!-- 比赛成绩表格 -->
        <div>
          <el-table :data="paginatedResults" v-loading='loading' class="table" row-class-name="clickable-row" stripe>
            <el-table-column prop="eventName" label="比赛名称" width="325"></el-table-column>
            <el-table-column prop="gunResult" label="枪声成绩" width="150">
              <template slot-scope="scope">
                <div style="font-weight: bold;">{{ formatSeconds(scope.row.gunResult) }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="netResult" label="净成绩" width="150">
              <template slot-scope="scope">
                <div style="font-weight: bold;">{{ formatSeconds(scope.row.netResult) }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="genderRank" label="性别排名" width="125">
              <template slot-scope="scope">
                <div style="font-weight: bold;">{{ scope.row.genderRank }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="rank" label="总排名" width="125">
              <template slot-scope="scope">
                <div style="color: #c81623;font-weight: bold;">{{ scope.row.rank }}</div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination v-if="filteredResults.length > 0" background layout="prev, pager, next"
            :total="filteredResults.length" :page-size="pageSize" :current-page.sync="currentPage"
            @current-change="handlePageChange" class="Pagination">
          </el-pagination>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getMyResults, getHalfResults, getFullResults } from '@/api/myGrade'; // 导入API函数
export default {
  name: 'UserResults',
  data() {
    return {
      searchQuery: '',
      filterType: 'all',
      currentPage: 1,
      pageSize: 8,
      results: [],
      filteredResults: [],
      loading: true,
      Flag: true
    }
  },

  created() {
    this.fetchAllResults(); // 页面加载时获取所有比赛成绩
  },

  methods: {
    // 获取所有比赛成绩
    async fetchAllResults() {
      try {
        const Player_ID = localStorage.getItem('UserId');
        const response = await getMyResults(Player_ID);
        if (response.code === 1) {
          this.results = response.data;  // 获取 data 数组
          this.filteredResults = this.results;
          this.loading = false;
          this.Flag = true;
        } else {
          console.error('获取数据失败:', response);
          this.loading = false;
          this.Flag = false;
        }
      } catch (error) {
        console.error('获取比赛成绩失败:', error);
        this.loading = false;
        this.Flag = false;
      }
    },
    search() {
      const query = this.searchQuery.trim();
      if (query) {
        // 根据搜索框输入的内容搜索
        this.filteredResults = this.results.filter(result =>
          result.eventName.toLowerCase().includes(query.toLowerCase())
        );
      } else {
        // 如果搜索框为空，显示所有成绩
        this.filteredResults = this.results;
      }
    },

    // 根据比赛类型进行筛选
    async filterResults(type) {
      this.filterType = type;

      try {
        let response;
        console.log(1222, type);
        const Player_ID = localStorage.getItem('UserId'); // 保持一致的 Player_ID
        if (type === 'full') {
          response = await getFullResults(Player_ID); // 获取全马成绩
          this.filteredResults = response; // 更新筛选结果
        } else if (type === 'half') {
          response = await getHalfResults(Player_ID); // 获取半马成绩
          this.filteredResults = response; // 更新筛选结果
        } else {
          // 如果选择 "全部"，则显示所有成绩
          this.filteredResults = this.results;
        }
        console.log(111, this.filteredResults)
      } catch (error) {
        console.error('筛选比赛成绩失败:', error);
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    getRaceType(type) {
      return type === 'full' ? '全马' : '半马';
    },
    formatSeconds(seconds) {
      // 计算小时数
      const hours = Math.floor(seconds / 3600);
      // 计算剩余的分钟数
      const minutes = Math.floor((seconds % 3600) / 60);
      // 剩余的秒数
      const secs = seconds % 60;

      // 格式化为HH:MM:SS形式，确保个位数前面补0
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  },
  computed: {
    paginatedResults() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredResults.slice(start, end);
    },

  }

}
</script>

<style scoped>
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/Base.css";
@import "@/assets/css/UserResults.css";
</style>