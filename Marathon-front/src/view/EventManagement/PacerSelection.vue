<template>
  <div id="PacerSelection">
    <div style="display: flex;  width: 100%;">
      <el-main class="Content" v-if="paginatedParticipants.length > 0">
        <div style="margin-top: 10px; margin-bottom: 25px;margin-left: 15px;;font-weight: bold;font-size: 26px;">{{
          this.$route.params.name }}</div>
        <div class="Button" v-if="pacerIsChosen === false">
          <div style="margin-left: 65%;">
            <el-button type="primary" @click="openConfirmDialog" style="margin: 0 10px;"
              :disabled="pacerIsChosen === true">提交</el-button>
            <el-button type="primary" @click="cancel" :disabled="pacerIsChosen === true">取消</el-button>
          </div>
        </div>
        <div v-else style="text-align: left;">
          <div style="margin-bottom: 20px; margin-left: 15px;font-weight: bold;font-size: 26px;">配速员名单</div>
        </div>
        <div>
          <el-table :data="paginatedParticipants" class="Table" style="width: 100%" max-height="400">
            <el-table-column prop="playerId" label="ID" width="100"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="gender" label="性别" width="100"></el-table-column>
            <el-table-column prop="age" label="年龄" width="100"></el-table-column>
            <el-table-column prop="number" label="参赛号码" width="120"></el-table-column>
            <el-table-column prop="history" label="历史成绩" width="150">
              <template slot-scope="scope">
                <el-button @click="loadHistory(scope.row.playerId)">查看详情</el-button>
              </template>
            </el-table-column>
            <el-table-column label="选为配速员" width="120" v-if="pacerIsChosen === false">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isPacer" :disabled="pacerIsChosen === true"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
          class="Pagination"
          background
          layout="prev, pager, next"
          :total="totalParticipantsCount"
          :page-size="pageSize"
          @current-change="handlePageChange"
          style="margin-top: 10px;"
        ></el-pagination>
        </div>
      </el-main>
      <div v-else class="Empty">暂无数据</div>

      <el-dialog :visible.sync="confirmDialogVisible" title="确定配速员名单为" width="50%">
        <div>
          <el-table :data="selectedPacers" style="width: 100%">
            <el-table-column prop="playerId" label="ID" width="100"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="gender" label="性别" width="80"></el-table-column>
            <el-table-column prop="age" label="年龄" width="80"></el-table-column>
            <el-table-column prop="number" label="参赛号码" width="110"></el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="confirmDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmSelection">确定</el-button>
        </span>
      </el-dialog>

      <el-dialog :visible.sync="historyDialogVisible" title="历史成绩" width="60%">
        <div v-if="selectedParticipantHistory.length > 0">
          <el-table :data="selectedParticipantHistory" class="HistoryTable" style="width: 100%" max-height="350">
            <el-table-column prop="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="eventDate" label="开赛时间" width="125"></el-table-column>
            <el-table-column prop="eventName" label="赛事名称" width="250"></el-table-column>
            <el-table-column prop="eventType" label="赛事类型" width="125"></el-table-column>
            <el-table-column prop="result" label="成绩" width="120"></el-table-column>
            <el-table-column prop="ranking" label="名次" width="100">
              <template slot-scope="scope">
                <div style="font-weight: bold;color: rgb(168, 27, 31);">{{ scope.row.ranking }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else class="Empty">
          暂无数据
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="historyDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { fetchPlayerHistory, fetchParticipantsByEvent, submitPacers } from '@/api/EventManagement';

export default {
  name: 'PacerSelection',
  props: {
    isDrawn: {
      type: Boolean,
      default: false,
    },
    eventId: {
      type: [Number, String],
      required: true,
    },
    pacerIsChosen: {
      type: Boolean,
      default: false,
    },
    aidIsChosen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      participants: [], // 所有参赛者
      selectedParticipantHistory: [], // 历史成绩
      selectedPacers: [], 
      currentPage: 1,
      pageSize: 5,
      historyDialogVisible: false, // 历史成绩对话框
      confirmDialogVisible: false, // 新增确认对话框的显示状态
    };
  },
  computed: {
    totalParticipantsCount() {
      return this.participants.length;
    },
    paginatedParticipants() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.participants.slice(start, end);
    },
  },
  methods: {
    // 加载选手数据
    async loadParticipants() {
      try {
        const players = await fetchParticipantsByEvent(this.eventId);
        // 过滤出具有参赛号码的选手
        const filteredPlayers = players.data.filter(player => player.role ==='pacer');
        // 添加 isPacer 字段并初始化为 false
        this.participants = filteredPlayers.map(filteredPlayer => ({
          ...filteredPlayer,
          isPacer: false,
        }));
      } catch (error) {
        console.error('Failed to fetch participants:', error);
        this.$message.error('加载选手信息失败，请稍后重试');
      }
    },

    // 查看选手历史成绩
    async loadHistory(playerId) {
      try {
        const response = await fetchPlayerHistory(playerId);
        this.selectedParticipantHistory = response.data.map((record, index) => ({
          index: index + 1,
          eventName: record.eventName,
          eventDate: record.eventDate,
          eventType: record.eventType,
          result: this.formatSeconds(record.netResult),
          ranking: record.ranking,
        }));
        this.historyDialogVisible = true;
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    },
    openConfirmDialog() {
      this.selectedPacers = this.participants.filter(p => p.isPacer);
      if (this.selectedPacers.length > 0) {
        this.confirmDialogVisible = true; // 打开确认对话框
      } else {
        this.$message.warning('请至少选择一个配速员');
      }
    },
    // 确认选拔
    async confirmSelection() {
      try {
        const selectedPacers = this.participants
          .filter(p => p.isPacer)
          .map(p => p.playerId);
        if (selectedPacers.length === 0) {
          this.$message.warning('请至少选择一个配速员');
          return;
        }
        const response = await submitPacers(this.eventId, selectedPacers);
        this.$message.success(response.message || '配速员选拔成功！');
        this.loadParticipants();
        this.$emit('update:pacerIsChosen', true);
        this.confirmDialogVisible = false; // 关闭确认框
      } catch (error) {
      console.error('配速员提交失败:', error);
      this.$message.error('配速员提交失败，请稍后重试');
      }
    },
    cancel() {
      this.participants.forEach(p => (p.isPacer = false));
    },
    // 分页处理
    handlePageChange(page) {
      this.currentPage = page;
    },
    // 格式化时间
    formatSeconds(seconds) {
      const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
      const secs = String(seconds % 60).padStart(2, '0');
      return `${hours}:${minutes}:${secs}`;
    },
  },
  created() {
    this.loadParticipants();
  },
};
</script>

<style scoped>
@import "@/assets/css/Base.css";
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/PacerAndEmergencyTable.css";

#PacerSelection {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 105vh;
  height: 72vh;
  margin-right: 35px;
  margin-bottom: 75px;
  font-size: 15px;
}
</style>
