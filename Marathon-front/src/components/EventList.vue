<template>
  <div id="EventList">
    <div style="margin-left: 6%;margin-top: 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>赛历</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-main>
      <div class="EventFilterContainer">
        <el-select v-model="selectedType" placeholder="请选择赛事类型" class="EventFilterItem">
          <el-option label="全部" value="马"></el-option>
          <el-option label="半马" value="半马"></el-option>
          <el-option label="全马" value="全马"></el-option>
        </el-select>
        <el-date-picker v-model="selectedDate" type="date" placeholder="请选择开赛时间"
          class="EventFilterItem"></el-date-picker>
        <el-input placeholder="请输入赛事名称" v-model="searchName" class="EventFilterItem"></el-input>
      </div>

      <!-- 添加按钮（管理员可见） -->
      <el-button v-if="JudgeAdmin()" type="primary" @click="openAddDialog" style="margin-bottom: 10px;">
        添加
      </el-button>

      <div v-if="filteredEvents.length > 0">
        <el-table :data="filteredEvents" class="EventInfoTable" @row-click="handleRowClick"
          row-class-name="clickable-row">
          <el-table-column prop="name" label="比赛名称" width="250"></el-table-column>
          <el-table-column prop="start_date" label="报名开始时间" width="125"></el-table-column>
          <el-table-column prop="end_date" label="报名结束时间" width="125"></el-table-column>
          <el-table-column prop="date" label="开赛时间" width="125"></el-table-column>
          <el-table-column prop="type" label="赛事类型" width="100"></el-table-column>
          <el-table-column prop="scale" label="赛事规模" width="100"></el-table-column>

         

          <!-- 赛事总成绩 -->
          <el-table-column label="赛事总成绩" width="125">
            <template slot-scope="scope">
              <el-button class="EventTableDetail" :class="{ 'disabled-btn': JudgeEventEndDate(scope.row.date) }"
                style="background-color: transparent;padding: 0;border: 0;font-size: 16px;"
                @click.prevent="handleLeaderBoard(scope.row, $event)">查看</el-button>
            </template>
          </el-table-column>

          <!-- 赛事管理 -->
          <el-table-column label="赛事管理" width="100" v-if="JudgeAdmin()">
            <template slot-scope="scope">
              <div class="EventTableDetail" @click.prevent="handleEventManagement(scope.row, $event)">详情</div>
            </template>
          </el-table-column>

          <!-- 前往报名 -->
          <el-table-column label="前往报名" width="100" v-if="JudgeAthlete()">
            <template slot-scope="scope">
              <el-button class="EventTableDetail"
                :class="{ 'disabled-btn': JudgeEventSignupDate(scope.row.start_date, scope.row.end_date) }"
                style="color: rgb(168, 27, 31);background-color: transparent;padding: 0;border: 0;font-size: 16px;"
                @click.prevent="handleRegistration(scope.row, $event)">报名</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="Pagination" background layout="prev, pager, next" :total="totalEvents"
          :page-size="pageSize" @current-change="handlePageChange"></el-pagination>
      </div>
      <div v-else class="EventEmpty">
        暂无数据
      </div>
    </el-main>

    <!-- 添加赛事弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="form" label-width="120px">
        <el-form-item label="比赛名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="赛事类型">
          <el-select v-model="form.category" placeholder="请选择赛事类型">
            <el-option label="半马" value="半马"></el-option>
            <el-option label="全马" value="全马"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报名开始时间">
          <el-date-picker v-model="form.startDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="报名结束时间">
          <el-date-picker v-model="form.endDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="开赛时间">
          <el-date-picker v-model="form.eventDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="赛事规模">
          <el-input type="number" v-model="form.scale"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchAllEvents, addEvent} from '@/api/Event';

