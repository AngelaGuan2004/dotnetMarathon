<template>
  <div id="ParticipantLottery">
    <el-main class="ParticipantLotteryContent">
      <div style="margin-top: 10px; margin-bottom: 25px;margin-left: 15px;;font-weight: bold;font-size: 26px;">{{
          this.$route.params.name }}</div>
      <div class="ParticipantLotteryInput">
        <el-input
          v-model="totalParticipants"
          placeholder="请输入中签人数"
          class="InputTotalParticipants"
          :disabled="isDrawn"
        ></el-input>
        <el-button
          type="primary"
          @click="drawLots"
          :disabled="isDrawn"
        >
          抽签
        </el-button>
      </div>
      <div v-if="paginatedParticipants.length > 0 || isLoading">
        <el-table
          :data="paginatedParticipants"
          class="ParticipantLotteryTable"
          max-height="420"
          v-loading="isLoading"
        >
          <el-table-column prop="playerId" label="ID" width="100"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="gender" label="性别" width="100"></el-table-column>
          <el-table-column prop="age" label="年龄" width="100"></el-table-column>
          <el-table-column prop="role" label="参赛身份" width="150"></el-table-column>
          <el-table-column prop="number" label="参赛号码" width="150">
            <template #default="scope">
              <span v-if="isDrawn && scope.row.role !== '未中签'">{{ scope.row.number }}</span>
              <span v-else>-</span>
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
      <div v-else class="Empty" style="margin-top: 50px;">暂无数据</div>
    </el-main>
  </div>
</template>

<script>
import { drawLots, fetchParticipantsByEvent } from '@/api/EventManagement';

export default {
  name: 'ParticipantLottery',
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
      totalParticipants: '',
      participants: [],
      isLoading: false,
      currentPage: 1,
      pageSize: 8,
    };
  },
  computed: {
    totalParticipantsCount() {
      return Array.isArray(this.participants) ? this.participants.length : 0;
    },
    paginatedParticipants() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.participants.slice(start, end);
    },
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    async loadParticipants() {
      try {
        this.isLoading = true;
        const response = await fetchParticipantsByEvent(this.eventId);
        this.participants = response.data.map(Participant => ({
          playerId: Participant.playerId,
          name: Participant.name,
          gender: Participant.gender,
          age: Participant.age,
          role: Participant.role === 'charity' 
            ? '慈善跑者' 
            : (Participant.role === 'not_selected' ? '未中签' : '普通跑者'), // 逻辑判断
          number: Participant.number, // 确保获取参赛号码
      }));
    } catch (error) {
      this.$message.error('加载选手信息失败，请稍后重试。');
      console.error('Failed to load participants:', error);
    } finally {
      this.isLoading = false;
    }
  },

    async drawLots() {
      try {
        const total = parseInt(this.totalParticipants);
        if (isNaN(total) || total <= 0) {
          this.$message.error('请输入有效的中签人数');
          return;
        }
        const response = await drawLots(this.eventId, total);
        if (response.code === 1) {
          this.$message.success('抽签成功');
          this.loadParticipants();
          this.$emit('update:isDrawn', true);
        } else {
          this.$message.error(response.msg || '抽签失败');
        }
      } catch (error) {
        this.$message.error('抽签失败，请稍后重试');
      }
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
@import "@/assets/css/ParticipantLottery.css";
</style>
