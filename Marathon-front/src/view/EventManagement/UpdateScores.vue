<template>
    <div id="UploadScores" class="Container">
      <el-main class="Content">
        <div style="margin-top: 10px; margin-bottom: 25px; margin-left: 15px; font-weight: bold; font-size: 26px;">
          上传成绩表格
        </div>
  
        <!-- 文件上传组件 -->
        <el-upload
          action=""
          :show-file-list="false"
          :before-upload="handleFileUpload"
          accept=".xls, .xlsx"
          drag
          class="Upload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            拖拽文件到这里，或 <em>点击上传</em>
          </div>
          <div class="el-upload__tip">
            仅支持 .xls 和 .xlsx 格式文件
          </div>
        </el-upload>
  
        <!-- 表格展示上传的数据 -->
        <el-table
          v-if="tableData.length > 0"
          :data="tableData"
          border
          class="Table"
          style="margin-top: 20px; width: 100%;"
          max-height="400"
        >
          <el-table-column
            v-for="(header, index) in tableHeaders"
            :key="index"
            :prop="header"
            :label="header"
          ></el-table-column>
        </el-table>
  
        <!-- 提交按钮 -->
        <div style="margin-top: 20px; text-align: center;">
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </el-main>
    </div>
</template>
  
<script>
import { submitGrades } from '@/api/EventManagement';
import * as XLSX from "xlsx";

export default {
  name: 'UpdateScores',
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
      tableHeaders: [], // 表头数据
      tableData: [],    // 表格数据
    };
  },
  methods: {
    handleFileUpload(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // 如果表格没有数据，则不继续处理
        if (jsonData.length === 0) {
          this.$message.error("表格没有数据！");
          return;
        }

        this.tableHeaders = jsonData[0];
        this.tableData = jsonData.slice(1).map((row) => {
          const rowData = {};
          this.tableHeaders.forEach((header, index) => {
            rowData[header] = row[index] || "";
          });
          return rowData;
        });
      };

      reader.readAsArrayBuffer(file);

      return false; // 阻止默认上传行为
    },
    handleSubmit() {
      // 在这里处理提交逻辑
      if (this.tableData.length === 0) {
        this.$message.error("请先上传成绩表格！");
        return;
      }

      // 映射表格数据到 API 需要的格式
      const results = this.tableData.map(row => {
        console.log("提交行数据:", row);  // 每次提交一行数据时打印它
            return {
                gunResult: row['gun_result'] || 0,  // 根据表头字段映射
                netResult: row['net_result'] || 0,  // 根据表头字段映射
                playerId: row['player_id'] || 0,  // 根据表头字段映射
                eventId: this.eventId,  // 当前赛事ID
                playerRank: row['player_rank'] || 0,  // 根据表头字段映射
                genderRank: row['gun_rank'] || 0,  // 根据表头字段映射
            };
        });

      // 如果需要对结果格式进一步修改，可以在这里进行调整
      const finalResults = results.map(item => {
        return {
          gunResult: item.gunResult,
          netResult: item.netResult,
          playerId: item.playerId,
          eventId: item.eventId,
          playerRank: item.playerRank,
          genderRank: item.genderRank,
        };
      });

      // 调用API提交数据
      submitGrades(finalResults)
        .then((res) => {
          if (res.code === 1) {
            this.$message.success("成绩表格已提交！");
          } else {
            this.$message.error(`提交失败: ${res.message || "未知错误"}`);
          }
        })
        .catch((error) => {
          console.error("提交失败:", error);
          this.$message.error("提交成绩失败！");
        });
    },
  },
};
</script>
  
<style scoped>
.Container {
  display: flex;
  flex-direction: column; /* 确保容器方向是垂直的 */
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

.Content {
  width: 100%;
}

.Upload {
  margin-left: 15px;
  margin-bottom: 20px;
}

.Table {
  margin-left: 15px;
}

.el-button {
  margin-top: 20px;
}
</style>