export default {
  name: 'EventList',
  data() {
    return {
      selectedType: '',
      selectedDate: null,
      searchName: '',
      events: [],
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      dialogTitle: '',
      form: {
        id: null,
        name: '',
        category: '',
        startDate: '',
        endDate: '',
        eventDate: '',
        scale: ''
      }
    };
  },
  created() {
    this.loadAllEvents();
  },
  computed: {
    filteredEvents() {
      let filtered = this.events;
      if (this.searchName) filtered = filtered.filter(event => event.name.includes(this.searchName));
      if (this.selectedType) filtered = filtered.filter(event => event.type.includes(this.selectedType));
      if (this.selectedDate) {
        const selectedDateString = this.formatDate(this.selectedDate);
        filtered = filtered.filter(event => this.formatDate(event.date) === selectedDateString);
      }
      return filtered.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    },
    totalEvents() {
      return this.events.length;
    }
  },
  methods: {
    loadAllEvents() {
      fetchAllEvents().then(response => {
        this.events = response.data.map(event => ({
          id: event.id,
          date: this.formatDate(event.eventDate),
          name: event.name,
          type: event.category,
          scale: event.scale,
          start_date: this.formatDate(event.startDate),
          end_date: this.formatDate(event.endDate),
        }));
      });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    },
    openAddDialog() {
      this.dialogTitle = '添加赛事';
      this.form = { id: null, name: '', category: '', startDate: '', endDate: '', eventDate: '', scale: '' };
      this.dialogVisible = true;
    },
    
    submitForm() {
      if (this.form.id) {
        updateEvent(this.form).then(() => {
          this.$message.success('赛事更新成功');
          this.loadAllEvents();
          this.dialogVisible = false;
        });
      } else {
        addEvent(this.form).then(() => {
          this.$message.success('赛事添加成功');
          this.loadAllEvents();
          this.dialogVisible = false;
        });
      }
    },
    handleDeleteEvent(row) {
      this.$confirm('确定要删除该赛事吗？', '警告', { type: 'warning' }).then(() => {
        deleteEvent(row.id).then(() => {
          this.$message.success('赛事删除成功');
          this.loadAllEvents();
        });
      });
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    handleEventManagement(row, event) {
      event.stopPropagation();
      this.$router.push({ name: 'EventManagementTab', params: { event_id: row.id, name: row.name } });
    },
    handleRegistration(row, event) {
      event.stopPropagation();
      if (this.JudgeEventSignupDate(row.start_date, row.end_date))
        this.$message.warning('现在不是报名时间')
      else
        this.$router.push({ name: 'EventDetail', params: { event_id: row.id, name: row.name } });
    },
    handleLeaderBoard(row, event) {
      event.stopPropagation();
      if (this.JudgeEventEndDate(row.date))
        this.$message.warning('赛事还未开始，暂无成绩列表')
      else
        this.$router.push({ name: 'LeaderBoard', params: { event_id: row.id, name: row.name } });
    },
    handleRowClick(event) {
      console.log(event)
      this.$router.push({ name: 'EventDetail', params: { event_id: event.id } });
    },
    JudgeAdmin() {
      return localStorage.getItem('UserRole') === 'Admin'
    },
    JudgeAthlete() {
      return localStorage.getItem('UserRole') === 'Athlete'
    },
    JudgeEventSignupDate(startDate, endDate) {
      const now = new Date(); // 获取当前时间
      const start = new Date(startDate); // 报名开始时间
      const end = new Date(endDate); // 报名结束时间
      // 判断当前时间是否在报名时间范围内
      if (now >= start && now <= end) {
        return false; // 可报名，按钮不禁用
      } else {
        return true; // 不可报名，按钮禁用
      }
    },
    JudgeEventEndDate(time) {
      const now = new Date(); // 获取当前时间
      const start = new Date(time); // 报名开始时间
      // 判断当前时间是否在报名时间范围内
      if (now >= start) {
        return false; // 可报名，按钮不禁用
      } else {
        return true; // 不可报名，按钮禁用
      }
    }
  }
};

</script>

<style scoped>
@import "@/assets/css/Base.css";
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/EventList.css";
</style>