<template>
  <div id="MedicalPointManagement">
    <div class="ManagementContainer">
      <div style="margin-bottom: 50px;font-weight: bold;font-size: 26px;">{{ this.$route.params.name }}</div>
      <el-table v-if="medicalPoints.length" :data="medicalPoints" class='DeleteButton' max-height="350">
        <el-table-column prop="id" label="医疗点ID"></el-table-column>
        <el-table-column prop="place" label="位置"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="confirmDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-else style="text-align: center;height: 10vh;line-height: 10vh;font-size: 18px;">暂无数据</div>
      <div class="button-group">
        <el-button type="primary" @click="showAddDialog">添加</el-button>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="40%" title="添加医疗点" class="Dialog">
        <el-form :model="newMedicalPoint" label-width="150px">
          <el-form-item label="医疗点ID">
            <el-input v-model="newMedicalPoint.id" placeholder="医疗点ID"></el-input>
          </el-form-item>
          <el-form-item label="位置">
            <el-input v-model="newMedicalPoint.place" placeholder="位置"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addMedicalPoint">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import { get_medical_point, add_medical_point, delete_medical_point } from '@/api/MedicalPoint'; // 导入API函数*/

export default {
  name: 'MedicalPointManagement',
  data() {
    return {
      medicalPoints: [],
      newMedicalPoint: {
        id: '',
        place: ''
      },
      dialogVisible: false
    };
  },
  created() {
    this.fetchMedicalPoints(); // 页面加载时获取所有医疗点
  },
  methods: {
    // 获取所有医疗点
    async fetchMedicalPoints() {
      try {
        const Event_id = this.$route.params.event_id; // 假设 Event_id 为 1，可根据实际需求调整
        const response = await get_medical_point(Event_id);
        this.medicalPoints = response.data; // 假设 API 返回的数据在 data 属性中
        console.log(this.medicalPoints)
      } catch (error) {
        console.error('获取医疗点失败:', error);
      }
    },

    // 显示添加医疗点对话框
    showAddDialog() {
      this.dialogVisible = true;
    },

    // 添加医疗点
    async addMedicalPoint() {
      if (this.newMedicalPoint.id && this.newMedicalPoint.place) {
        try {
          const Event_id = this.$route.params.event_id; // 假设 Event_id 为 1，可根据实际需求调整
          await add_medical_point({
            id: Event_id + this.newMedicalPoint.id,
            place: this.newMedicalPoint.place
          });

          // 将新医疗点添加到数组中
          this.medicalPoints.push({
            id: Event_id + this.newMedicalPoint.id,
            place: this.newMedicalPoint.place
          });

          this.dialogVisible = false;
          this.clearForm();
          this.$message.success('添加医疗点成功');
        } catch (error) {
          console.error('添加医疗点失败:', error);
          this.$message.error('添加医疗点失败');
        }
      } else {
        this.$message.error('请填写完整信息');
      }
    },

    // 删除医疗点确认
    confirmDelete(index) {
      console.log(this.medicalPoints[index].id + "")
      this.$confirm('确定要删除此医疗点？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.deleteMedicalPoint(this.medicalPoints[index].id + "");
        await this.fetchMedicalPoints();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 删除医疗点
    async deleteMedicalPoint(index) {
      try {
        await delete_medical_point(index);
        this.$message.success('删除成功!');
      } catch (error) {
        console.error('删除医疗点失败:', error);
        this.$message.error('删除医疗点失败');
      }
    },

    // 清空表单
    clearForm() {
      this.newMedicalPoint.id = '';
      this.newMedicalPoint.position = '';
    },

  }
};
</script>

<style scoped>
@import "@/assets/css/Base.css";
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/Management.css";
</style>