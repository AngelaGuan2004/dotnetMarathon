<template>
  <div id="SupplypointDetail">
    <el-dialog title="补给点详情" :visible.sync="dialogVisible" width="40%">
      <el-table :data="supplypoints" v-if="supplypoints.length" max-height="300">
        <el-table-column prop="place" label="补给点地点"></el-table-column>
        <el-table-column prop="kind" label="补给点类型"></el-table-column>
      </el-table>
      <div v-else class="Empty">暂无数据</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSupplypointDetails } from '@/api/SupplypointDetails';

export default {
  name: 'SupplypointDetail',
  data() {
    return {
      supplypoints: [],
      dialogVisible: true
    };
  },
  props: ['eventId'],
  created() {
    this.loadSupplypointDetails();
  },
  methods: {
    async loadSupplypointDetails() {
      const eventId = this.eventId; // 从路由参数或默认值中获取 eventId
      try {
        const response = await getSupplypointDetails(eventId);
        console.log('完整响应对象:', response);
        if (response && Array.isArray(response.data)) {
          this.supplypoints = response.data; // 将 API 返回的数据赋值给 supplypoints 数组
        } else if (response && Array.isArray(response)) {
          this.supplypoints = response; // 直接使用 response 数组
        } else {
          this.$message.error('未收到有效响应数据');
          throw new Error('未收到有效响应数据');
        }
      } catch (error) {
        console.error('加载补给点详情失败:', error);
        this.$message.error('加载补给点详情失败');
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

#SupplypointDetail .Empty {
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

#SupplypointDetail .el-button {
  font-size: 14px;
}
</style>