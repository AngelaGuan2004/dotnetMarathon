<template>
  <div id="UserRegistrations">
    <div class='NotTable' v-if="(this.loading && !this.Flag) || !events.length">
      <div style=" display: table-cell;vertical-align: middle;width: 100vh;height: 300px;">
        未查询到报名比赛！
      </div>
    </div>
    <div style="width: 100%;" v-else>
      <el-main>
        <div style="width: 100%; overflow: auto ;height: 100%;margin-top: 20px;">
          <el-table :data="paginatedResults" v-loading='loading' class="table" stripe>
            <el-table-column prop="name" label="比赛名称" width="300"></el-table-column>
            <el-table-column prop="eventDate" label="开赛时间" width="175"></el-table-column>
            <el-table-column prop="category" label="赛事类型" width="125"></el-table-column>
            <el-table-column prop="result" label="结果" width="150">
              <template slot-scope="scope">
                <div v-if="scope.row.result.response === '已中签'" style="color: #c81623;font-weight: bold;">
                  {{ scope.row.result.response }}
                </div>
                <div v-else-if="scope.row.result.response === '未中签'" style="color:rgb(175,175,175);font-weight: bold;">
                  {{ scope.row.result.response }}</div>
                <div v-else style="color:rgb(230, 162, 60);font-weight: bold;">
                  {{ scope.row.result.response }}</div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination v-if="events.length > 0" background layout="prev, pager, next" :total="events.length"
            :page-size="pageSize" :current-page.sync="currentPage" @current-change="handlePageChange"
            class="pagination">
          </el-pagination>
        </div>
      </el-main>
    </div>
  </div>
</template>
<script>
import { getMyRegistrations } from '@/api/UserCenter.js'
import { getEventInfo } from '@/api/UserCenter.js'
export default {
  name: 'UserRegistrations',
  mounted() {
    this.ID = localStorage.getItem('UserId')
    getMyRegistrations(this.ID)
      .then((res) => {
        if (res.code === 1 && Array.isArray(res.data)) {
          // 确保 res.data 是数组后再处理
          this.processEvents(res.data);
        } else {
          console.error('返回数据格式错误:', res);
          this.Flag = false;
        }
        this.loading = false;
      })
      .catch(error => {
        console.error(error)
        this.$message.error('查询失败');
        this.Flag = false;
        this.loading = false;
      });
  },
  data() {
    return {
      ID: '',
      activeMenu: '2',
      searchName: '',
      events: [],
      currentPage: 1,
      pageSize: 8,
      loading: true,
      Flag: true,
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    async processEvents(events) {
      try {
        if (!Array.isArray(events)) {
          console.error('events 不是数组:', events);
          this.events = [];
          return;
        }

        this.events = await Promise.all(events.map(async (event) => {
          event.result = await this.getResultFromAPI(this.ID, event.id);
          return event;
        }));

        console.log('处理后的赛事数据:', this.events);
      } catch (error) {
        console.error('处理赛事数据时出错:', error);
        this.events = [];
      }
    },
    getResultFromAPI(playerId, eventId) {
      // 使用 API 查询具体的 result 值
      return getEventInfo(playerId, eventId)
        .then(response => {
          // 根据实际的 API 返回结构解析 result 值
          if (response === "未中签" || response === "尚未抽签")
            return {
              response,
              eventNumber: '未中签'
            };
          else {
            return {
              response: '已中签',
              eventNumber: response
            };
          }
        })
        .catch(error => {
          console.error(`获取赛事 ${eventId} 的结果失败:`, error);
          return "查询失败"; // 处理错误时返回一个默认值
        });
    }
  },
  computed: {
    paginatedResults() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.events.slice(start, end);
    }
  },
}
</script>

<style scoped>
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/Base.css";
@import "@/assets/css/UserTable.css";

#UserRegistrations {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  margin-right: 7%;
  width: 102vh;
  height: 65vh;
  margin-top: -25px;
  margin-bottom: 75px;
}
</style>