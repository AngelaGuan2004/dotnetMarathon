<template>
  <div id="PackageDetail">
    <el-dialog title="物资详情" :visible.sync="dialogVisible" width="40%" class="PackageDetailDialog">
      <div v-if="competePackages.length || finishPackages.length || supplyPackages.length">
        <div style="display: flex;width: 55%;">
          <el-table :data="competePackages" max-height="300">
            <el-table-column prop="name" label="参赛物资"></el-table-column>
          </el-table>
        </div>
        <div style="display: flex;width: 55%;">
          <el-table :data="finishPackages" max-height="300">
            <el-table-column prop="name" label="完赛物资"></el-table-column>
          </el-table>
        </div>
        <div style="display: flex;width: 100%;">
          <el-table :data="supplyPackages" max-height="300">
            <el-table-column prop="name" label="补给物资"></el-table-column>
          </el-table>
        </div>
      </div>
      <div v-else class="Empty">暂无数据</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPackageDetails } from '@/api/PackageDetails';

export default {
  name: 'PackageDetail',
  data() {
    return {
      competePackages: [], // 初始化参赛物资数组
      finishPackages: [],  // 初始化完赛物资数组
      supplyPackages: [],  // 初始化补给物资数组
      dialogVisible: true
    };
  },
  props: ['eventId'],
  created() {
    this.loadPackageDetails();
  },
  methods: {
    async loadPackageDetails() {
      const eventId = this.eventId; // 从路由参数或默认值中获取 eventId
      try {
        const response = await getPackageDetails(eventId);
        console.log('完整响应对象:', response);

        // 确认返回的数据是一个数组，并且数组不为空
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          this.competePackages = response.data.filter(item => item.kind === '参赛');
          this.finishPackages = response.data.filter(item => item.kind === '完赛');
          this.supplyPackages = response.data.filter(item => item.kind === '补给');
        } else if (Array.isArray(response) && response.length > 0) {
          // 如果数据直接返回在 response 而不是 response.data 中
          this.competePackages = response.filter(item => item.kind === '参赛');
          this.finishPackages = response.filter(item => item.kind === '完赛');
          this.supplyPackages = response.filter(item => item.kind === '补给');
        } else {
          console.log('未收到有效的物资数据');
        }
      } catch (error) {
        console.error('加载物资详情失败:', error);
        this.$message.error('加载物资详情失败');
      }
    },
    handleClose() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
@import "@/assets/css/Base.css";
@import 'element-ui/lib/theme-chalk/index.css';

#PackageDetail .el-dialog__body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#PackageDetail .Empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 24px;
  font-weight: bold;
  color: #999;
  width: 100%;
  text-align: center;
}

#PackageDetail .el-button {
  font-size: 14px;
}
</style>