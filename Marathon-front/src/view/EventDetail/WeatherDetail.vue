<template>
  <div id="WeatherDetail">
    <el-dialog title="天气详情" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-timeline v-if="weatherDetails.length">
        <el-timeline-item v-for="(weather, index) in weatherDetails" :key="index" :timestamp="`${weather.time}点`"
          placement="top" size="large">
          <el-card>
            <p><b>气温：</b>{{ weather.temperature }}°C</p>
            <p><b>天气情况：</b>{{ weather.weatherCondition }}</p>
            <p><b>比赛是否能正常进行：</b>{{ weather.whetherToProceed === 1 ? '是' : '否' }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <div v-else class="Empty">暂无数据</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getWeatherDetails } from '@/api/WeatherDetails'; // 确保导入的API路径正确

export default {
  name: 'WeatherDetail',
  data() {
    return {
      weatherDetails: [], // 初始化为空数组
      dialogVisible: true
    };
  },
  props: ['eventId'],
  created() {
    this.loadWeatherDetails(); // 在组件创建时加载天气详情
  },
  methods: {
    async loadWeatherDetails() {
      const event_id = this.eventId; // 从路由参数或默认值中获取eventId
      try {
        const response = await getWeatherDetails(event_id);
        console.log('接口响应:', response); // 打印完整的API响应以便调试

        // 检查响应结构并确保是预期的数据格式
        if (response.data && Array.isArray(response.data)) {
          this.weatherDetails = response.data; // 将API返回的数据赋值给weatherDetails数组
        } else {
          this.$message.error('未收到有效响应数据')
          console.error('Unexpected response structure:', response);
          throw new Error('未收到有效响应数据');
        }
      } catch (error) {
        this.$message.error('加载天气详情失败')
        console.error('加载天气详情失败:', error);
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

#WeatherDetail .el-timeline-item__timestamp {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
}

#WeatherDetail .el-card__body {
  padding: 0 20px;
}

#WeatherDetail .el-dialog__body {
  padding-left: 50px;
}

#WeatherDetail .el-card {
  width: 80%;
}

#WeatherDetail .Empty {
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

#WeatherDetail .el-button {
  font-size: 14px;
}
</style>